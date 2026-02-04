package com.jackpot.narratix.domain.controller.response;

import com.jackpot.narratix.domain.entity.CoverLetter;

import java.time.LocalDate;

public record UpcomingCoverLetterResponse(
        Long coverLetterId,
        String companyName,
        String jobPosition,
        LocalDate deadLine
) {

    public static UpcomingCoverLetterResponse of(CoverLetter coverLetter) {
        return new UpcomingCoverLetterResponse(
                coverLetter.getId(),
                coverLetter.getCompanyName(),
                coverLetter.getJobPosition(),
                coverLetter.getDeadline()
        );
    }
}
