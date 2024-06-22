package com.startingblue.dailypainting.ai.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.startingblue.dailypainting.diary.dto.DiarySaveRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;


@Service
@Slf4j
@RequiredArgsConstructor
public class AIDiaryService {

    private final SynarioService aiSynarioService;
    private final VisionService aiVisionService;
    private final DiaryConvertService diaryConvertService;

    @Async
    public CompletableFuture<String> generateImageFromDiary(final DiarySaveRequest diarySaveRequest) {

        String diaryContent = diaryConvertService.convertDiarySaveRequestToString(diarySaveRequest);

        JsonNode synopsis = aiSynarioService.sendDiaryToLLM(diaryContent);

        String synopsisString = diaryConvertService.convertSynopsisJsonToString(synopsis);

        String imageUrl = aiVisionService.sendSynopsisToVision(synopsisString);

        return CompletableFuture.completedFuture(imageUrl);
    }

}
