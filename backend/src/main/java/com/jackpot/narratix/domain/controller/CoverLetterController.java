package com.jackpot.narratix.domain.controller;

import com.jackpot.narratix.domain.controller.request.CreateCoverLetterRequest;
import com.jackpot.narratix.domain.controller.response.CreateCoverLetterResponse;
import com.jackpot.narratix.domain.service.CoverLetterService;
import com.jackpot.narratix.global.auth.UserId;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/coverletter")
public class CoverLetterController {

    private final CoverLetterService coverLetterService;

    @PostMapping
    public ResponseEntity<CreateCoverLetterResponse> createCoverLetter(
            @UserId String userId,
            @RequestBody @Valid CreateCoverLetterRequest createCoverLetterRequest
    ) {
        return ResponseEntity.ok(coverLetterService.createNewCoverLetter(userId, createCoverLetterRequest));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteCoverLetterById(
            @UserId String userId,
            @RequestParam @Validated @NotNull Long coverLetterId
    ) {
        coverLetterService.deleteCoverLetterById(userId, coverLetterId);
        return ResponseEntity.noContent().build();
    }
}
