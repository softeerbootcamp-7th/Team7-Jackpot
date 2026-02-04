package com.jackpot.narratix.domain.repository;

import com.jackpot.narratix.domain.entity.QnA;
import com.jackpot.narratix.domain.entity.enums.QuestionCategoryType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class QnARepositoryImpl implements QnARepository {

    private final QnAJpaRepository qnAJpaRepository;

    @Override
    public void saveAll(List<QnA> qnAs) {
        qnAJpaRepository.saveAll(qnAs);
    }

    @Override
    public Integer countByUserId(String userId) {
        return qnAJpaRepository.countByUserId(userId);
    }

    @Override
    public List<QuestionCategoryType> findQuestionCategoryByUserId(String userId) {
        return qnAJpaRepository.findDistinctByQuestionCategory(userId);
    }

    @Override
    public List<QnACountProjection> countByCoverLetterIdIn(@Param("coverLetterIds") List<Long> coverLetterIds) {
        return qnAJpaRepository.countByCoverLetterIdIn(coverLetterIds);
    }
}
