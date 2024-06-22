package com.startingblue.dailypainting.ai.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.startingblue.dailypainting.diary.dto.DiarySaveRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class PromptDiaryConvertService implements DiaryConvertService {

    @Value("${prompt.promptconvert.diary}")
    private static String DIARY_PROMPT;

    @Value("${prompt.promptconvert.person}")
    private static String PERSON_PROMPT;

    @Value("${prompt.promptconvert.scene}")
    private static String SCENE_PROMPT;

    @Override
    public String convertDiarySaveRequestToString(final DiarySaveRequest diarySaveRequest) {
        return String.format(DIARY_PROMPT,
                diarySaveRequest.getWeather(),
                String.join(", ", diarySaveRequest.getEmotions()),
                String.join(", ", diarySaveRequest.getMetPeople()),
                diarySaveRequest.getContent());
    }

    @Override
    public String convertSynopsisJsonToString(final JsonNode synopsis) {
        List<String> scenePrompts = new ArrayList<>();

        Iterator<JsonNode> synopsisElements = synopsis.elements();

        while(synopsisElements.hasNext()) {
            JsonNode element = synopsisElements.next();

            List<String> personPrompts = new ArrayList<>();

            Iterator<JsonNode> personsElements = element.get("persons").elements();

            while (personsElements.hasNext()) {
                JsonNode person = personsElements.next();
                personPrompts.add(
                        String.format(PERSON_PROMPT,
                                person.get("name").asText(),
                                person.get("action").asText(),
                                person.get("facial expression").asText()
                        )
                );
            }

            String elementPrompt = String.format(SCENE_PROMPT,
                    synopsis.get("background"),
                    synopsis.get("time"),
                    synopsis.get("weather"),
                    String.join(" ", personPrompts));

            scenePrompts.add(elementPrompt);
        }

        return String.join(", ", scenePrompts);
    }
}
