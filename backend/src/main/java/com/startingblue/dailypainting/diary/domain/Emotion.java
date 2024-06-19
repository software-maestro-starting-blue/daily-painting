package com.startingblue.dailypainting.diary.domain;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public enum Emotion {
    EXCITED(1L, "Excited"), // 신나는
    RELAXED(2L, "Relaxed"), // 편안한
    PROUD(3L, "Proud"), // 뿌듯한
    ANTICIPATING(4L, "Anticipating"), // 기대되는
    HAPPY(5L, "Happy"), // 행복한
    MOTIVATED(6L, "Motivated"), // 의욕적인
    THRILLED(7L, "Thrilled"), // 설레는
    REFRESHING(8L, "Refreshing"), // 상쾌한
    DEPRESSED(9L, "Depressed"), // 우울한
    LONELY(10L, "Lonely"), // 외로운
    ANXIOUS(11L, "Anxious"), // 불안한
    SAD(12L, "Sad"), // 슬픈
    ANGRY(13L, "Angry"), // 화난
    PRESSURED(14L, "Pressured"), // 부담되는
    ANNOYED(15L, "Annoyed"), // 짜증나는
    TIRED(16L, "Tired"); // 피곤한

    private final Long id;
    private final String name;

    Emotion(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public static List<Emotion> findEmotions(List<String> emotionTypes) {
        List<Emotion> matchingEmotions = new ArrayList<>();

        for (String emotionType : emotionTypes) {
            for (Emotion emotion : Emotion.values()) {
                if (emotionType.trim().equalsIgnoreCase(emotion.getName())) {
                    matchingEmotions.add(emotion);
                    break;
                }
            }
        }

        if (matchingEmotions.isEmpty()) {
            throw new RuntimeException("존재하지 않는 감정 입니다.");
        }

        return matchingEmotions;
    }
}
