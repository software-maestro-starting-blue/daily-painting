package com.startingblue.dailypainting.feedback.domain;

import com.startingblue.dailypainting.diary.domain.Diary;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@Entity
public final class Feedback {

    @Id
    @GeneratedValue
    private Long id;

    @Min(1)
    @Max(5)
    private int serviceSatisfaction;

    @Min(1)
    @Max(5)
    private int imageQuality;

    @Min(1)
    @Max(5)
    private int imageSatisfaction;

    @Column(length = 500)
    private String comment;

    @Column(length = 500)
    private String favoriteCharacter;

    @OneToOne
    private Diary diary;

    public Feedback() {
    }

    public Feedback(final Long id, final int serviceSatisfaction, final int imageQuality, final int imageSatisfaction, final String comment, final String favoriteCharacter, final Diary diary) {
        this.id = id;
        this.serviceSatisfaction = serviceSatisfaction;
        this.imageQuality = imageQuality;
        this.imageSatisfaction = imageSatisfaction;
        this.comment = comment;
        this.favoriteCharacter = favoriteCharacter;
        this.diary = diary;
    }

    public Feedback(final int serviceSatisfaction, final int imageQuality, final int imageSatisfaction, final String comment, final String favoriteCharacter, final Diary diary) {
        this.id = -1L;
        this.serviceSatisfaction = serviceSatisfaction;
        this.imageQuality = imageQuality;
        this.imageSatisfaction = imageSatisfaction;
        this.comment = comment;
        this.favoriteCharacter = favoriteCharacter;
        this.diary = diary;
    }
}
