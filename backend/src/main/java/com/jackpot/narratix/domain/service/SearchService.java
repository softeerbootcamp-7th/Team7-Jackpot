package com.jackpot.narratix.domain.service;

import com.jackpot.narratix.domain.controller.response.SearchScrapResponse;
import com.jackpot.narratix.domain.entity.QnA;
import com.jackpot.narratix.domain.exception.SearchErrorCode;
import com.jackpot.narratix.domain.repository.ScrapRepository;
import com.jackpot.narratix.global.exception.BaseException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final ScrapRepository scrapRepository;

    public SearchScrapResponse searchScrap(String userId, String searchWord, Integer size, Long lastQnaId) {

        String keyword = null;

        if (StringUtils.hasText(searchWord)) {
            keyword = searchWord.trim();
            if (keyword.length() < 2) {
                throw new BaseException(SearchErrorCode.INVALID_SEARCH_KEYWORD);
            }
        }

        Pageable pageable = PageRequest.of(0, size);

        Slice<QnA> qnaSlice = scrapRepository.searchScrapsByKeyword(userId, keyword, lastQnaId, pageable);

        List<SearchScrapResponse.QnAItem> qnaItems = qnaSlice.getContent().stream()
                .map(SearchScrapResponse.QnAItem::from)
                .toList();

        return SearchScrapResponse.of(qnaItems, qnaSlice.hasNext());
    }
}
