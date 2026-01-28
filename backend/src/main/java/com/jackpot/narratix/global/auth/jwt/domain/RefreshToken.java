package com.jackpot.narratix.global.auth.jwt.domain;

import java.util.Date;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class RefreshToken {
    private final String token;
    private final String subject;
    private final Date issuedAt;
    private final Date expiration;

    public static RefreshToken of(String token, String subject, Date issuedAt, Date expiration) {
        return new RefreshToken(token, subject, issuedAt, expiration);
    }

    public boolean isExpired() {
        return expiration.before(new Date());
    }
}
