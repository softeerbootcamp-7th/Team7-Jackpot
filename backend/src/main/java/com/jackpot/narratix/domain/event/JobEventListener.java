package com.jackpot.narratix.domain.event;

import com.jackpot.narratix.domain.service.LambdaCallService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;


@Component
@RequiredArgsConstructor
public class JobEventListener {

    private final LambdaCallService lambdaCallService;

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleJobCreatedEvent(JobCreatedEvent event) {
        lambdaCallService.callLambda(event.fileIds());
    }
}
