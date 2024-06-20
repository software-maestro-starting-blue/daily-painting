package com.startingblue.dailypainting.diary.domain;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public enum Weather {
    CLEAR(1L, "Clear"), // 맑음
    CLOUDY(2L, "Cloudy"), // 흐림
    RAIN(3L, "Rain"), // 비
    SNOW(4L, "Snow"), // 눈
    WINDY(5L, "Windy"), // 바람
    YELLOW_DUST(6L, "YellowDust"), // 황사
    HEATWAVE(7L, "Heatwave"), // 폭염
    COLD_WAVE(8L, "ColdWave"), // 한파
    TYPHOON(9L, "Typhoon"); // 태풍

    private final Long id;
    private final String name;

    Weather(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public static Weather findWeather(String weatherType) {
        for (Weather weather : Weather.values()) {
            if (weather.getName().equalsIgnoreCase(weatherType)) {
                return weather;
            }
        }

        throw new RuntimeException("존재하지 않는 날씨 입니다.");
    }

    public static List<String> findAllNames() {
        return Arrays.stream(Weather.values())
                .map(Weather::getName)
                .collect(Collectors.toList());
    }
}
