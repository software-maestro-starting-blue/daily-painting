// import * as S from '';
import './DiaryResultPage.css';

import DiaryImageLayout from "../../components/diaryresult/DiaryImageLayout/DiaryImageLayout";
import FeedbackRoutingButtonLayout from "../../components/diaryresult/FeedbackRoutingButtonLayout/FeedbackRoutingButtonLayout";

export interface DiaryResultPageProps {
    imageUrl: string,
    diaryId: number
}

const DiaryResultPage = (props: DiaryResultPageProps) => { 
    const {imageUrl, diaryId, ...rest} = props;

    const handleImageDownloadClick: () => void = () => {
        // TODO: imageUrl의 이미지 다운로드 구현 필요
    };

    const handleFeedbackClick: () => void = () => {
        // TODO: diaryId를 다음 페이지로 넘기기
    };

    
    return (
    <div className="DiaryResultPage">
        <DiaryImageLayout imageUrl={imageUrl} onImageDownloadClick={handleImageDownloadClick}/>
        <FeedbackRoutingButtonLayout onFeedbackClick={handleFeedbackClick}/>
    </div>
    );
}

export default DiaryResultPage;