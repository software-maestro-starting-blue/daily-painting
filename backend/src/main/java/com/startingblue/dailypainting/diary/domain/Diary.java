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

    // TODO: VO로 수정 가능
    private int birthYear;

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

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(columnDefinition = "TEXT")
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

    public void updateImageUrl(final String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
