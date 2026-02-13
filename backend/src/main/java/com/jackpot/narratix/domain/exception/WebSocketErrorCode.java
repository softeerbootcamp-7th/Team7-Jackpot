package com.jackpot.narratix.domain.exception;

import com.jackpot.narratix.global.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum WebSocketErrorCode implements ErrorCode {

    SHARE_ID_MISMATCH(HttpStatus.BAD_REQUEST, "세션에 저장된 shareId와 경로의 shareId가 일치하지 않습니다."),
    ROLE_MISMATCH(HttpStatus.BAD_REQUEST, "세션에 저장된 role과 구독한 role이 일치하지 않습니다.");

    private final HttpStatus status;
    private final String message;
}
