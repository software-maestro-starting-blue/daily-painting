package com.startingblue.dailypainting.diary.service;

import com.startingblue.dailypainting.diary.domain.*;
import com.startingblue.dailypainting.diary.dto.DiarySaveRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StreamUtils;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class DiaryService {

    @Value("${aws.s3.bucket}")
    private String bucketName;

    @Value("${aws.s3.diary-image-folder}")
    private String diaryImageFolder;

    private final DiaryRepository diaryRepository;

    private final S3Client s3Client;

    public Long save(final DiarySaveRequest diarySaveRequest) {
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
                content);

        Diary savedDiary = diaryRepository.save(diary);
        log.info("save diary: {}", savedDiary);

        return savedDiary.getId();
    }

    public void updateDiaryImage(final Long diaryId, final String imageUrl) {
        // 이미지 업로드
        updateDiaryImagePath(diaryId, imageUrl);
        uploadDiaryImageS3(diaryId, imageUrl);
    }

    private void updateDiaryImagePath(final Long diaryId, final String imageUrl) {
            Diary diary = diaryRepository.findById(diaryId)
                    .orElseThrow(() -> new EntityNotFoundException("Diary with ID " + diaryId + " not found"));

            diary.updateImageUrl(imageUrl);
            diaryRepository.save(diary);
    }

    private void uploadDiaryImageS3(final Long diaryId, final String imageUrl) {
        byte[] imageBytes = downloadDiaryImageFromUrl(imageUrl);
        final String uploadPath = diaryImageFolder + diaryId.toString() + ".jpg";
        final PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .key(uploadPath)
                .contentType("image/*")
                .bucket(bucketName)
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(imageBytes));
    }

    private byte[] downloadDiaryImageFromUrl(final String imageUrl) {
        try {
            URL url = new URL(imageUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            InputStream inputStream = connection.getInputStream();
            return StreamUtils.copyToByteArray(inputStream);
        } catch (Exception e) {
            log.error("Failed to download image from URL: {}", imageUrl, e);
        }
        return new byte[0];
    }
}
