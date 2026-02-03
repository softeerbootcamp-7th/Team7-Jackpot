package com.jackpot.narratix.domain.service;

import com.jackpot.narratix.domain.controller.request.GetLibraryListRequest;
import com.jackpot.narratix.domain.entity.enums.QuestionCategoryType;
import com.jackpot.narratix.domain.repository.CoverLetterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LibraryService {

    private final CoverLetterRepository coverLetterRepository;

    public List<String> getLibraryList(String userId, GetLibraryListRequest request) {
        return switch (request.type()) {
            case COMPANY -> getCompanyName(userId);
            case QUESTION -> getQuestionCategory();
        };
    }

    private List<String> getCompanyName(String userId) {
        return coverLetterRepository.findCompanyNamesByUserId(userId);
    }

    private List<String> getQuestionCategory() {
        return Arrays.stream(QuestionCategoryType.values())
                .map(QuestionCategoryType::getDescription)
                .toList();
    }
}
