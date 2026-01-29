package com.jackpot.narratix.domain.controller;

import com.jackpot.narratix.domain.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/auth")
    public boolean checkId(@RequestBody String userId) {
        return userService.isIdDuplicated(userId);
    }

    @PostMapping("/auth/join")
    public void join(@RequestBody String userId, String password, String passwordConfirm, String nickname) {
        userService.join(userId, password, nickname);
    }

    @PostMapping("/auth/login")
    public void login(@RequestBody String userId, String password) {
        //userService.login(userId, password);
    }
}

