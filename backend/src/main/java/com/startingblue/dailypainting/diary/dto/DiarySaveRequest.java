package com.startingblue.dailypainting.diary.dto;

import lombok.Getter;

import java.util.List;

@Getter
public final class DiarySaveRequest {

    private final int birthYear;

    private final String gender;

    private final String weather;

    private final List<String> emotions;

    private final List<String> metPeople;

    private final String content;

    public DiarySaveRequest(
            final int birthYear, final String gender,
            final String weather, final List<String> emotions, final List<String> metPeople,
                            final String content) {
        this.birthYear = birthYear;
        this.gender = gender;
        this.weather = weather;
        this.emotions = emotions;
        this.metPeople = metPeople;
        this.content = content;
    }
}
