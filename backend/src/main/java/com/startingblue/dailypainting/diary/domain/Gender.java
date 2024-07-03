package com.startingblue.dailypainting.diary.domain;

import lombok.Getter;

@Getter
public enum Gender {
    MALE(1L, "남성"), // 남성
    FEMALE(2L, "여성"); // 여성


    private final Long id;
    private final String name;

    Gender(final Long id, final String name) {
        this.id = id;
        this.name = name;
    }

    public static Gender findGender(final String genderType) {
        for (Gender gender : Gender.values()) {
            if (gender.getName().equalsIgnoreCase(genderType)) {
                return gender;
            }
        }

        throw new RuntimeException("존재하지 않는 성별 입니다.");
    }
}
