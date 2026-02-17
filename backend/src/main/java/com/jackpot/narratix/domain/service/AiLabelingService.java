package com.jackpot.narratix.domain.service;

import com.jackpot.narratix.domain.exception.AiLabelingException;
import com.jackpot.narratix.domain.service.dto.AiLabelingRequest;
import com.jackpot.narratix.domain.service.dto.AiLabelingResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.client.RestClient;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Slf4j
@Service
public class AiLabelingService {

    private static final String GEMINI_MODEL_PATH = "/v1beta/models/gemini-2.5-flash:generateContent";

    private final RestClient restClient;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final String promptTemplate;
    private final String apiKey;

    public AiLabelingService(
            RestClient geminiRestClient,
            @Value("${gemini.api-key}") String apiKey,
            @Value("classpath:LabelingPrompt.txt") Resource promptResource
    ) {
        this.restClient = geminiRestClient;
        this.apiKey = apiKey;
        this.promptTemplate = loadPrompt(promptResource);
    }

    public String generateLabelingJson(String extractedText) {
        validateInput(extractedText);

        String fullPrompt = buildPrompt(extractedText);
        AiLabelingRequest requestBody = AiLabelingRequest.of(fullPrompt);

        AiLabelingResponse response = requestLabeling(requestBody);

        String rawText = extractResponseText(response);
        String normalizedJson = normalizeToJson(rawText);

        validateJsonArray(normalizedJson);

        log.info("AI labeling completed. responseLength={}", normalizedJson.length());
        return normalizedJson;
    }

    private String loadPrompt(Resource resource) {
        try (InputStreamReader reader = new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8)) {
            return FileCopyUtils.copyToString(reader);
        } catch (IOException e) {
            throw new IllegalStateException("프롬프트 파일 로드 실패", e);
        }
    }

    private void validateInput(String extractedText) {
        if (extractedText == null || extractedText.isBlank()) {
            throw new AiLabelingException("분석할 텍스트가 비어있습니다.");
        }
    }

    private String buildPrompt(String extractedText) {
        return promptTemplate.replace("{{INPUT_TEXT}}", extractedText);
    }

    private AiLabelingResponse requestLabeling(AiLabelingRequest requestBody) {
        try {
            return restClient.post()
                    .uri(uriBuilder -> uriBuilder
                            .path(GEMINI_MODEL_PATH)
                            .queryParam("key", apiKey)
                            .build())
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(requestBody)
                    .retrieve()
                    .onStatus(HttpStatusCode::is4xxClientError, (req, res) -> {
                        throw new AiLabelingException("AI 요청 실패(4xx). status=" + res.getStatusCode());
                    })
                    .onStatus(HttpStatusCode::is5xxServerError, (req, res) -> {
                        throw new AiLabelingException("AI 서버 오류(5xx). status=" + res.getStatusCode());
                    })
                    .body(AiLabelingResponse.class);

        } catch (AiLabelingException e) {
            throw e;
        } catch (Exception e) {
            log.error("AI request failed (unknown)", e);
            throw new AiLabelingException("AI 호출 중 알 수 없는 오류 발생", e);
        }
    }

    private String extractResponseText(AiLabelingResponse response) {
        String rawText = response.extractText();

        if (rawText == null || rawText.isBlank()) {
            throw new AiLabelingException("AI 응답 텍스트가 비어있습니다.");
        }

        return rawText.trim();
    }

    private String normalizeToJson(String rawText) {
        String text = rawText.trim();

        //  ```json ... ``` 코드블럭 제거
        if (text.startsWith("```")) {
            text = text.replaceAll("^```[a-zA-Z]*\\s*", "");
            text = text.replaceAll("\\s*```$", "");
            text = text.trim();
        }

        // json 배열 시작/끝 위치 기반으로 자르기 (앞뒤 설명 제거)
        int start = text.indexOf('[');
        int end = text.lastIndexOf(']');

        if (start == -1 || end == -1 || start >= end) {
            throw new AiLabelingException("AI 응답에서 JSON 배열을 찾을 수 없습니다.");
        }

        return text.substring(start, end + 1).trim();
    }

    private void validateJsonArray(String json) {
        try {
            JsonNode root = objectMapper.readTree(json);

            if (!root.isArray()) {
                throw new AiLabelingException("AI 응답이 배열(List) 형식이 아닙니다.");
            }
        } catch (JacksonException e) {
            log.warn("Invalid JSON received. length={}", json.length());
            throw new AiLabelingException("AI 응답이 올바른 JSON 형식이 아닙니다.", e);
        }
    }
}
