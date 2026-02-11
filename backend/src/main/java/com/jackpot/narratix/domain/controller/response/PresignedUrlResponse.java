package com.jackpot.narratix.domain.controller.response;

import java.util.Map;

public record PresignedUrlResponse(

        String presignedUrl,  // S3 업로드용 임시 주소
        String fileKey,  // S3 내 저장 경로 (UUID 포함)
        Map<String, String> requiredHeaders // 클라이언트가 필수 포함해야 할 헤더
) {
}
