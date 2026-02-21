package com.jackpot.narratix.domain.entity.notification_meta;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LabelingNotificationMeta implements NotificationMeta {

    private String jobId;
    private Long successFileCount;
    private Long failFileCount;

    public static LabelingNotificationMeta of(String jobId, Long successFileCount, Long failFileCount) {
        return new LabelingNotificationMeta(jobId, successFileCount, failFileCount);
    }
}

