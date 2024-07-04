package com.startingblue.dailypainting.diary.domain;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public enum Weather {
    CLEAR(1L, "맑음"), // Clear
    CLOUDY(2L, "흐림"), // Cloudy
    RAIN(3L, "비"), // Rain
    SNOW(4L, "눈"), // Snow
    WINDY(5L, "바람"), // Windy
    YELLOW_DUST(6L, "황사"), // YellowDust
    HEATWAVE(7L, "폭염"), // Heatwave
    COLD_WAVE(8L, "한파"), // ColdWave
    TYPHOON(9L, "태풍"); // Typhoon

    private final Long id;
    private final String name;

    Weather(final Long id, final String name) {
        this.id = id;
        this.name = name;
    }

    public static Weather findWeather(final String weatherType) {
        for (Weather weather : Weather.values()) {
            if (weather.name().equalsIgnoreCase(weatherType)) {
                return weather;
            }
        }

        throw new RuntimeException("존재하지 않는 날씨 입니다.");
    }

    public static List<String> findAllNames() {
        return Arrays.stream(Weather.values())
                .map(Weather::name)
                .collect(Collectors.toList());
    }

    public static List<String> findAllKoreanNames() {
        return Arrays.stream(Weather.values())
                .map(Weather::getName)
                .collect(Collectors.toList());
    }
}
