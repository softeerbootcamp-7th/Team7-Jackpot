package com.jackpot.narratix.domain.repository;

import com.jackpot.narratix.domain.entity.CoverLetter;
import com.jackpot.narratix.domain.entity.enums.ApplyHalfType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class CoverLetterRepositoryImpl implements CoverLetterRepository{

    private final CoverLetterJpaRepository coverLetterJpaRepository;

    @Override
    public CoverLetter save(CoverLetter coverLetter) {
        return coverLetterJpaRepository.save(coverLetter);
    }

    @Override
    public Optional<CoverLetter> findById(Long coverLetterId) {
        return coverLetterJpaRepository.findById(coverLetterId);
    }

    @Override
    public void deleteById(Long coverLetterId) {
        coverLetterJpaRepository.deleteById(coverLetterId);
    }

    @Override
    public List<CoverLetter> findByUserIdAndDeadlineBetweenOrderByModifiedAtDesc(
            String userId, LocalDate startDate, LocalDate endDate, Pageable pageable
    ) {
        return coverLetterJpaRepository.findByUserIdAndDeadlineBetweenOrderByModifiedAtDesc(
                userId, startDate, endDate, pageable
        );
    }

    @Override
    public Integer countByUserIdAndDeadlineBetween(String userId, LocalDate startDate, LocalDate endDate) {
        return coverLetterJpaRepository.countByUserIdAndDeadlineBetween(userId, startDate, endDate);
    }

    @Override
    public Integer countByUserId(String userId) {
        return coverLetterJpaRepository.countByUserId(userId);
    }

    @Override
    public Integer countByUserIdAndApplyYearAndApplyHalf(String userId, int applyYear, ApplyHalfType applyHalfType) {
        return coverLetterJpaRepository.countByUserIdAndApplyYearAndApplyHalf(userId, applyYear, applyHalfType);
    }
}
