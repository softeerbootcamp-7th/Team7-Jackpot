package com.jackpot.narratix.domain.service;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ShareLinkLockRenewalScheduler {

    private final ShareLinkLockManager shareLinkLockManager;

    private static final long LOCK_RENEWAL_TIME = 4 * 1000L;

    @Scheduled(fixedRate = LOCK_RENEWAL_TIME)
    public void renewActiveLocks() {
        shareLinkLockManager.renewAllLocks();
    }
}