package com.startingblue.dailypainting.diary.dto;

import lombok.Getter;

import java.util.List;

@Getter
public final class DiaryFormResponse {

    private final List<String> weathers;

    private final List<String> emotions;

    private final List<String> metPeople;

    public DiaryFormResponse(final List<String> weathers, final List<String> emotions, final List<String> metPeople) {
        this.weathers = weathers;
        this.emotions = emotions;
        this.metPeople = metPeople;
    }
}
