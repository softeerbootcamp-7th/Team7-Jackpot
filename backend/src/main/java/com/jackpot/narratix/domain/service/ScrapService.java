package com.jackpot.narratix.domain.service;

import com.jackpot.narratix.domain.controller.response.CreateScrapResponse;
import com.jackpot.narratix.domain.entity.Scrap;
import com.jackpot.narratix.domain.repository.ScrapRepository;
import org.springframework.stereotype.Service;


@Service
public class ScrapService {

    private final ScrapRepository scrapRepository;

    public CreateScrapResponse createScrap(String userId, Long questionId) {
        Scrap scrap = Scrap.of(userId, questionId);
        scrapRepository.save(scrap);
        return new CreateScrapResponse(scrap.getId(), count);
    }
}
