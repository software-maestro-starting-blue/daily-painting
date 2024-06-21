import { useState } from "react";
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

export default function FeedbackPage(diaryId: number) {
    const [serviceSatisfaction, setServiceSatisfaction] = useState(0);
    const [imageQuality, setImageQuality] = useState(0);
    const [imageSatisfaction, setImageSatisfaction] = useState(0);
    const [comment, setComment] = useState("");
    const [favoriteCharacter, setFavoriteCharacter] = useState("");

    const handleStarClick = (setter: any, value: any) => {
        setter(value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        let status = true;
        if(serviceSatisfaction === 0 || imageQuality === 0 || imageSatisfaction === 0) {
            window.alert('별점은 한 개 이상이어야 합니다.');
            status = false;
        }
        if(comment.length > 500) {
            window.alert('추가 의견의 길이는 500자를 넘을 수 없습니다.');
            status = false;
        }

        if(favoriteCharacter.length > 500) {
            window.alert('좋아하는 캐릭터의 길이는 500자를 넘을 수 없습니다.');
            status = false;
        }

        if(status){
            const response =  await axios.post(
                `${baseUrl}/api/feedbacks`,
                {serviceSatisfaction,
                    imageQuality,
                    imageSatisfaction,
                    comment,
                    favoriteCharacter,
                    diaryId}
            );
        }
    };

    const StarIcon = ({ filled }: any) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
                width: "20px",
                height: "20px",
                fill: filled ? "#f59e0b" : "#9ca3af",
            }}
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "48px 16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>하루 그림 피드백</h1>
                <p style={{ color: "#4b5563" }}>
                    저희가 더 나은 서비스를 만들 수 있도록 설문조사를 진행하고 있습니다.
                </p>
                <form style={{ display: "flex", flexDirection: "column", gap: "24px" }} onSubmit={handleSubmit}>
                    <div style={{ display: "grid", gap: "8px" }}>
                        <label style={{ fontSize: "14px", fontWeight: "500" }} htmlFor="service-satisfaction">
                            서비스 만족도
                        </label>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center"}}>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <button
                                    key={i}
                                    type="button"
                                    style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", color: "#9ca3af", cursor: "pointer", transition: "color 0.2s" }}
                                    onClick={() => handleStarClick(setServiceSatisfaction, i)}
                                >
                                    <StarIcon filled={i <= serviceSatisfaction} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "grid", gap: "8px" }}>
                        <label style={{ fontSize: "14px", fontWeight: "500" }} htmlFor="image-quality">
                            이미지의 퀄리티
                        </label>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <button
                                    key={i}
                                    type="button"
                                    style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", color: "#9ca3af", cursor: "pointer", transition: "color 0.2s" }}
                                    onClick={() => handleStarClick(setImageQuality, i)}
                                >
                                    <StarIcon filled={i <= imageQuality} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "grid", gap: "8px" }}>
                        <label style={{ fontSize: "14px", fontWeight: "500" }} htmlFor="image-satisfaction">
                            이미지의 만족도
                        </label>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <button
                                    key={i}
                                    type="button"
                                    style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", color: "#9ca3af", cursor: "pointer", transition: "color 0.2s" }}
                                    onClick={() => handleStarClick(setImageSatisfaction, i)}
                                >
                                    <StarIcon filled={i <= imageSatisfaction} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "grid", gap: "8px" }}>
                        <label style={{ fontSize: "14px", fontWeight: "500" }} htmlFor="comments">
                            추가 의견
                        </label>
                        <textarea
                            style={{
                                width: "100%",
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                backgroundColor: "white",
                                padding: "8px 12px",
                                fontSize: "14px",
                                color: "#374151",
                                resize: "none",
                            }}
                            id="comments"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                    </div>
                    <div style={{ display: "grid", gap: "8px" }}>
                        <label style={{ fontSize: "14px", fontWeight: "500" }} htmlFor="favorite-characters">
                            좋아하는 캐릭터(일기로 제작한 만화에 나왔으면 좋겠다고 생각하는 캐릭터)
                        </label>
                        <input
                            style={{
                                width: "100%",
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                backgroundColor: "white",
                                padding: "8px 12px",
                                fontSize: "14px",
                                color: "#374151",
                            }}
                            value={favoriteCharacter}
                            onChange={(e) => setFavoriteCharacter(e.target.value)}
                        />
                    </div>
                    <button
                        style={{
                            width: "100%",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "8px",
                            backgroundColor: "#6366f1",
                            color: "white",
                            fontSize: "14px",
                            fontWeight: "500",
                            padding: "8px 16px",
                            cursor: "pointer",
                            transition: "background-color 0.2s",
                        }}
                        type="submit"
                    >
                        피드백 제출
                    </button>
                </form>
            </div>
        </div>
    );
}
