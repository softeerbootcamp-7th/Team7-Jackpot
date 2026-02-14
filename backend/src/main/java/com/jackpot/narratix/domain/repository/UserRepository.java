package com.jackpot.narratix.domain.repository;

import com.jackpot.narratix.domain.entity.User;

import java.util.Optional;

public interface UserRepository {

    Optional<User> findById(String userId);

    User findByIdOrElseThrow(String userId);
}
