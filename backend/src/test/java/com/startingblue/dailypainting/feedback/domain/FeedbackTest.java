package com.startingblue.dailypainting.feedback.domain;

import com.startingblue.dailypainting.diary.domain.Diary;
import com.startingblue.dailypainting.diary.domain.Gender;
import com.startingblue.dailypainting.diary.domain.Weather;
import com.startingblue.dailypainting.feedback.exception.CommentLengthOverException;
import com.startingblue.dailypainting.feedback.exception.FavoriteCharacterLengthOverException;
import com.startingblue.dailypainting.feedback.exception.ImageQualityValueException;
import com.startingblue.dailypainting.feedback.exception.ImageSatisfactionValueException;
import com.startingblue.dailypainting.feedback.exception.ServiceSatisfactionValueException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;


class FeedbackTest {

    @ValueSource(ints = {-9999, -1, 0, 6, 7, 8, 10, 10000})
    @ParameterizedTest
    public void 서비스_만족도는_0이하거나_6이상일_수_없다(int serviceSatisfaction) {
        //given
        final Diary diary = Diary.createDiary(2000, Gender.FEMALE, Weather.CLEAR, new ArrayList<>(), new ArrayList<>(), "");

        //when & then
        assertThatThrownBy(
                () -> new Feedback(serviceSatisfaction, 1, 1, "", "", diary, false, null)
        ).isInstanceOf(ServiceSatisfactionValueException.class);
    }

    @ValueSource(ints = {1, 2, 3, 4, 5})
    @ParameterizedTest
    public void 서비스_만족도는_1이상_5이하다(int serviceSatisfaction) {
        //given
        final Diary diary = Diary.createDiary(2000, Gender.FEMALE, Weather.CLEAR, new ArrayList<>(), new ArrayList<>(), "");

        //when & then
        assertDoesNotThrow(
                () -> new Feedback(serviceSatisfaction, 1, 1, "", "", diary, false, null)
        );
    }

    @ValueSource(ints = {-9999, -1, 0, 6, 7, 8, 10, 10000})
    @ParameterizedTest
    public void 이미지_품질은_0이하거나_6이상일_수_없다(int imageQuality) {
        //given
        final Diary diary = Diary.createDiary(2000, Gender.FEMALE, Weather.CLEAR, new ArrayList<>(), new ArrayList<>(), "");

        //when & then
        assertThatThrownBy(
                () -> new Feedback(1, imageQuality, 1, "", "", diary, false, null)
        ).isInstanceOf(ImageQualityValueException.class);
    }

    @ValueSource(ints = {1, 2, 3, 4, 5})
    @ParameterizedTest
    public void 이미지_품질은_1이상_5이하다(int imageQuality) {
        //given
        final Diary diary = Diary.createDiary(2000, Gender.FEMALE, Weather.CLEAR, new ArrayList<>(), new ArrayList<>(), "");

        //when & then
        assertDoesNotThrow(
                () -> new Feedback(1, imageQuality, 1, "", "", diary, false, null)
        );
    }

    @ValueSource(ints = {-9999, -1, 0, 6, 7, 8, 10, 10000})
    @ParameterizedTest
    public void 이미지_만족도는_0이하거나_6이상일_수_없다(int imageSatisfaction) {
        //given
        final Diary diary = Diary.createDiary(2000, Gender.FEMALE, Weather.CLEAR, new ArrayList<>(), new ArrayList<>(), "");

        //when & then
        assertThatThrownBy(
                () -> new Feedback(1, 1, imageSatisfaction, "", "", diary, false, null)
        ).isInstanceOf(ImageSatisfactionValueException.class);
    }

    @ValueSource(ints = {1, 2, 3, 4, 5})
    @ParameterizedTest
    public void 이미지_만족도는_1이상_5이하다(int imageSatisfaction) {
        //given
        final Diary diary = Diary.createDiary(2000, Gender.FEMALE, Weather.CLEAR, new ArrayList<>(), new ArrayList<>(), "");

        //when & then
        assertDoesNotThrow(
                () -> new Feedback(1, 1, imageSatisfaction, "", "", diary, false, null)
        );
    }

