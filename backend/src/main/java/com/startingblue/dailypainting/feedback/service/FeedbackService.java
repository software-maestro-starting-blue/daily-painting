package com.startingblue.dailypainting.feedback.service;

import com.startingblue.dailypainting.diary.domain.Diary;
import com.startingblue.dailypainting.diary.domain.DiaryRepository;
import com.startingblue.dailypainting.diary.exception.DiaryNotFoundException;
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

    private static final String HYPHEN = "-";
    private final FeedbackRepository feedbackRepository;
    private final DiaryRepository diaryRepository;

    public void save(final FeedbackSaveRequest feedbackSaveRequest) {

        final Diary diary = diaryRepository.findById(feedbackSaveRequest.getDiaryId())
                .orElseThrow(DiaryNotFoundException::new);
        final String[] phoneNumberElements = feedbackSaveRequest.getPhoneNumber();
        final String phoneNumber = String.join(HYPHEN, phoneNumberElements);

        final Feedback feedback = new Feedback(
                feedbackSaveRequest.getServiceSatisfaction(),
                feedbackSaveRequest.getImageQuality(),
                feedbackSaveRequest.getImageSatisfaction(),
                feedbackSaveRequest.getComment(),
                feedbackSaveRequest.getFavoriteCharacter(),
                diary,
                feedbackSaveRequest.isEventAgreed(),
                phoneNumber);

        feedbackRepository.save(feedback);
    }
}
