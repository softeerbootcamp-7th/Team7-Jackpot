package com.jackpot.narratix.domain.controller.request;

import com.jackpot.narratix.domain.entity.enums.QuestionCategoryType;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = lombok.AccessLevel.PRIVATE)
public class CreateQuestionRequest {

    @NotNull
    private final String question;

    @NotNull
    private final QuestionCategoryType category;

}
