package com.startingblue.dailypainting.diary.domain;

import lombok.Getter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public enum MetPerson {
    FRIEND(1L, "친구"), // Friend
    FAMILY(2L, "가족"), // Family
    LOVER(3L, "애인"), // Lover
    ACQUAINTANCE(4L, "지인"), // Acquaintance
    NO_ONE(5L, "안만남"); // NoOne

    private final Long id;
    private final String name;

    MetPerson(final Long id, final String name) {
        this.id = id;
        this.name = name;
    }

    public static List<MetPerson> findMetPeople(final List<String> metPersonTypes) {
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

    public static List<String> findAllNames() {
        return Arrays.stream(MetPerson.values())
                .map(MetPerson::getName)
                .collect(Collectors.toList());
    }
}
