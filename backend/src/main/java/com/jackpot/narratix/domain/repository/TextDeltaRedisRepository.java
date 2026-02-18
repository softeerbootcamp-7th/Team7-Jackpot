package com.jackpot.narratix.domain.repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jackpot.narratix.domain.controller.request.TextUpdateRequest;
import com.jackpot.narratix.global.exception.BaseException;
import com.jackpot.narratix.global.exception.GlobalErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

/**
 * 텍스트 변경 델타를 Redis에 관리한다.
 *
 * <h3>버저닝</h3>
 * <p>버전 카운터는 세션 시작 시 {@link #initVersionIfAbsent}로 DB 버전으로 초기화된다.
 * 이후 {@link #pushAndIncrVersion}이 RPUSH + INCR을 원자적으로 실행해 DB 조회 없이 절대 버전을 반환한다.
 * committed 목록은 오래된 버전을 보고 있는 Reviewer가 OT를 수행할 때 활용된다.</p>
 */
@Slf4j
@Repository
@RequiredArgsConstructor
public class TextDeltaRedisRepository {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final String PENDING_KEY_FORMAT = "qna:text-delta:pending:%d"; // 아직 DB에 반영되지 않은 델타
    private static final String COMMITTED_KEY_FORMAT = "qna:text-delta:committed:%d"; // DB에 반영된 델타 (OT 히스토리용)
    private static final String VERSION_KEY_FORMAT = "qna:text-delta:version:%d"; // 절대 버전 카운터. 세션 시작 시 QnA.version으로 초기화되며, delta push마다 INCR.

    static final int MAX_COMMITTED_SIZE = 100;

    /**
     * RPUSH(pending) + INCR(version) 원자적 실행 Lua 스크립트.
     * 반환값: INCR 후 버전 카운터 값 = 이 델타의 절대 버전
     */
    private static final String PUSH_AND_INCR_SCRIPT = """
            redis.call('rpush', KEYS[1], ARGV[1])
            return redis.call('incr', KEYS[2])
            """;

    private static final DefaultRedisScript<Long> PUSH_AND_INCR_REDIS_SCRIPT =
            new DefaultRedisScript<>(PUSH_AND_INCR_SCRIPT, Long.class);

    /**
     * pending → committed 원자적 이동 Lua 스크립트.
     * LRANGE pending → RPUSH committed → LTRIM(>MAX) → DEL pending
     * 반환값: 이동한 델타 수
     * 자세한 설명은 <a href="https://www.notion.so/jackpot-narratix/Server-OT-Flow-30b14885339b8096a06dcf3a9805ad4e#30b14885339b80ac96fff934e91160c2">COMMIT_SCRIPT Description</a> 참조
     */
    private static final String COMMIT_SCRIPT = """
            local items = redis.call('lrange', KEYS[1], 0, -1)
            for _, item in ipairs(items) do
                redis.call('rpush', KEYS[2], item)
            end
            local committed_size = redis.call('llen', KEYS[2])
            local max = tonumber(ARGV[1])
            if committed_size > max then
                redis.call('ltrim', KEYS[2], committed_size - max, -1)
            end
            redis.call('del', KEYS[1])
            return #items
            """;

    private static final DefaultRedisScript<Long> COMMIT_REDIS_SCRIPT =
            new DefaultRedisScript<>(COMMIT_SCRIPT, Long.class);

    private String pendingKey(Long qnAId) {
        return PENDING_KEY_FORMAT.formatted(qnAId);
    }

    private String committedKey(Long qnAId) {
        return COMMITTED_KEY_FORMAT.formatted(qnAId);
    }

    private String versionKey(Long qnAId) {
        return VERSION_KEY_FORMAT.formatted(qnAId);
    }
    
