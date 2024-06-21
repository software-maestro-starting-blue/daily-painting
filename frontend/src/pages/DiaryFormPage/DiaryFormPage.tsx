import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import GenderSelection from '../../components/Diary/GenderSelection/GenderSelection';
import WeatherSelection from '../../components/Diary/WeatherSelection/WeatherSelection';
import EmotionSelection from '../../components/Diary/EmotionSelection/EmotionSelection';
import MetPeopleSelection from '../../components/Diary/MetPeopleSelection/MetPeopleSelection';
import DiaryContent from '../../components/Diary/DiaryContent/DiaryContent';
import BirthYearInput from '../../components/Diary/BirthYearInput/BirthYearInput';
import SubmitButton from '../../components/Diary/SubmitButton/SubmitButton';

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

const DiaryFormPage: React.FC = () => {
  const [formData, setFormData] = useState<DiaryFormResponse | null>(null);
  const [birthYear, setBirthYear] = useState<number>(new Date().getFullYear());
  const [gender, setGender] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [emotions, setEmotions] = useState<string[]>([]);
  const [metPeople, setMetPeople] = useState<string[]>([]);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

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
      <BirthYearInput birthYear={birthYear} setBirthYear={setBirthYear} />
      <GenderSelection gender={gender} setGender={setGender} />
      <WeatherSelection
        weathers={formData.weathers}
        selectedWeather={weather}
        setWeather={setWeather}
      />
      <EmotionSelection
        emotions={formData.emotions}
        selectedEmotions={emotions}
        handleEmotionChange={handleEmotionChange}
      />
      <MetPeopleSelection
        metPeople={formData.metPeople}
        selectedPeople={metPeople}
        handleMetPeopleChange={handleMetPeopleChange}
      />
      <DiaryContent content={content} setContent={setContent} />
      <SubmitButton loading={loading} />
    </form>
  );
};

export default DiaryFormPage;
>>>>>>> Stashed changes
