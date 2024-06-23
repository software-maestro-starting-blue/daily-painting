import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import GenderSelectionLayout from '../../components/diaryform/GenderSelectionLayout/GenderSelectionLayout';
import WeatherSelectionLayout from '../../components/diaryform/WeatherSelectionLayout/WeatherSelectionLayout';
import EmotionSelectionLayout from '../../components/diaryform/EmotionSelectionLayout/EmotionSelectionLayout';
import MetPeopleSelectionLayout from '../../components/diaryform/MetPeopleSelectionLayout/MetPeopleSelectionLayout';
import DiaryContent from '../../components/diaryform/DiaryContent/DiaryContent';
import BirthYearInput from '../../components/diaryform/BirthYearInput/BirthYearInput';
import SubmitButton from '../../components/diaryform/SubmitButton/SubmitButton';
import { NavigateFunction, useNavigate } from 'react-router-dom';


interface DiaryFormResponse {
  weathers: string[];
  emotions: string[];
  metPeople: string[];
}

interface DiarySaveRequest {
  birthYear: number;
  gender: string;
  weather: string;
  emotions: string[];
  metPeople: string[];
  content: string;
}

interface DiarySavedResponse {
  diaryId: number;
  imageUrl: string;
}

const DOMAIN_ADDRESS = 'http://localhost:8080';

const DiaryFormPage = () => {
  const [formData, setFormData] = useState<DiaryFormResponse | null>(null);
  const [birthYear, setBirthYear] = useState<number>(new Date().getFullYear());
  const [gender, setGender] = useState<string>('남성');
  const [weather, setWeather] = useState<string>('');
  const [emotions, setEmotions] = useState<string[]>([]);
  const [metPeople, setMetPeople] = useState<string[]>([]);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get<DiaryFormResponse>(DOMAIN_ADDRESS + '/api/diaries');
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchFormData();
  }, []);

  const handleEmotionChange = (emotion: string) => {
    setEmotions((prev) =>
      prev.includes(emotion)
        ? prev.filter((e) => e !== emotion)
        : [...prev, emotion]
    );
  };

  const handleMetPeopleChange = (person: string) => {
    setMetPeople((prev) =>
      prev.includes(person)
        ? prev.filter((p) => p !== person)
        : [...prev, person]
    );
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const diarySaveRequest: DiarySaveRequest = {
      birthYear,
      gender,
      weather,
      emotions,
      metPeople,
      content,
    };

    try {
      const response = await axios.post<DiarySavedResponse>(DOMAIN_ADDRESS + '/api/diaries', diarySaveRequest);
      const location = response.headers['location'];
      const diaryId = response.data.diaryId;
      const imageUrl = response.data.imageUrl;
      console.log(`location: ${location}`);
      console.log(`diaryId: ${diaryId}`);
      console.log(`imageUrl: ${imageUrl}`);

      navigate("/diary/show", {
        state: {
          diaryId: diaryId,
          imageUrl: imageUrl
        }
      });

    } catch (error) {
      console.error('Error saving diary:', error);
      alert('Failed to save diary');
    } finally {
      setLoading(false);
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{display: 'flex', justifyContent: 'center'} }>
        <BirthYearInput birthYear={birthYear} setBirthYear={setBirthYear} />
        <GenderSelectionLayout gender={gender} setGender={setGender} />
      </div>
      <WeatherSelectionLayout
        weathers={formData.weathers}
        selectedWeather={weather}
        setWeather={setWeather}
      />
      <EmotionSelectionLayout
        emotions={formData.emotions}
        selectedEmotions={emotions}
        onEmotionClick={handleEmotionChange}
      />
      <MetPeopleSelectionLayout
        metPeople={formData.metPeople}
        selectedPeople={metPeople}
        onMetPeopleClick={handleMetPeopleChange}
      />
      <DiaryContent content={content} setContent={setContent} />
      <SubmitButton loading={loading} />
    </form>
  );
};

export default DiaryFormPage;
