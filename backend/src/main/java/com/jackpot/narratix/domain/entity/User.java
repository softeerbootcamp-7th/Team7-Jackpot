package com.jackpot.narratix.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    private String id;

    private String nickname;

    @Builder
    public User(String id, String nickname) {
        this.id = id;
        this.nickname = nickname;
    }
}
