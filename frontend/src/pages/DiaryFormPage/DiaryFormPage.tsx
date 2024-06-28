import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import "./DiaryFormPage.css";
import GenderSelectionLayout from "../../components/diaryform/GenderSelectionLayout/GenderSelectionLayout";
import WeatherSelectionLayout from "../../components/diaryform/WeatherSelectionLayout/WeatherSelectionLayout";
import EmotionSelectionLayout from "../../components/diaryform/EmotionSelectionLayout/EmotionSelectionLayout";
import MetPeopleSelectionLayout from "../../components/diaryform/MetPeopleSelectionLayout/MetPeopleSelectionLayout";
import DiaryContent from "../../components/diaryform/DiaryContent/DiaryContent";
import BirthYearInput from "../../components/diaryform/BirthYearInput/BirthYearInput";
import PersonalInformationLayout from "../../components/diaryform/PersonalInformationAgreementLayout/PersonalInformationAgreementLayout";
import SubmitButton from "../../components/diaryform/SubmitButton/SubmitButton";
import { NavigateFunction, useNavigate } from "react-router-dom";

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

const DOMAIN_ADDRESS = "http://localhost:8080";

const DiaryFormPage = () => {
    const [formData, setFormData] = useState<DiaryFormResponse | null>(null);
    const [birthYear, setBirthYear] = useState<number>(
        new Date().getFullYear()
    );
    const [gender, setGender] = useState<string>("남성");
    const [weather, setWeather] = useState<string>("");
    const [emotions, setEmotions] = useState<string[]>([]);
    const [metPeople, setMetPeople] = useState<string[]>([]);
    const [content, setContent] = useState<string>("");
    const [personalInformationAgreement, setPersonalInformationAgreement] =
        useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false); // 일기 작성 후 로딩 시간

    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                const response = await axios.get<DiaryFormResponse>(
                    DOMAIN_ADDRESS + "/api/diaries"
                );
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching form data:", error);
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

    const validate = () => {
        if (birthYear < 1960 || birthYear > 2024) {
            alert("출생연도는 1960 ~ 2024 사이 입니다.");
            return false;
        }

        if (gender !== "남성" && gender !== "여성") {
            alert("성별은 남성 또는 여성입니다.");
            return false;
        }

        if (weather.length === 0) {
            alert("날씨는 최소 1개 선택해야 합니다.");
            return false;
        }

        if (emotions.length === 0) {
            alert("감정은 최소 1개 선택해야 합니다.");
            return false;
        }

        if (metPeople.length === 0) {
            alert("만난 사람은 최소 1개 선택해야 합니다.");
            return false;
        }

        if (content.length === 0 || content.length > 200) {
            alert(
                `한줄일기 내용은 1 ~ 200글자 사이입니다.\n현재 글자수 : ${content.length}`
            );
            return false;
        }

        return true;
    };

    const handlePersonalInformationAgreementClick = () => {
        setPersonalInformationAgreement(!personalInformationAgreement);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!validate()) return;

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
            const response = await axios.post<DiarySavedResponse>(
                DOMAIN_ADDRESS + "/api/diaries",
                diarySaveRequest
            );
            const location = response.headers["location"];
            const diaryId = response.data.diaryId;
            const imageUrl = response.data.imageUrl;
            console.log(`location: ${location}`);
            console.log(`diaryId: ${diaryId}`);
            console.log(`imageUrl: ${imageUrl}`);

            navigate("/diary/show", {
                state: {
                    diaryId: diaryId,
                    imageUrl: imageUrl,
                },
            });
        } catch (error) {
            console.error("Error saving diary:", error);
            alert("Failed to save diary");
        } finally {
            setLoading(false);
        }
    };

    if (!formData) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <div className="header">
                <BirthYearInput
                    birthYear={birthYear}
                    setBirthYear={setBirthYear}
                />
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
            <DiaryContent
                content={content}
                setContent={setContent}
                isShaking={content.length > 200}
            />
            <PersonalInformationLayout
                isCheckd={personalInformationAgreement}
                onClick={handlePersonalInformationAgreementClick}
            ></PersonalInformationLayout>
            <SubmitButton
                loading={loading}
                disabled={!personalInformationAgreement}
            />
        </form>
    );
};

export default DiaryFormPage;
