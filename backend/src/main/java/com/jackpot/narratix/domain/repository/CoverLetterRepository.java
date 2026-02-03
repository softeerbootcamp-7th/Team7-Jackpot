package com.jackpot.narratix.domain.repository;

import com.jackpot.narratix.domain.entity.CoverLetter;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CoverLetterRepository {

    CoverLetter save(CoverLetter coverLetter);

    Optional<CoverLetter> findById(Long coverLetterId);

    void deleteById(Long coverLetterId);
}