    /**
     * 버전 카운터를 {@code dbVersion}으로 초기화한다 (키가 없을 때만 설정).
     * 세션 시작 시 {@code QnA.version}을 전달해 1회 초기화하며, 이후 push마다 INCR만 수행한다.
     */
    public void initVersionIfAbsent(Long qnAId, Long dbVersion) {
        redisTemplate.opsForValue().setIfAbsent(versionKey(qnAId), String.valueOf(dbVersion));
        log.debug("버전 카운터 초기화(SETNX): qnAId={}, dbVersion={}", qnAId, dbVersion);
    }

    /**
     * 버전 카운터 키의 존재 여부를 반환한다.
     * Redis 재시작 등으로 카운터가 유실됐는지 확인하는 데 사용된다.
     */
    public boolean versionExists(Long qnAId) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(versionKey(qnAId)));
    }


    /**
     * 델타를 pending List에 RPUSH하고 버전 카운터를 INCR한다 (Lua 스크립트로 원자적 실행).
     *
     * @return 이 델타의 절대 버전 번호 (초기 카운터 = QnA.version, 이후 INCR로 단조 증가)
     */
    public long pushAndIncrVersion(Long qnAId, TextUpdateRequest delta) {
        try {
            String json = objectMapper.writeValueAsString(delta);
            Long version = redisTemplate.execute(
                    PUSH_AND_INCR_REDIS_SCRIPT,
                    List.of(pendingKey(qnAId), versionKey(qnAId)),
                    json
            );
            return version != null ? version : 1L;
        } catch (JsonProcessingException e) {
            log.error("TextUpdateRequest 직렬화 실패: qnAId={}", qnAId, e);
            throw new BaseException(GlobalErrorCode.INTERNAL_SERVER_ERROR);
        }
    }


    /**
     * DB에 반영되지 않은 pending 델타를 순서대로 반환한다.
     */
    public List<TextUpdateRequest> getPending(Long qnAId) {
        return deserializeList(qnAId, redisTemplate.opsForList().range(pendingKey(qnAId), 0, -1));
    }

    /**
     * DB에 반영된 committed 델타를 순서대로 반환한다 (최대 {@value MAX_COMMITTED_SIZE}개).
     * Reviewer가 오래된 버전에서 OT를 수행할 때 사용한다.
     */
    public List<TextUpdateRequest> getCommitted(Long qnAId) {
        return deserializeList(qnAId, redisTemplate.opsForList().range(committedKey(qnAId), 0, -1));
    }

    /**
     * 현재 pending 델타 수를 반환한다.
     */
    public long pendingSize(Long qnAId) {
        Long size = redisTemplate.opsForList().size(pendingKey(qnAId));
        return size != null ? size : 0L;
    }


    /**
     * pending 델타를 committed로 원자적으로 이동하고 pending을 클리어한다.
     * committed는 {@value MAX_COMMITTED_SIZE}개를 초과하면 오래된 것부터 제거된다.
     *
     * @return 이동된 델타 수
     */
    public long commit(Long qnAId) {
        Long moved = redisTemplate.execute(
                COMMIT_REDIS_SCRIPT,
                List.of(pendingKey(qnAId), committedKey(qnAId)),
                String.valueOf(MAX_COMMITTED_SIZE)
        );
        long count = moved != null ? moved : 0L;
        log.debug("commit 완료: qnAId={}, 이동된 델타 수={}", qnAId, count);
        return count;
    }


    private List<TextUpdateRequest> deserializeList(Long qnAId, List<Object> rawList) {
        if (rawList == null || rawList.isEmpty()) {
            return Collections.emptyList();
        }
        return rawList.stream()
                .map(raw -> {
                    try {
                        return objectMapper.readValue((String) raw, TextUpdateRequest.class);
                    } catch (JsonProcessingException e) {
                        log.error("TextUpdateRequest 역직렬화 실패: qnAId={}, raw={}", qnAId, raw, e);
                        throw new BaseException(GlobalErrorCode.INTERNAL_SERVER_ERROR);
                    }
                })
                .toList();
    }
}