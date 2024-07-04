import "./EventFormLayout.css"
import PersonalInformationLayout from "../AgreementLayout/AgreementLayout";
import PhoneNumber from "../phonenumber/PhoneNumber";

export interface EventFormLayoutProps {
    isEventAgreed:boolean;
    phoneNumber:string[];
    handleEventAgreementClick: ()=>void;
    handlePhoneNumberChange: (index:number, phoneNumber: string) => void;
}

const EventFormLayout = (props: EventFormLayoutProps) => {
    const { isEventAgreed, handleEventAgreementClick, phoneNumber, handlePhoneNumberChange, ...rest } = props;
    return (
        <div className="event-info-container">
            <p className="event-info">
                🎉 하루그림 피드백에 참여한 분을 위한 이벤트 (선택)
            </p>
            하루그림 피드백 이벤트에 참여한 분들을 대상으로 7월 말에 커피 쿠폰 5매(인당 1매)를 추첨으로 드립니다.
            <PersonalInformationLayout
                isChecked={isEventAgreed}
                onClick={handleEventAgreementClick}
            />
            <PhoneNumber isDisabled={!isEventAgreed} phoneNumber={phoneNumber}
                         handlePhoneNumberChange={handlePhoneNumberChange}/>
        </div>
    )
}

export default EventFormLayout;