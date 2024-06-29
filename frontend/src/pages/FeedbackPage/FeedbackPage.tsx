import {FormEvent, useState} from "react";
import axios from 'axios';
import Rating from '../../components/feedback/rating/Rating';
import Input from "../../components/feedback/comment/Comment";
import FavoriteCharacter from "../../components/feedback/favoritecharacter/FavoriteCharacter";
import "./FeedbackPage.css";
import {NavigateFunction, useNavigate, useLocation} from 'react-router-dom';
import EventFormLayout from "../../components/feedback/eventformlayout/EventFormLayout";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const FeedbackPage = () => {
    const {state} = useLocation();
    const {diaryId, ...rest} = state;

    const [serviceSatisfaction, setServiceSatisfaction] = useState<number>(0);
    const [imageQuality, setImageQuality] = useState<number>(0);
    const [imageSatisfaction, setImageSatisfaction] = useState<number>(0);
    const [comment, setComment] = useState<string>("");
    const [favoriteCharacter, setFavoriteCharacter] = useState<string>("");
    const [isEventAgreed, setIsEventAgreed] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState<string[]>(["010", "", ""]);
    const MAX_CONTENT_LENGTH = 500;
    const navigate: NavigateFunction = useNavigate();

    const handleEventAgreementClick = () => {
        setIsEventAgreed(!isEventAgreed);
        if(isEventAgreed) {
            setPhoneNumber(["010", "", ""]);
        }
    };

    const handlePhoneNumberChange = (index: number, value: string) => {
        const newPhoneNumber = [...phoneNumber];
        newPhoneNumber[index] = value;
        setPhoneNumber(newPhoneNumber);
    };

    const validatePhoneNumber = (phoneNumber: string[]): boolean => {
        const patterns = [/^\d{3}$/, /^\d{4}$/, /^\d{4}$/];

        return phoneNumber.length === 3 && phoneNumber.every((num, index) => patterns[index].test(num));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let status = true;
        if (serviceSatisfaction === 0 || imageQuality === 0 || imageSatisfaction === 0) {
            window.alert('별점은 한 개 이상이어야 합니다.');
            status = false;
        }

        if (comment.length > MAX_CONTENT_LENGTH) {
            window.alert('추가 의견의 길이는 500자를 넘을 수 없습니다.');
            status = false;
        }

        if (favoriteCharacter.length > MAX_CONTENT_LENGTH) {
            window.alert('좋아하는 캐릭터의 길이는 500자를 넘을 수 없습니다.');
            status = false;
        }

        if (isEventAgreed && !validatePhoneNumber(phoneNumber)) {
            window.alert('전화번호를 한번 더 확인해주세요.');
            status = false;
        }

        if (status) {
            await axios.post(
                `${baseUrl}/api/feedbacks`,
                {
                    serviceSatisfaction,
                    imageQuality,
                    imageSatisfaction,
                    comment,
                    favoriteCharacter,
                    diaryId,
                    isEventAgreed,
                    phoneNumber
                }
            );
            navigate('/feedback-thanks');
        }
    };

    return (
        <div className="feedback-page-container">
            <div className="feedback-page-inner-container">
                <h1 className="feedback-page-h1">하루 그림 피드백</h1>
                <p className="feedback-page-p">
                    저희가 더 나은 서비스를 만들 수 있도록 설문조사를 진행하고 있습니다.
                </p>
                <form className="feedback-page-form" onSubmit={handleSubmit}>
                    <Rating
                        label="서비스 만족도"
                        rating={serviceSatisfaction}
                        setRating={setServiceSatisfaction}
                    />
                    <Rating
                        label="이미지의 퀄리티"
                        rating={imageQuality}
                        setRating={setImageQuality}
                    />
                    <Rating
                        label="이미지의 만족도"
                        rating={imageSatisfaction}
                        setRating={setImageSatisfaction}
                    />
                    <Input comment={comment} setComment={setComment}/>
                    <FavoriteCharacter favoriteCharacter={favoriteCharacter}
                                       setFavoriteCharacter={setFavoriteCharacter}/>

                    <EventFormLayout isEventAgreed={isEventAgreed} phoneNumber={phoneNumber}
                                     handleEventAgreementClick={handleEventAgreementClick}
                                     handlePhoneNumberChange={handlePhoneNumberChange}/>

                    <button className="feedback-page-form-button" type="submit">
                        {isEventAgreed ? '이벤트 참여 및 피드백 제출' : '피드백 제출'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FeedbackPage;
