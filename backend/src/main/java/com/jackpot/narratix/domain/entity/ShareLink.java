package com.jackpot.narratix.domain.entity;

import com.github.f4b6a3.ulid.UlidCreator;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "share_link")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ShareLink {

    @Id
    @Column(name = "cover_letter_id")
    private Long coverLetterId;

    @Column(name = "share_id", nullable = false)
    private String shareId;

    @NotNull
    @Column(name = "is_shared", nullable = false)
    private boolean isShared;

    @NotNull
    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expiresAt;

    public static ShareLink newActivatedShareLink(Long coverLetterId){
        return new ShareLink(
                coverLetterId,
                UlidCreator.getUlid().toString(),
                true,
                LocalDateTime.now().plusDays(14)
        );
    }

    public void activate(){
        this.isShared = true;
        this.shareId = UlidCreator.getUlid().toString();
        this.expiresAt = LocalDateTime.now().plusDays(14);
    }

    public void deactivate(){
        this.isShared = false;
    }

}
