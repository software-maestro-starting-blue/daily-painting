import React, { ChangeEvent } from "react";
import "./DiaryContent.css";

export interface DiaryContentProps {
    content: string;
    setContent: (content: string) => void;
    isShaking: boolean;
}

const DiaryContent = (props: DiaryContentProps) => {
    const { content, setContent, isShaking, ...rest } = props;

    const handleDiaryContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    return (
        <div className="content">
            <textarea
                className={isShaking ? "content-error" : ""}
                value={content}
                onChange={handleDiaryContentChange}
                placeholder="오늘의 일기를 작성하세요"
                {...rest}
            />
        </div>
    );
};

export default DiaryContent;
