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
        console.log('Downloading image:', imageUrl);
        fetch(imageUrl, { method: 'GET' })
            .then((response) => response.blob())
            .then((blob) => {
                console.log('Downloaded image:', blob);
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'image.jpg';
                link.click();
                URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error('Error downloading image:', error);
            });
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