package com.jackpot.narratix.domain.repository;

import com.jackpot.narratix.domain.entity.QnA;
import com.jackpot.narratix.domain.entity.Scrap;
import com.jackpot.narratix.domain.entity.ScrapId;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface ScrapRepository {
    Scrap save(Scrap scrap);

    Long countByUserId(String userId);

    boolean existsById(ScrapId scrapId);

    void deleteById(ScrapId scrapId);

    Slice<QnA> searchScrapsByKeyword(String userId, String searchWord, Long lastQnaId, Pageable pageable);

}
