package com.jackpot.narratix.domain.service;

import com.jackpot.narratix.domain.controller.request.GetLibraryListRequest;
import com.jackpot.narratix.domain.entity.enums.QuestionCategoryType;

import java.util.Arrays;
import java.util.List;

public class LibraryService {

    public List<String> getLibraryList(GetLibraryListRequest request) {
        return switch (request.type()) {
            case COMPANY -> getCompanyName();
            case QUESTION -> getQuestionCategory();
        };
    }

    private List<String> getCompanyName() {

    }

    private List<String> getQuestionCategory() {
        return Arrays.stream(QuestionCategoryType.values())
                .map(QuestionCategoryType::getDescription)
                .toList();
    }
}
