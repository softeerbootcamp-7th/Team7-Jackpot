package com.jackpot.narratix.domain.controller;

import com.jackpot.narratix.domain.controller.api.ShareLinkApi;
import com.jackpot.narratix.domain.controller.request.ShareLinkActiveRequest;
import com.jackpot.narratix.domain.controller.response.ShareLinkActiveResponse;
import com.jackpot.narratix.domain.service.ShareLinkService;
import com.jackpot.narratix.global.auth.UserId;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ShareLinkController implements ShareLinkApi {

    private final ShareLinkService shareLinkService;

    @Override
    @PatchMapping("/coverletter/{coverLetterId}/share-link")
    public ResponseEntity<ShareLinkActiveResponse> updateShareLinkStatus(
            @UserId String userId,
            @PathVariable Long coverLetterId,
            @Valid @RequestBody ShareLinkActiveRequest request
    ) {
        return ResponseEntity.ok(shareLinkService.updateShareLinkStatus(userId, coverLetterId, request.active()));
    }
}
