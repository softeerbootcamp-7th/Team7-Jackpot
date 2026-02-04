package com.jackpot.narratix.domain.repository;

import com.jackpot.narratix.domain.entity.QnA;
import com.jackpot.narratix.domain.entity.enums.QuestionCategoryType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QnAJpaRepository extends JpaRepository<QnA, Long> {

    Integer countByUserId(String userId);

    @Query("SELECT DISTINCT q.questionCategory FROM QnA q WHERE q.userId = :userId")
    List<QuestionCategoryType> findDistinctByQuestionCategory(@Param("userId") String userId);

    @Query("SELECT q.coverLetter.id AS coverLetterId, COUNT(q) AS count " +
            "FROM QnA q " +
            "WHERE q.coverLetter.id IN :coverLetterIds " +
            "GROUP BY q.coverLetter.id")
    List<QnACountProjection> countByCoverLetterIdIn(@Param("coverLetterIds") List<Long> coverLetterIds);
}
