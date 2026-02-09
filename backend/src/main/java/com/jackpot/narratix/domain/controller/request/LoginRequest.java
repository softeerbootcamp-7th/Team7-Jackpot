package com.jackpot.narratix.domain.controller.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LoginRequest {

    @NotNull(message = "아이디는 필수 입력 항목입니다.")
    @NotBlank(message = "아이디는 필수 입력 항목입니다.")
    private String userId;

    @NotNull(message = "비밀번호는 필수 입력 항목입니다.")
    @NotBlank(message = "비밀번호는 필수 입력 항목입니다.")
    private String password;
}
