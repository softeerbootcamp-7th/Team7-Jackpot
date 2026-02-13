package com.jackpot.narratix.domain.controller;

import com.jackpot.narratix.domain.controller.request.TextUpdateRequest;
import com.jackpot.narratix.domain.entity.enums.ReviewRoleType;
import com.jackpot.narratix.domain.exception.WebSocketErrorCode;
import com.jackpot.narratix.domain.service.WebSocketMessageService;
import com.jackpot.narratix.global.exception.BaseException;
import com.jackpot.narratix.global.websocket.WebSocketSessionAttributes;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class WebSocketMessageController {

    private final WebSocketMessageService webSocketMessageService;

    @SubscribeMapping("/share/{shareId}/review/writer")
    public void subscribeWriterCoverLetter(
            @DestinationVariable String shareId,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        Map<String, Object> sessionAttributes = headerAccessor.getSessionAttributes();
        if (sessionAttributes == null) {
            log.warn("Session attributes is null during subscription");
        }

        String sessionShareId = WebSocketSessionAttributes.getShareId(sessionAttributes);
        String userId = WebSocketSessionAttributes.getUserId(sessionAttributes);
        ReviewRoleType role = WebSocketSessionAttributes.getRole(sessionAttributes);

        webSocketMessageService.validateShareId(shareId, sessionShareId);
        webSocketMessageService.validateRole(role, ReviewRoleType.WRITER, shareId, sessionShareId);

        log.info("User subscribed to share: shareId={}, userId={}", shareId, userId);
    }

    @SubscribeMapping("/share/{shareId}/review/reviewer")
    public void subscribeReviewerCoverLetter(
            @DestinationVariable String shareId,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        Map<String, Object> sessionAttributes = headerAccessor.getSessionAttributes();
        if (sessionAttributes == null) {
            log.warn("Session attributes is null during subscription");
        }

        String sessionShareId = WebSocketSessionAttributes.getShareId(sessionAttributes);
        String userId = WebSocketSessionAttributes.getUserId(sessionAttributes);
        ReviewRoleType role = WebSocketSessionAttributes.getRole(sessionAttributes);

        webSocketMessageService.validateShareId(shareId, sessionShareId);
        webSocketMessageService.validateRole(role, ReviewRoleType.REVIEWER, shareId, sessionShareId);

        log.info("User subscribed to share: shareId={}, userId={}", shareId, userId);
    }

    @MessageMapping("/share/{shareId}/text-update")
    public void updateText(
            @DestinationVariable String shareId,
            @Valid @Payload TextUpdateRequest request,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        log.info("Writer send text update request: shareId={}, request={}, path={}", shareId, request, headerAccessor.getDestination());
        Map<String, Object> sessionAttributes = headerAccessor.getSessionAttributes();
        if (sessionAttributes == null) {
            log.warn("Session attributes is null during text update");
            throw new BaseException(WebSocketErrorCode.INVALID_SESSION);
        }

        String userId = WebSocketSessionAttributes.getUserId(sessionAttributes);
        String sessionShareId = WebSocketSessionAttributes.getShareId(sessionAttributes);
        ReviewRoleType role = WebSocketSessionAttributes.getRole(sessionAttributes);

        // 비즈니스 로직은 서비스에 위임
        webSocketMessageService.handleTextUpdate(shareId, sessionShareId, userId, role, request);
    }

}