package com.jackpot.narratix.domain.service;

import com.jackpot.narratix.domain.entity.enums.ReviewRoleType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
@RequiredArgsConstructor
public class ShareLinkLockManager {

    private final StringRedisTemplate redisTemplate;

    private static final long LOCK_TIMEOUT = 60L * 60L;
    private static final String LOCK_FORMAT = "share-link:lock:%s:%s";

    public boolean tryLock(String shareId, ReviewRoleType role, String userId) {
        String lockKey = getLockKey(shareId, role);

        Boolean success = redisTemplate.opsForValue()
                .setIfAbsent(lockKey, userId, Duration.ofSeconds(LOCK_TIMEOUT));

        return Boolean.TRUE.equals(success);
    }

    public void unlock(String shareId, ReviewRoleType role, String userId) {
        String lockKey = getLockKey(shareId, role);
        String currentOwner = redisTemplate.opsForValue().get(lockKey);

        if (userId.equals(currentOwner)) {
            redisTemplate.delete(lockKey);
        }
    }

    private String getLockKey(String shareId, ReviewRoleType role) {
        return LOCK_FORMAT.formatted(shareId, role);
    }
}
