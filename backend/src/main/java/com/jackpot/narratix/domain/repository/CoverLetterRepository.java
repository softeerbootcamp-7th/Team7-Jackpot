package com.jackpot.narratix.domain.repository;

import com.jackpot.narratix.domain.entity.CoverLetter;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CoverLetterRepository {

    CoverLetter save(CoverLetter coverLetter);

    Optional<CoverLetter> findById(@NotNull Long coverLetterId);

    void deleteById(@NotNull Long coverLetterId);
}
