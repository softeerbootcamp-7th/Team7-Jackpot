package com.jackpot.narratix.domain.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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

import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Slf4j
@Service
public class AiLabelingService {

    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com";
    private static final String GEMINI_MODEL_PATH = "/v1beta/models/gemini-2.5-flash:generateContent";

    private final RestClient restClient;
    private final ObjectMapper objectMapper;
    private final String promptTemplate;
    private final String apiKey;

    public AiLabelingService(
            @Value("${gemini.api-key}") String apiKey,
            @Value("classpath:LabelingPrompt.txt") Resource promptResource
    ) {
        this.apiKey = apiKey;
        this.restClient = RestClient.builder().baseUrl(GEMINI_API_URL).build();
        this.objectMapper = new ObjectMapper();
        this.promptTemplate = loadPrompt(promptResource);
    }

    public String aiAnalyze(String text) {
        if (text == null || text.isBlank()) {
            throw new AiLabelingException("분석할 텍스트가 비어있습니다.");
        }
        String fullPrompt = promptTemplate.replace("{{INPUT_TEXT}}", text);
        AiLabelingRequest requestBody = AiLabelingRequest.of(fullPrompt);

        try {
            log.info("AI Labeling start");

            AiLabelingResponse response = restClient.post()
                    .uri(uriBuilder -> uriBuilder
                            .path(GEMINI_MODEL_PATH)
                            .queryParam("key", apiKey)
                            .build())
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(requestBody)
                    .retrieve()
                    .onStatus(HttpStatusCode::is4xxClientError, (req, res) -> {
                        throw new AiLabelingException("AI 요청 거부 (4xx): " + res.getStatusText());
                    })
                    .onStatus(HttpStatusCode::is5xxServerError, (req, res) -> {
                        throw new AiLabelingException("AI 서버 오류 (5xx): " + res.getStatusText());
                    })
                    .body(AiLabelingResponse.class);

            if (response == null) {
                throw new AiLabelingException("AI 응답이 비어있습니다.");
            }

            String rawResponse = response.extractText();
            if (rawResponse == null || rawResponse.isBlank()) {
                throw new AiLabelingException("AI 응답 텍스트가 비어있습니다.");
            }

            validateJsonStructure(rawResponse);

            return rawResponse;

        } catch (AiLabelingException e) {
            throw e;
        } catch (Exception e) {
            log.error("AI Unknown Error", e);
            throw new AiLabelingException("AI 분석 중 알 수 없는 오류 발생", e);
        }
    }

    private String loadPrompt(Resource resource) {
        try (InputStreamReader reader = new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8)) {
            return FileCopyUtils.copyToString(reader);
        } catch (IOException e) {
            throw new IllegalStateException("프롬프트 파일 로드 실패", e);
        }
    }

    private void validateJsonStructure(String json) {
        try {
            JsonNode root = objectMapper.readTree(json);
            log.info("응답 형태: {}", json);

            if (!root.isArray()) {
                throw new AiLabelingException("AI 응답이 배열(List) 형식이 아닙니다.");
            }
        } catch (JsonProcessingException e) {
            log.error("Invalid JSON received: {}", json);
            throw new AiLabelingException("AI 응답이 올바른 JSON 형식이 아닙니다.", e);
        }
    }
}
