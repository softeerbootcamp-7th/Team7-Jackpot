package com.jackpot.narratix.domain.service;

import com.jackpot.narratix.domain.controller.response.NotificationsPaginationResponse;
import com.jackpot.narratix.domain.entity.Notification;
import com.jackpot.narratix.domain.repository.NotificationRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;

import java.util.List;
import java.util.Optional;

import static com.jackpot.narratix.domain.fixture.NotificationFixture.createMockNotifications;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class NotificationServiceTest {

    @InjectMocks
    private NotificationService notificationService;

    @Mock
    private NotificationRepository notificationRepository;

    @Test
    @DisplayName("lastNotificationId가 없을 때 findRecentByUserId 호출")
    void getNotificationsByUserId_lastNotificationIdAbsent_callsFindRecentByUserId() {
        // given
        String userId = "testUser123";
        int size = 10;
        Optional<Long> lastNotificationId = Optional.empty();

        List<Notification> mockNotifications = createMockNotifications(5);
        Slice<Notification> mockSlice = new SliceImpl<>(mockNotifications, PageRequest.ofSize(size), false);
        given(notificationRepository.findRecentByUserId(userId, size)).willReturn(mockSlice);

        // when
        notificationService.getNotificationsByUserId(userId, lastNotificationId, size);

        // then
        verify(notificationRepository, times(1)).findRecentByUserId(userId, size);
        verify(notificationRepository, never()).findAllByUserId(any(), any(), any());
    }

    @Test
    @DisplayName("lastNotificationId가 있을 때 findAllByUserId 호출")
    void getNotificationsByUserId_lastNotificationIdPresent_callsFindAllByUserId() {
        // given
        String userId = "testUser123";
        int size = 10;
        Long lastNotificationId = 100L;
        Optional<Long> lastNotificationIdOptional = Optional.of(lastNotificationId);

        List<Notification> mockNotifications = createMockNotifications(5);
        Slice<Notification> mockSlice = new SliceImpl<>(mockNotifications, PageRequest.ofSize(size), false);
        given(notificationRepository.findAllByUserId(userId, lastNotificationId, size)).willReturn(mockSlice);

        // when
        notificationService.getNotificationsByUserId(userId, lastNotificationIdOptional, size);

        // then
        verify(notificationRepository, times(1)).findAllByUserId(userId, lastNotificationId, size);
        verify(notificationRepository, never()).findRecentByUserId(any(), any());
    }
}