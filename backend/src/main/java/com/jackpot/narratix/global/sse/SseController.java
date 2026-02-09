package com.jackpot.narratix.global.sse;

import com.jackpot.narratix.global.auth.UserId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@RestController
@RequestMapping("/api/v1/sse")
@RequiredArgsConstructor
public class SseController implements SseApi {

    private final SseEmitterService sseEmitterService;

    @Override
    @GetMapping("/connect")
    public SseEmitter connect(@UserId String userId) {
        return sseEmitterService.init(userId);
    }
}
