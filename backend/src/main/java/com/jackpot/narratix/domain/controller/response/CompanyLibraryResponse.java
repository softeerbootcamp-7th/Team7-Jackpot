package com.jackpot.narratix.domain.controller.response;

import java.time.LocalDateTime;
import java.util.List;

public record CompanyLibraryResponse(
        List<CoverLetterItem> coverLetters,
        boolean hasNext
) {
    public record CoverLetterItem(
            Long id,
            String applySeason,
            String companyName,
            String jobPosition,
            int questionCount,
            LocalDateTime modifiedAt
    ) {
    }
}