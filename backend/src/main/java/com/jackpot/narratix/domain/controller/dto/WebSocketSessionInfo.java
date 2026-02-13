package com.jackpot.narratix.domain.controller.dto;

import com.jackpot.narratix.domain.entity.enums.ReviewRoleType;

/**
 * WebSocket 세션 정보를 담는 DTO
 * @param shareId 공유 링크 ID
 * @param userId 사용자 ID
 * @param role 사용자 역할 (WRITER 또는 REVIEWER)
 */
public record WebSocketSessionInfo(
        String shareId,
        String userId,
        ReviewRoleType role
) {
}