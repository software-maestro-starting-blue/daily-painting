package com.startingblue.dailypainting.diary.domain;

import lombok.Getter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public enum Emotion {
    EXCITED(1L, "신나는"), // Excited
    RELAXED(2L, "편안한"), // Relaxed
    PROUD(3L, "뿌듯한"), // Proud
    ANTICIPATING(4L, "기대되는"), // Anticipating
    HAPPY(5L, "행복한"), // Happy
    MOTIVATED(6L, "의욕적인"), // Motivated
    THRILLED(7L, "설레는"), // Thrilled
    REFRESHING(8L, "상쾌한"), // Refreshing
    DEPRESSED(9L, "우울한"), // Depressed
    LONELY(10L, "외로운"), // Lonely
    ANXIOUS(11L, "불안한"), // Anxious
    SAD(12L, "슬픈"), // Sad
    ANGRY(13L, "화난"), // Angry
    PRESSURED(14L, "부담되는"), // Pressured
    ANNOYED(15L, "짜증나는"), // Annoyed
    TIRED(16L, "피곤한"); // Tired

    private final Long id;
    private final String name;

    Emotion(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public static List<Emotion> findEmotions(final List<String> emotionTypes) {
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

    public static List<String> findAllNames() {
        return Arrays.stream(Emotion.values())
                .map(Emotion::getName)
                .collect(Collectors.toList());
    }
}
