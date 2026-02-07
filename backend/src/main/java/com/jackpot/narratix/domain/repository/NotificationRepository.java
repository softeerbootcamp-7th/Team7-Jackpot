package com.jackpot.narratix.domain.repository;

import com.jackpot.narratix.domain.entity.Notification;

import java.util.List;

public interface NotificationRepository {

    List<Notification> findAllByUserId(String userId, Long lastNotificationId, Integer limit);

    List<Notification> findRecentByUserId(String userId, Integer limit);
}
