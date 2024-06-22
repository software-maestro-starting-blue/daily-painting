package com.startingblue.dailypainting.feedback.service;

import com.startingblue.dailypainting.diary.domain.Diary;
import com.startingblue.dailypainting.diary.domain.DiaryRepository;
import com.startingblue.dailypainting.feedback.domain.Feedback;
import com.startingblue.dailypainting.feedback.domain.FeedbackRepository;
import com.startingblue.dailypainting.feedback.dto.FeedbackSaveRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class FeedbackService {

    private static final String DIARY_NOT_FOUND_EXCEPTION_MESSAGE = "존재하지 않는 일기";
    private final FeedbackRepository feedbackRepository;
    private final DiaryRepository diaryRepository;

    public void save(final FeedbackSaveRequest feedbackSaveRequest) {

        final Diary diary = diaryRepository.findById(feedbackSaveRequest.getDiaryId())
                .orElseThrow(() -> new IllegalArgumentException(DIARY_NOT_FOUND_EXCEPTION_MESSAGE));
        final Feedback feedback = new Feedback(
                feedbackSaveRequest.getServiceSatisfaction(),
                feedbackSaveRequest.getImageQuality(),
                feedbackSaveRequest.getImageSatisfaction(),
                feedbackSaveRequest.getComment(),
                feedbackSaveRequest.getFavoriteCharacter(),
                diary);

        feedbackRepository.save(feedback);
    }
}
