package com.jackpot.narratix.domain.controller;

import com.jackpot.narratix.domain.entity.enums.ReviewRoleType;
import com.jackpot.narratix.domain.exception.WebSocketErrorCode;
import com.jackpot.narratix.global.exception.BaseException;
import com.jackpot.narratix.global.websocket.WebSocketSessionAttributes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class WebSocketMessageController {

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

        validateShareId(shareId, sessionShareId);
        validateRole(role, ReviewRoleType.WRITER, shareId, sessionShareId);

        log.info("User subscribed to share: shareId={}, userId={}", shareId, userId);
    }

    private static void validateRole(ReviewRoleType role, ReviewRoleType expectedRole, String shareId, String sessionShareId) {
        if(!expectedRole.equals(role)){
            log.warn("Role mismatch during subscription: expected Role={}, actual Role={}, path={}, session={}",
                    expectedRole,
                    role,
                    shareId,
                    sessionShareId
            );
        }
        throw new BaseException(WebSocketErrorCode.ROLE_MISMATCH);
    }

    private void validateShareId(String shareId, String sessionShareId) {
        if (!shareId.equals(sessionShareId)) {
            log.warn("ShareId mismatch during subscription: shareId={}, sessionShareId={}", shareId, sessionShareId);
            throw new BaseException(WebSocketErrorCode.SHARE_ID_MISMATCH);
        }
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

        validateShareId(shareId, sessionShareId);
        validateRole(role, ReviewRoleType.REVIEWER, shareId, sessionShareId);

        log.info("User subscribed to share: shareId={}, userId={}", shareId, userId);

    }
    
    
}