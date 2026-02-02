package com.jackpot.narratix.domain.controller;

import com.jackpot.narratix.domain.controller.request.GetLibraryListRequest;
import com.jackpot.narratix.domain.controller.response.GetLibraryListResponse;
import com.jackpot.narratix.domain.service.LibraryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.swing.text.html.parser.Entity;
import java.util.List;

@RestController
@RequestMapping("/api/v1/library")
public class LibraryController {

    LibraryService libraryService;

    @GetMapping("/all")
    public ResponseEntity<GetLibraryListResponse> getLibraryList(
            @Valid @ModelAttribute GetLibraryListRequest request
    ) {
        List<String> names = libraryService.getLibraryList(request);
        return ResponseEntity.ok(new GetLibraryListResponse(names));
    }
}
