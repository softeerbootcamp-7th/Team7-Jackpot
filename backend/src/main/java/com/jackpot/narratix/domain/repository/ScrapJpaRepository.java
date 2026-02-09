package com.jackpot.narratix.domain.repository;

import com.jackpot.narratix.domain.entity.QnA;
import com.jackpot.narratix.domain.entity.Scrap;
import com.jackpot.narratix.domain.entity.ScrapId;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ScrapJpaRepository extends JpaRepository<Scrap, ScrapId> {

    @Query("SELECT COUNT(s) FROM Scrap s WHERE s.id.userId = :userId")
    Long countByUserId(String userId);

    boolean existsById(ScrapId scrapId);

    @Query("SELECT q " +
            "FROM Scrap s, QnA q " +
            "JOIN FETCH q.coverLetter " +
            "WHERE s.id.userId = :userId " +
            "AND s.id.qnaId = q.id " +
            "AND (:lastQnaId IS NULL OR q.id < :lastQnaId) " +
            "AND (" +
            "   q.question LIKE CONCAT('%', :searchWord, '%') OR " +
            "   q.answer LIKE CONCAT('%', :searchWord, '%')" +
            ") " +
            "ORDER BY q.id DESC")
    Slice<QnA> searchScraps(
            @Param("userId") String userId,
            @Param("searchWord") String searchWord,
            @Param("lastQnaId") Long lastQnaId,
            Pageable pageable
    );
}
