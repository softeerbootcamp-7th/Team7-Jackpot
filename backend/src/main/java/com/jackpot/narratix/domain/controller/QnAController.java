package com.jackpot.narratix.domain.controller;

import com.jackpot.narratix.domain.controller.request.QnAEditRequest;
import com.jackpot.narratix.domain.controller.response.QnAEditResponse;
import com.jackpot.narratix.domain.service.CoverLetterService;
import com.jackpot.narratix.global.auth.UserId;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/qna")
public class QnAController {

    private final CoverLetterService coverLetterService;

    @PutMapping
    public ResponseEntity<QnAEditResponse> editQnA(
            @UserId String userId,
            @RequestBody @Valid QnAEditRequest request
            ) {
        return ResponseEntity.ok(coverLetterService.editQnA(userId, request));
    }
}
