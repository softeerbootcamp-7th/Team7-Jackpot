package com.jackpot.narratix.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

import java.time.Duration;

@Configuration
public class RestClientConfig {
    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com";

    @Bean
    public RestClient geminiRestClient() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();

        factory.setConnectTimeout(Duration.ofSeconds(3));
        factory.setReadTimeout(Duration.ofSeconds(60));

        return RestClient.builder()
                .baseUrl(GEMINI_API_URL)
                .requestFactory(factory)
                .build();
    }
}
