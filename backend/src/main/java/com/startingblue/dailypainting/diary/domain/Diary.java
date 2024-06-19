package com.startingblue.dailypainting.diary.domain;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.List;

@Entity
@Getter
public final class Diary {

    @Id @GeneratedValue
    @Column(name = "diary_id")
    private Long id;

    private int birthYear; // 추 후 VO로 수정 해도 될 듯?

    private Gender gender;

    @Enumerated(EnumType.STRING)
    private Weather weather;

    @ElementCollection(targetClass = Emotion.class)
    @Enumerated(EnumType.STRING)
    private List<Emotion> emotions;

    @ElementCollection(targetClass = MetPerson.class)
    @Enumerated(EnumType.STRING)
    @Column(name = "met_people")
    private List<MetPerson> metPeople;

    private String content;

    @Column(columnDefinition = "TEXT") // 이미지 URL 글자수가 너무 길어서 columnDefinition 설정
    private String imageUrl;

    protected Diary() {
    }

    private Diary(final int birthYear, final Gender gender,
                  final Weather weather, final List<Emotion> emotions, final List<MetPerson> metPeople,
                  final String content) {
        this.birthYear = birthYear;
        this.gender = gender;
        this.weather = weather;
        this.emotions = emotions;
        this.metPeople = metPeople;
        this.content = content;
    }

    public static Diary createDiary(final int birthYear, final Gender gender,
                                    final Weather weather, final List<Emotion> emotions, final List<MetPerson> metPeople,
                                    final String content) {
        return new Diary(birthYear, gender, weather, emotions, metPeople, content);
    }

    public void setImagePath(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
