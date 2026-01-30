package com.jackpot.narratix.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "qna")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class QnA extends BaseTimeEntity {

    @Id
    private Long id;

    @ManyToOne(fetch = jakarta.persistence.FetchType.LAZY)
    @JoinColumn(name = "coverletter_id", nullable = false)
    private CoverLetter coverLetter;

    @Column(name = "question", nullable = false)
    private String question;

    @Column(name = "answer", nullable = false)
    private String answer;
}
