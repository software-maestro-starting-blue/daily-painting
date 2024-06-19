package com.startingblue.dailypainting.diary.dto;

import lombok.Getter;

@Getter
public final class DiarySavedResponse {

    private final Long diaryId;

    private final String imageUrl;

    public DiarySavedResponse(final Long diaryId, final String imageUrl) {
        this.diaryId = diaryId;
        this.imageUrl = imageUrl;
    }
}
