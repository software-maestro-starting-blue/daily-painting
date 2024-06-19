package com.startingblue.dailypainting.diary.domain;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public enum MetPerson {
    FRIEND(1L, "Friend"), // 친구
    FAMILY(2L, "Family"), // 가족
    LOVER(3L, "Lover"), // 애인
    ACQUAINTANCE(4L, "Acquaintance"), // 지인
    NO_ONE(5L, "NoOne"); // 안만남

    private final Long id;
    private final String name;

    MetPerson(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public static List<MetPerson> findMetPeople(List<String> metPersonTypes) {
        List<MetPerson> matchingMetPeople = new ArrayList<>();

        for (String metPersonType : metPersonTypes) {
            for (MetPerson metPerson : MetPerson.values()) {
                if (metPersonType.trim().equalsIgnoreCase(metPerson.getName())) {
                    matchingMetPeople.add(metPerson);
                    break;
                }
            }
        }

        if (matchingMetPeople.isEmpty()) {
            throw new RuntimeException("존재하지 않는 사람 입니다.");
        }

        return matchingMetPeople;
    }
}
