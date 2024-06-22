import React from "react";
import "./EmotionSelection.css";

export interface EmotionSelectionProps {
    emotions: string[];
    selectedEmotions: string[];
    onEmotionClick: (emotion: string) => void;
}

const EmotionSelection = (props: EmotionSelectionProps) => {
    const { emotions, selectedEmotions, onEmotionClick } = props;

    return (
        <div className="emotion-selection">
            <label className="emotion-label">감정</label>
            <div className="emotion-options">
                {emotions.map((emotion, index) =>
                    EmotionOption(
                        emotion,
                        selectedEmotions,
                        onEmotionClick,
                        index
                    )
                )}
            </div>
            <p className="selected-emotions">
                Selected Emotions: {selectedEmotions.join(", ")}
            </p>
        </div>
    );
};

const getEmotionIcon = (emotion: string) => {
    try {
        return require(`../icon/emotion/${emotion}.png`);
    } catch (error) {
        return require("../icon/emotion/default.png");
    }
};

const EmotionOption = (
    emotion: string,
    selectedEmotions: string[],
    onEmotionClick: (emotion: string) => void,
    index: number
) => (
    <div
        className={`emotion-option ${
            selectedEmotions.includes(emotion) ? "selected" : ""
        }`}
        key={index}
        onClick={() => onEmotionClick(emotion)}
    >
        <img
            src={getEmotionIcon(emotion)}
            alt={emotion}
            className="emotion-icon"
        />
        <label className="emotion-option-label">{emotion}</label>
    </div>
);
export default EmotionSelection;
