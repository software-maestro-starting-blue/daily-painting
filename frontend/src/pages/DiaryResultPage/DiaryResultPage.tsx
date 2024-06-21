// import * as S from '';
import './DiaryResultPage.css';

import DiaryImageLayout from "../../components/diaryresult/DiaryImageLayout/DiaryImageLayout";
import FeedbackRoutingButtonLayout from "../../components/diaryresult/FeedbackRoutingButtonLayout/FeedbackRoutingButtonLayout";
import { useNavigate, NavigateFunction } from 'react-router-dom';

const FeedbackPageUrl = '/feedback'; // TODO: Update this URL to the correct feedback page URL

export interface DiaryResultPageProps {
    imageUrl: string,
    diaryId: number
}

const DiaryResultPage = (props: DiaryResultPageProps) => { 
    const {imageUrl, diaryId, ...rest} = props;

    const nav: NavigateFunction = useNavigate();

    const handleImageDownloadClick: () => void = () => { // TODO: Fix CORS policy issue
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

    const handleFeedbackClick: () => void = () => { // TODO: FeedbackPageUrl에 맞추어서 수정 필요
        nav(FeedbackPageUrl, { state: { diaryId: diaryId } }); 
    };

    
    return (
    <div className="DiaryResultPage">
        <DiaryImageLayout imageUrl={imageUrl} onImageDownloadClick={handleImageDownloadClick}/>
        <FeedbackRoutingButtonLayout onFeedbackClick={handleFeedbackClick}/>
    </div>
    );
}

export default DiaryResultPage;