package com.jackpot.narratix.domain.repository;

import com.jackpot.narratix.domain.entity.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class NotificationRepositoryImpl implements NotificationRepository {

    private final NotificationJpaRepository notificationJpaRepository;

    @Override
    public List<Notification> findAllByUserId(String userId, Long lastNotificationId, Integer limit) {
        Pageable pageable = PageRequest.ofSize(limit);
        return notificationJpaRepository.findAllByUserIdAfterCursor(userId, lastNotificationId, pageable);
    }

    @Override
    public List<Notification> findRecentByUserId(String userId, Integer limit) {
        Pageable pageable = PageRequest.ofSize(limit);
        return notificationJpaRepository.findRecentByUserId(userId, pageable);
    }
}
