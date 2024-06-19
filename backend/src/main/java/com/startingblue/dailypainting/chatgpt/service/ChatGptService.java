package com.startingblue.dailypainting.chatgpt.service;

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
public class ChatGptService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${chatgpt.key}")
    private String apiKey; // 실제 API 키

    private static final String apiUrl = "https://api.openai.com/v1/images/generations";

    @Async
    public CompletableFuture<String> sendDiaryToChatGpt(String diaryContent) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");

        // 프롬프트 수정이 필요함.
        String requestBody = "{\"model\":\"dall-e-3\", \"prompt\":\"" + diaryContent + "\", \"n\":1, \"size\":\"1024x1024\"}";

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> responseEntity;
        try {
            responseEntity = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, String.class);
            log.info("DALL-E 3 Response: {}", responseEntity.getBody());
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("ChatGPT API 호출 에러");
        }

//       응답을 파싱하여 이미지 URL을 추출
        String imageUrl = extractImageUrlFromResponse(responseEntity.getBody());
        log.info("DALL-E 3 imageURL: {}", imageUrl);
        return CompletableFuture.completedFuture(imageUrl);
    }

    private String extractImageUrlFromResponse(String responseBody) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode root = objectMapper.readTree(responseBody);
            JsonNode dataNode = root.path("data").get(0);
            return dataNode.path("url").asText();
        } catch (IOException e) {
            e.printStackTrace();
        }

        throw new RuntimeException("존재하지 않는 Dall-E 3 URL 입니다.");
    }
}
