package com.startingblue.dailypainting.diary.dto;

import java.util.List;

public record DiaryFormResponse(List<String> weathers, List<String> emotions, List<String> metPeople,
                                List<String> weatherKoreanNames, List<String> emotionKoreanNames,
                                List<String> metPeopleKoreanNames) {

}
