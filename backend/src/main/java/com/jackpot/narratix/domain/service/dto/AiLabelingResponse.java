package com.jackpot.narratix.domain.service.dto;

import java.util.List;

public record AiLabelingResponse(List<Candidate> candidates) {

    public record Candidate(Content content) {
    }

    public record Content(List<Part> parts) {
    }

    public record Part(String text) {
    }

    public String extractText() {
        if (candidates == null || candidates.isEmpty()) {
            throw new IllegalStateException("Gemini API 응답이 비어있습니다.");
        }
        return candidates.get(0).content().parts().get(0).text();
    }
}