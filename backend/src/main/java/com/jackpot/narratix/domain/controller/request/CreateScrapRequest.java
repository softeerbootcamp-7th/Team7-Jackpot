package com.jackpot.narratix.domain.controller.request;

import jakarta.validation.constraints.NotNull;

public record CreateScrapRequest(
        @NotNull(message = "스크랩할 문항 ID는 필수입니다.") Long questionId
) {
}