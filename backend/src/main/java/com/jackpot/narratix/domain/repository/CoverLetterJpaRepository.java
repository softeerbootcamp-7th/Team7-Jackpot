package com.jackpot.narratix.domain.repository;

import com.jackpot.narratix.domain.entity.CoverLetter;
import com.jackpot.narratix.domain.entity.enums.ApplyHalfType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface CoverLetterJpaRepository extends JpaRepository<CoverLetter, Long> {
    
    Integer countByUserId(String userId);

    Integer countByUserIdAndApplyYearAndApplyHalf(String userId, int applyYear, ApplyHalfType applyHalf);

    List<CoverLetter> findByUserIdAndDeadlineBetweenOrderByModifiedAtDesc(
            String userId, LocalDate startDate, LocalDate endDate, Pageable pageable
    );

    Integer countByUserIdAndDeadlineBetween(String userId, LocalDate startDate, LocalDate endDate);
}
