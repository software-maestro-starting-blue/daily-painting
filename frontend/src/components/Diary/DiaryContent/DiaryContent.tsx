import React, { ChangeEvent } from 'react';
import './DiaryContent.css';

export interface DiaryContentProps {
  content: string;
  setContent: (content: string) => void;
}

const DiaryContent = (props: DiaryContentProps) => {
  const { content, setContent } = props;

  return (
    <div className="diary-content">
      <label>한줄일기</label>
      <textarea
        value={content}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
      ></textarea>
    </div>
  );
};

export default DiaryContent;
