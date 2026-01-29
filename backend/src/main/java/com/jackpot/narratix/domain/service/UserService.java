package com.jackpot.narratix.domain.service;

import com.jackpot.narratix.domain.entity.User;
import com.jackpot.narratix.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public boolean isIdDuplicated(String id){
        return userRepository.existsById(id);
    }

    public void join(User user){
        userRepository.save(user);
    }
}
