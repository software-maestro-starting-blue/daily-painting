package com.startingblue.dailypainting.diary.service;

import com.startingblue.dailypainting.diary.domain.*;
import com.startingblue.dailypainting.diary.dto.DiarySaveRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public final class DiaryService {

    private final DiaryRepository diaryRepository;

    public Long save(DiarySaveRequest diarySaveRequest) {
        int birthYear = diarySaveRequest.getBirthYear();
        Gender gender = Gender.findGender(diarySaveRequest.getGender());
        Weather weather = Weather.findWeather(diarySaveRequest.getWeather());
        List<Emotion> emotions = Emotion.findEmotions(diarySaveRequest.getEmotions());
        List<MetPerson> metPeople = MetPerson.findMetPeople(diarySaveRequest.getMetPeople());
        String content = diarySaveRequest.getContent();

        Diary diary = Diary.createDiary(
                birthYear,
                gender,
                weather,
                emotions,
                metPeople,
                content
        );

        Diary savedDiary = diaryRepository.save(diary);
        log.info("save diary: {}", savedDiary);

        return savedDiary.getId();
    }

    public void updateDiaryImagePath(Long diaryId, String imagePath) {
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 일기 입니다."));

        diary.setImagePath(imagePath);
        diaryRepository.save(diary);
    }

}
