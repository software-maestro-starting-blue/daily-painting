package com.startingblue.dailypainting.feedback.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public final class FeedbackSaveRequest {

    private final int serviceSatisfaction;

    private final int imageQuality;

    private final int imageSatisfaction;

    private final String comment;

    private final String favoriteCharacter;

    private final Long diaryId;
}
