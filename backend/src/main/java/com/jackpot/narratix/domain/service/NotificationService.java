package com.jackpot.narratix.domain.service;

import com.jackpot.narratix.domain.event.NotificationSendEvent;
import com.jackpot.narratix.domain.service.dto.NotificationSendRequest;
import com.jackpot.narratix.domain.service.dto.NotificationSendResponse;
import com.jackpot.narratix.domain.controller.response.UnreadNotificationCountResponse;
import com.jackpot.narratix.domain.controller.response.NotificationsPaginationResponse;
import com.jackpot.narratix.domain.entity.Notification;
import com.jackpot.narratix.domain.repository.NotificationRepository;
import com.jackpot.narratix.global.exception.BaseException;
import com.jackpot.narratix.global.exception.GlobalErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional(readOnly = true)
    public NotificationsPaginationResponse getNotificationsByUserId(
            String userId, Optional<Long> lastNotificationId, Integer size
    ) {
        Slice<Notification> notifications = lastNotificationId
                .map(notificationId -> notificationRepository.findAllByUserId(userId, notificationId, size))
                .orElseGet(() -> notificationRepository.findRecentByUserId(userId, size));

        return NotificationsPaginationResponse.of(notifications.getContent(), notifications.hasNext());
    }

    @Transactional
    public void markNotificationAsRead(String userId, Long notificationId) {
        Notification notification = notificationRepository.findByIdOrElseThrow(notificationId);

        if(!notification.isOwner(userId)) throw new BaseException(GlobalErrorCode.FORBIDDEN);

        notification.read();
    }

    @Transactional
    public void markAllNotificationAsRead(String userId) {
        notificationRepository.updateAllNotificationAsReadByUserId(userId);
    }

    @Transactional(readOnly = true)
    public UnreadNotificationCountResponse countUnreadNotification(String userId) {
        long unreadNotificationCount = notificationRepository.countByUserIdAndIsRead(userId, false);
        return new UnreadNotificationCountResponse(unreadNotificationCount);
    }

    @Transactional
    public void sendNotification(String receiverId, NotificationSendRequest request){
        Notification notification = request.toEntity(receiverId);
        notificationRepository.save(notification);

        // 트랜잭션 커밋 이후 비동기로 SSE 전송
        eventPublisher.publishEvent(new NotificationSendEvent(receiverId, NotificationSendResponse.of(notification)));
    }
}
