package com.jackpot.narratix.domain.controller;

import com.jackpot.narratix.domain.controller.request.GetLibraryListRequest;
import com.jackpot.narratix.domain.controller.response.GetLibraryListResponse;
import com.jackpot.narratix.domain.service.LibraryService;
import com.jackpot.narratix.global.auth.UserId;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/library")
public class LibraryController {

    private final LibraryService libraryService;

    @GetMapping("/all")
    public ResponseEntity<GetLibraryListResponse> getLibraryList(
            @UserId String userId,
            @Valid @ModelAttribute GetLibraryListRequest request
    ) {
        List<String> libraryList = libraryService.getLibraryList(userId, request);
        return ResponseEntity.ok(new GetLibraryListResponse(libraryList));
    }
}
