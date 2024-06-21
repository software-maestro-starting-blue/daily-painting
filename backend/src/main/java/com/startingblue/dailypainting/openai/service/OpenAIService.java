package com.startingblue.dailypainting.openai.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.concurrent.CompletableFuture;

@Service
@Slf4j
public class OpenAIService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${openai.key}")
    private String apiKey;

    private static final String API_URL = "https://api.openai.com/v1/images/generations";
    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String CONTENT_TYPE_HEADER = "Content-Type";
    private static final String BEARER_TOKEN_PREFIX = "Bearer ";
    private static final String CONTENT_TYPE_JSON = "application/json";
    private static final String MODEL = "dall-e-3";
    private static final int IMAGE_COUNT = 1;
    private static final String IMAGE_SIZE = "1024x1024";

    @Async
    public CompletableFuture<String> sendDiaryToChatGpt(final String diaryContent) {
        HttpHeaders headers = createHeaders();
        String requestBody = createRequestBody(diaryContent);
        log.info("requestBody: {}", requestBody);
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> responseEntity;
        try {
            responseEntity = restTemplate.exchange(API_URL, HttpMethod.POST, requestEntity, String.class);
            log.info("DALL-E 3 Response: {}", responseEntity.getBody());
        } catch (Exception e) {
            log.error("ChatGPT API 호출 에러", e);
            throw new RuntimeException("ChatGPT API 호출 에러", e);
        }

        String imageUrl = extractImageUrlFromResponse(responseEntity.getBody());
        log.info("DALL-E 3 imageURL: {}", imageUrl);
        return CompletableFuture.completedFuture(imageUrl);
    }

    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set(AUTHORIZATION_HEADER, BEARER_TOKEN_PREFIX + apiKey);
        headers.set(CONTENT_TYPE_HEADER, CONTENT_TYPE_JSON);
        return headers;
    }

    private String createRequestBody(final String diaryContent) {
        return String.format("{\"model\":\"%s\", \"prompt\":\"%s\", \"n\":%d, \"size\":\"%s\"}",
                MODEL, diaryContent, IMAGE_COUNT, IMAGE_SIZE);
    }

    private String extractImageUrlFromResponse(final String responseBody) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode root = objectMapper.readTree(responseBody);
            JsonNode dataNode = root.path("data").get(0);
            return dataNode.path("url").asText();
        } catch (IOException e) {
            log.error("DALL-E 3 URL 추출 에러", e);
            throw new RuntimeException("존재하지 않는 DALL-E 3 URL 입니다.", e);
        }
    }
}
