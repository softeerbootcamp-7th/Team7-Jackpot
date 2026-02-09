package com.jackpot.narratix.domain.controller.response;

import com.jackpot.narratix.domain.entity.CoverLetter;
import com.jackpot.narratix.domain.entity.enums.ApplyHalfType;

import java.time.LocalDate;
import java.util.List;

public record SearchCoverLetterResponse(
        List<CoverLetterItem> coverLetters,
        PageInfo page
) {
    public record CoverLetterItem(
            Long coverLetterId,
            String companyName,
            String jobPosition,
            Integer applyYear,
            ApplyHalfType applyHalf,
            LocalDate deadline,
            Integer questionCount

    ) {
        public static CoverLetterItem from(CoverLetter coverLetter) {
            return new CoverLetterItem(
                    coverLetter.getId(),
                    coverLetter.getCompanyName(),
                    coverLetter.getJobPosition(),
                    coverLetter.getApplyYear(),
                    coverLetter.getApplyHalf(),
                    coverLetter.getDeadline(),
                    coverLetter.getQuestionCount()
            );
        }

    }

    public record PageInfo(
            Integer number,
            Integer size,
            Long totalElement,
            Integer totalPage
    ) {
    }

    public static SearchCoverLetterResponse of(List<CoverLetterItem> coverLetters, PageInfo page) {
        return new SearchCoverLetterResponse(coverLetters, page);
    }
}
