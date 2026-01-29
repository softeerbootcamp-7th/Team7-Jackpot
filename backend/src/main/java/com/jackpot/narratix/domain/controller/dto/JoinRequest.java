package com.jackpot.narratix.domain.controller.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JoinRequest {

    private String userId;
    private String password;
    private String passwordConfirm;
    private String nickname;

}
