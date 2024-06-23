import React, { ChangeEvent } from "react";
import "./DiaryContent.css";

export interface DiaryContentProps {
    content: string;
    setContent: (content: string) => void;
}

const DiaryContent = (props: DiaryContentProps) => {
    const { content, setContent } = props;

    const handleDiaryContentChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setContent(e.target.value);
    };

    return (
        <div className="diary-content">
            <label>한줄일기</label>
            <textarea
                value={content}
                onChange={() => handleDiaryContentChange}
            ></textarea>
        </div>
    );
};

export default DiaryContent;
