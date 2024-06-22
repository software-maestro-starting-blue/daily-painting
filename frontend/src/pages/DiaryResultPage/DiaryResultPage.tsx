// import * as S from '';
import './DiaryResultPage.css';

import DiaryImageLayout from "../../components/diaryresult/DiaryImageLayout/DiaryImageLayout";
import FeedbackRoutingButtonLayout from "../../components/diaryresult/FeedbackRoutingButtonLayout/FeedbackRoutingButtonLayout";
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { MouseEventHandler } from 'react';

// TODO: 추후에는 상수로 분리하여 관리할 수 있도록 수정
const FeedbackPageUrl = '/feedback'; // TODO: Update this URL to the correct feedback page URL
const ApiUrl = 'http://localhost:8080/proxy'; // TODO: Update this URL to the correct API URL

export interface DiaryResultPageProps {
    imageUrl: string,
    diaryId: number
}

const DiaryResultPage = (props: DiaryResultPageProps) => { 
    const {imageUrl, diaryId, ...rest} = props;

    // const nav: NavigateFunction = useNavigate();

    const handleImageDownloadClick: MouseEventHandler<HTMLButtonElement> = () => { // TODO: Fix CORS policy issue
        const proxyUrl = ApiUrl + `?url=${encodeURIComponent(imageUrl)}`;
        fetch(proxyUrl, { method: 'GET' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.blob();
            })
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'image.jpg';
                link.click();
                URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Error downloading image:', error);
            });
    };

    const handleFeedbackClick: MouseEventHandler<HTMLButtonElement> = () => { // TODO: FeedbackPageUrl에 맞추어서 수정 필요
        // nav(FeedbackPageUrl, { state: { diaryId: diaryId } }); 
    };

    
    return (
    <div className="DiaryResultPage">
        <DiaryImageLayout imageUrl={imageUrl} onImageDownloadClick={handleImageDownloadClick}/>
        <FeedbackRoutingButtonLayout onFeedbackClick={handleFeedbackClick}/>
    </div>
    );
}

export default DiaryResultPage;