    @ValueSource(ints = {501, 600})
    @ParameterizedTest
    public void 추가_의견은_500자_초과일_수_없다(int characterLength) {
        //given
        final Diary diary = Diary.createDiary(2000, Gender.FEMALE, Weather.CLEAR, new ArrayList<>(), new ArrayList<>(), "");

        final StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < characterLength; i++) {
            stringBuilder.append("a");
        }
        final String comment = stringBuilder.toString();

        //when & then
        assertThatThrownBy(
                () -> new Feedback(1, 1, 1, comment, "", diary, false, null)
        ).isInstanceOf(CommentLengthOverException.class);
    }

    @ValueSource(ints = {0, 1, 200, 300, 400, 500})
    @ParameterizedTest
    public void 추가_의견은_0자_이상_500자_이하다(int characterLength) {
        //given
        final Diary diary = Diary.createDiary(2000, Gender.FEMALE, Weather.CLEAR, new ArrayList<>(), new ArrayList<>(), "");

        final StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < characterLength; i++) {
            stringBuilder.append("a");
        }
        final String comment = stringBuilder.toString();

        //when & then
        assertDoesNotThrow(
                () -> new Feedback(1, 1, 1, comment, "", diary, false, null)
        );
    }

    @ValueSource(ints = {501, 600})
    @ParameterizedTest
    public void 좋아하는_캐릭터는_500자_초과일_수_없다(int characterLength) {
        //given
        final Diary diary = Diary.createDiary(2000, Gender.FEMALE, Weather.CLEAR, new ArrayList<>(), new ArrayList<>(), "");

        final StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < characterLength; i++) {
            stringBuilder.append("a");
        }
        final String favoriteCharacter = stringBuilder.toString();

        //when & then
        assertThatThrownBy(
                () -> new Feedback(1, 1, 1, "", favoriteCharacter, diary, false, null)
        ).isInstanceOf(FavoriteCharacterLengthOverException.class);
    }

    @ValueSource(ints = {0, 100, 200, 300, 400, 500})
    @ParameterizedTest
    public void 좋아하는_캐릭터는_0자_이상_500자_이하다(int characterLength) {
        //given
        final Diary diary = Diary.createDiary(2000, Gender.FEMALE, Weather.CLEAR, new ArrayList<>(), new ArrayList<>(), "");

        final StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < characterLength; i++) {
            stringBuilder.append("a");
        }
        final String favoriteCharacter = stringBuilder.toString();

        //when & then
        assertDoesNotThrow(
                () -> new Feedback(1, 1, 1, "", favoriteCharacter, diary, false, null)
        );
    }

    @Test
    public void 이벤트에_동의하지_않는_경우_전화번호가_UNKNOWN으로_저장된다() {
        //given
        final Diary diary = Diary.createDiary(2000, Gender.FEMALE, Weather.CLEAR, new ArrayList<>(), new ArrayList<>(), "");
        final Feedback feedback = new Feedback(1, 1, 1, "", "", diary, false, "000-0000-0000");

        //when & then
        assertThat(feedback.getEvent().isEventAgreed()).isFalse();
        assertThat(feedback.getEvent().getPhoneNumber()).isEqualTo("UNKNOWN");
    }

    @Test
    public void 이벤트에_동의하는_경우_전화번호가_저장된다() {
        //given
        final Diary diary = Diary.createDiary(2000, Gender.FEMALE, Weather.CLEAR, new ArrayList<>(), new ArrayList<>(), "");
        final String eventPhoneNumber = "000-0000-0000";
        final Feedback feedback = new Feedback(1, 1, 1, "", "", diary, true, eventPhoneNumber);

        //when & then
        assertThat(feedback.getEvent().isEventAgreed()).isTrue();
        assertThat(feedback.getEvent().getPhoneNumber()).isEqualTo(eventPhoneNumber);
    }
}
