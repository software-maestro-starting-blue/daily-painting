package com.startingblue.dailypainting.diary.controller;

import com.startingblue.dailypainting.chatgpt.service.ChatGptService;
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
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequiredArgsConstructor
public final class DiaryController {

    private final DiaryService diaryService;
    private final ChatGptService chatGptService;

    @GetMapping("/api/diaries")
    public ResponseEntity<DiaryFormResponse> diaryHome() {
        DiaryFormResponse diaryFormResponse = new DiaryFormResponse(
                List.of(Arrays.toString(Weather.values())),
                List.of(Arrays.toString(Emotion.values())),
                List.of(Arrays.toString(MetPerson.values()))
        );

        return ResponseEntity.ok(diaryFormResponse);
    }

    @PostMapping("/api/diaries")
    public ResponseEntity<DiarySavedResponse> createDiary(@RequestBody DiarySaveRequest diarySaveRequest,
                                                          UriComponentsBuilder uriBuilder) {
        // 일기 저장 (이미지 제외)
        Long savedDiaryId = diaryService.save(diarySaveRequest);

        // 챗지피티한테 일기 내용 전송 및 이미지 URL 받기 (비동기 처리 후 동기적으로 기다림)
        CompletableFuture<String> future = chatGptService.sendDiaryToChatGpt(diarySaveRequest.getContent());
        String imageUrl = future.join(); // 동기적으로 기다림

        // join 이후 시작되는 메소드
        // 일기에 저장된 이미지 URL 저장, 1시간 이후 사라짐 (우선 이렇게 해둠)
        diaryService.updateDiaryImagePath(savedDiaryId, imageUrl);

        //  일기 아이디, 생성된 그림 URL 응답 및 redirect path 전송
        DiarySavedResponse diarySavedResponse = new DiarySavedResponse(savedDiaryId, imageUrl);
        URI location = uriBuilder.path("/diaries/show")
                .build()
                .toUri();

        return ResponseEntity.created(location).body(diarySavedResponse);
    }
}
