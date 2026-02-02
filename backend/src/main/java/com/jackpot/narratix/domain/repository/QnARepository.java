package com.jackpot.narratix.domain.repository;

import com.jackpot.narratix.domain.entity.QnA;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QnARepository {

    void saveAll(List<QnA> qnAs);
}
