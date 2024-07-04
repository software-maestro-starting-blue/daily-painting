import React from "react";
import "./EmotionSelectionLayout.css";

export interface EmotionSelectionLayoutProps {
    emotions: string[];
    emotionKoreanNames: string[]; // Korean names for emotions
    selectedEmotions: string[];
    onEmotionClick: (emotion: string) => void;
}

const EmotionSelectionLayout = (props: EmotionSelectionLayoutProps) => {
    const { emotions, emotionKoreanNames, selectedEmotions, onEmotionClick } = props;

    return (
        <div className="emotion-selection">
            <label className="emotion-label">감정</label>
            <div className="emotion-options">
                {emotions.map((emotion, index) => (
                    <EmotionOption
                        key={index}
                        emotion={emotion}
                        emotionKoreanName={emotionKoreanNames[index]} // Korean name for the emotion
                        isSelected={selectedEmotions.includes(emotion)}
                        onEmotionClick={onEmotionClick}
                    />
                ))}
            </div>
        </div>
    );
};

export interface EmotionOptionProps {
    emotion: string;
    emotionKoreanName: string; // Korean name for the emotion
    isSelected: boolean;
    onEmotionClick: (emotion: string) => void;
}

const EmotionOption = (props: EmotionOptionProps) => {
    const { emotion, emotionKoreanName, isSelected, onEmotionClick } = props;

    const getEmotionIcon = (emotion: string) => {
        try {
            return require(`../icon/emotion/${emotion}.png`);
        } catch (error) {
            return require("../icon/emotion/DEFAULT.png");
        }
    };

    return (
        <div
            className={`emotion-option ${isSelected ? "selected" : ""}`}
            onClick={() => onEmotionClick(emotion)}
        >
            <img
                src={getEmotionIcon(emotion)}
                alt={emotion}
                className="emotion-icon"
            />
            <label className="emotion-option-label">{emotionKoreanName}</label>
        </div>
    );
};

export default EmotionSelectionLayout;
