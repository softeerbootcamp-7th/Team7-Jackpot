package com.jackpot.narratix.domain.controller.response;

import com.jackpot.narratix.domain.entity.CoverLetter;
import com.jackpot.narratix.domain.entity.QnA;

import java.util.List;

public record SearchLibraryAndQnAResponse(
        Integer libraryCount,
        List<String> libraries,

        Integer totalQnACount,
        List<QnAItem> qnas,

        Boolean hasNext
) {
    public record QnAItem(
            Long id,
            String companyName,
            String jobPosition,
            String applySeason,
            String question,
            String answer
    ) {
        public static QnAItem from(QnA qna) {
            CoverLetter coverLetter = qna.getCoverLetter();

            return new QnAItem(
                    qna.getId(),
                    coverLetter.getCompanyName(),
                    coverLetter.getJobPosition(),
                    String.format("%d년 %s",
                            coverLetter.getApplyYear(),
                            coverLetter.getApplyHalf().getDescription()),
                    qna.getQuestion(),
                    qna.getAnswer()
            );
        }
    }

    public static SearchLibraryAndQnAResponse of(Integer libraryCount, List<String> libraries, Integer totalQnACount, List<QnA> qnaItems, boolean hasNext) {
        return new SearchLibraryAndQnAResponse(
                libraryCount,
                libraries,
                totalQnACount,
                qnaItems.stream()
                        .map(QnAItem::from)
                        .toList(),
                hasNext
        );
    }
}
