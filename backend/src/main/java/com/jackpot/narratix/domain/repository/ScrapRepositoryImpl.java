package com.jackpot.narratix.domain.repository;

import com.jackpot.narratix.domain.entity.QnA;
import com.jackpot.narratix.domain.entity.Scrap;
import com.jackpot.narratix.domain.entity.ScrapId;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ScrapRepositoryImpl implements ScrapRepository {

    private final ScrapJpaRepository scrapJpaRepository;

    @Override
    public Scrap save(Scrap scrap) {
        return scrapJpaRepository.save(scrap);
    }

    @Override
    public Long countByUserId(String userId) {
        return scrapJpaRepository.countByUserId(userId);
    }

    @Override
    public boolean existsById(ScrapId scrapId) {
        return scrapJpaRepository.existsById(scrapId);
    }

    @Override
    public void deleteById(ScrapId scrapId) {
        scrapJpaRepository.deleteById(scrapId);
    }

    @Override
    public Slice<QnA> searchScrapsByKeyword(String userId, String searchWord, Long lastQnaId, Pageable pageable) {
        return scrapJpaRepository.searchScraps(userId, searchWord, lastQnaId, pageable);
    }
}

