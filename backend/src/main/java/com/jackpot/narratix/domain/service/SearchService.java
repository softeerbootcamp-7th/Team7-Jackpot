package com.jackpot.narratix.domain.service;

import com.jackpot.narratix.domain.controller.response.SearchScrapResponse;
import com.jackpot.narratix.domain.entity.QnA;
import com.jackpot.narratix.domain.exception.SearchErrorCode;
import com.jackpot.narratix.domain.repository.ScrapRepository;
import com.jackpot.narratix.global.exception.BaseException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final ScrapRepository scrapRepository;

    public SearchScrapResponse searchScrap(
            String userId, String searchWord, Integer size, Long lastQnaId
    ) {
        boolean hasKeyword = StringUtils.hasText(searchWord);
        if (hasKeyword && searchWord.trim().length() < 2) {
            throw new BaseException(SearchErrorCode.INVALID_SEARCH_KEYWORD);
        }

        Slice<QnA> qnas = hasKeyword
                ? getSearchScraps(userId, searchWord.trim(), lastQnaId, size)
                : getAllScraps(userId, lastQnaId, size);

        return SearchScrapResponse.of(qnas.getContent(), qnas.hasNext());
    }

    private Slice<QnA> getSearchScraps(String userId, String word, Long lastId, Integer size) {
        return Optional.ofNullable(lastId)
                .map(id -> scrapRepository.searchQnAInScrapsNext(userId, word, id, size))
                .orElseGet(() -> scrapRepository.searchQnAInScraps(userId, word, size));
    }

    private Slice<QnA> getAllScraps(String userId, Long lastId, Integer size) {
        return Optional.ofNullable(lastId)
                .map(id -> scrapRepository.findScrapsNext(userId, id, size))
                .orElseGet(() -> scrapRepository.findScraps(userId, size));
    }
}


