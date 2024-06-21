import React from 'react';
import './EmotionSelection.css';

export interface EmotionSelectionProps {
  emotions: string[];
  selectedEmotions: string[];
  handleEmotionChange: (emotion: string) => void;
}

const EmotionSelection = (props: EmotionSelectionProps) => {
  const { emotions, selectedEmotions, handleEmotionChange } = props;

  const getEmotionIcon = (emotion: string) => {
    try {
      return require(`../icon/emotion/${emotion}.png`);
    } catch (error) {
      return require('../icon/emotion/default.png');
    }
  };

  return (
    <div className="emotion-selection">
      <label className="emotion-label">감정</label>
      <div className="emotion-options">
        {emotions.map((emotion, index) => (
            <div
              className={`emotion-option ${selectedEmotions.includes(emotion) ? 'selected' : ''}`}
              key={index}
              onClick={() => handleEmotionChange(emotion)}
            >
            <img
              src={getEmotionIcon(emotion)}
              alt={emotion}
              className="emotion-icon"
            />
            <label className='emotion-option-label'>{emotion}</label>
          </div>
        ))}
      </div>
      <p className="selected-emotions">Selected Emotions: {selectedEmotions.join(', ')}</p>
    </div>
  );
};

export default EmotionSelection;
