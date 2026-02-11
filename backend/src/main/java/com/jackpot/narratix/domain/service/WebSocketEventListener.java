package com.jackpot.narratix.domain.service;

import com.jackpot.narratix.domain.entity.enums.ReviewRoleType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

    private final ShareLinkLockManager shareLinkLockManager;

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {

        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        Map<String, Object> attributes = headerAccessor.getSessionAttributes();

        if (attributes != null) {
            String userId = attributes.get("userId").toString();
            String shareId = attributes.get("shareId").toString();
            ReviewRoleType role = (ReviewRoleType) attributes.get("userRole");

            log.info("웹소켓 연결 종료 감지. UserId: {}, ShareId: {}", userId, shareId);
            shareLinkLockManager.unlock(shareId, role, userId);
        }
    }
}
