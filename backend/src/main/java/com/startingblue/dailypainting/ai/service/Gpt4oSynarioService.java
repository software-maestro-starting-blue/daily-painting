package com.startingblue.dailypainting.ai.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

import static com.startingblue.dailypainting.ai.util.OpenAIAPIGenerator.responseBodyFromAPI;

@Slf4j
@Service
public class Gpt4oSynarioService implements SynarioService {

    private static final String LLM_API_URL = "https://api.openai.com/v1/chat/completions";
    private static final String LLM_MODEL = "gpt-4o";

    @Value("{prompt.gpt4o.system}")
    private static String LLM_SYSTEM_PROMPT;

    public JsonNode sendDiaryToLLM(final String diaryContent) {
        String requestBody = createRequestBody(diaryContent);
        String responseBody = responseBodyFromAPI(requestBody, LLM_API_URL);
        JsonNode synopsis = extractJsonFromLLMResponse(responseBody);
        log.info("LLM synopsis: {}", synopsis.toPrettyString());
        return synopsis;
    }

    private JsonNode extractJsonFromLLMResponse(final String responseBody) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode root = objectMapper.readTree(responseBody);
            JsonNode content = root.path("choices").get(0).get("message").get("content");
            ObjectMapper objectMapper2 = new ObjectMapper();
            return objectMapper2.readTree(content.asText());
        } catch (IOException e) {
            log.error("LLM JSON 추출 에러", e);
            throw new RuntimeException("허용되지 않는 LLM JSON 입니다.", e);
        }
    }

    private String createRequestBody(String content) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();

            // JSON 객체 생성
            ObjectNode rootNode = objectMapper.createObjectNode();
            rootNode.put("model", LLM_MODEL);

            ArrayNode messagesArray = rootNode.putArray("messages");

            ObjectNode systemMessage = objectMapper.createObjectNode();
            systemMessage.put("role", "system");
            systemMessage.put("content", LLM_SYSTEM_PROMPT);
            messagesArray.add(systemMessage);

            ObjectNode userMessage = objectMapper.createObjectNode();
            userMessage.put("role", "user");
            userMessage.put("content", content);
            messagesArray.add(userMessage);

            // JSON 문자열로 변환
            String jsonString = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(rootNode);

            // 출력
            System.out.println(jsonString);

            return jsonString;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return "";
    }
}
