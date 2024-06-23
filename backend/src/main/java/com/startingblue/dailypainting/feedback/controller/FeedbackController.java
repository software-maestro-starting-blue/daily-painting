package com.startingblue.dailypainting.feedback.controller;

import com.startingblue.dailypainting.feedback.dto.FeedbackSaveRequest;
import com.startingblue.dailypainting.feedback.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public final class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping("/api/feedbacks")
    public ResponseEntity<Integer> createFeedback(@RequestBody final FeedbackSaveRequest feedbackSaveRequest){
        feedbackService.save(feedbackSaveRequest);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .build();
    }
}
