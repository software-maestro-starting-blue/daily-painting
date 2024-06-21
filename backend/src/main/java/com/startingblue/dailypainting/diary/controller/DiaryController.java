package com.startingblue.dailypainting.diary.controller;

import com.startingblue.dailypainting.openai.service.OpenAIService;
import com.startingblue.dailypainting.diary.domain.Emotion;
import com.startingblue.dailypainting.diary.domain.MetPerson;
import com.startingblue.dailypainting.diary.domain.Weather;
import com.startingblue.dailypainting.diary.dto.DiarySaveRequest;
import com.startingblue.dailypainting.diary.dto.DiaryFormResponse;
import com.startingblue.dailypainting.diary.dto.DiarySavedResponse;
import com.startingblue.dailypainting.diary.service.DiaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.concurrent.CompletableFuture;

@RestController
@RequiredArgsConstructor
public final class DiaryController {

    private final DiaryService diaryService;
    private final OpenAIService openAIService;

    @GetMapping("/api/diaries")
    public ResponseEntity<DiaryFormResponse> diaryHome() {
        DiaryFormResponse diaryFormResponse = new DiaryFormResponse(
                Weather.findAllNames(),
                Emotion.findAllNames(),
                MetPerson.findAllNames());

        return ResponseEntity.ok(diaryFormResponse);
    }

    @PostMapping("/api/diaries")
    public ResponseEntity<DiarySavedResponse> createDiary(@RequestBody DiarySaveRequest diarySaveRequest,
                                                          UriComponentsBuilder uriBuilder) {
        Long savedDiaryId = diaryService.save(diarySaveRequest);

        CompletableFuture<String> future = openAIService.sendDiaryToChatGpt(diarySaveRequest.getContent());
        String imageUrl = future.join();

        diaryService.updateDiaryImagePath(savedDiaryId, imageUrl);

        DiarySavedResponse diarySavedResponse = new DiarySavedResponse(savedDiaryId, imageUrl);
        URI location = uriBuilder.path("/diaries/show")
                .build()
                .toUri();

        return ResponseEntity.created(location).body(diarySavedResponse);
    }
}
