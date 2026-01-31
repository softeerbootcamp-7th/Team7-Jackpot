package com.jackpot.narratix.domain.entity;

import com.jackpot.narratix.domain.entity.enums.QuestionCategoryType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coverletter_id", nullable = false)
    private CoverLetter coverLetter;

    @NotNull
    @Column(name = "question", nullable = false)
    private String question;

    @NotNull
    @Column(name = "question_category", nullable = false)
    private QuestionCategoryType questionCategory;

    @NotNull
    @Column(name = "answer", nullable = true)
    private String answer;
}
