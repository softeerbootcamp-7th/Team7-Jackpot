package com.jackpot.narratix.domain.repository;

import com.jackpot.narratix.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

}
