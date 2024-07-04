import React, { useState } from "react";
import "./AgreementLayout.css";
import Checkbox from "../../common/Checkbox/Checkbox";

export interface PersonalInformationProps {
    isChecked: boolean;
    onClick: () => void;
}

const PersonalInformationLayout = (props: PersonalInformationProps) => {
    const { isChecked, onClick } = props;
    const [isVisible, setIsVisible] = useState(false);

    const handleToolbarClick = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="container">
            <div className="toolbar" onClick={handleToolbarClick}>
                하루그림 피드백 이벤트 참여를 위한 개인정보 처리 방침 (자세히보기)
            </div>
            {isVisible && (
                <div className="content">
                    <pre className="pre-content">
                        {`
하루그림 피드백 이벤트 참여를 위한 전화번호 저장 및 처리에 대한 동의서

1. 목적
   - 본 동의서는 피드백을 작성한 사용자의 이벤트 참여를 위한 동의와 관련된 사항을 명확히 하기 위해 작성되었습니다.
   - 동의하지 않을 수 있으나, 이벤트 참여가 제한됩니다.

2. 수집하는 정보
   - 이벤트 참여자의 전화번호

3. 정보의 사용
   - 수집된 전화번호는 이벤트 추첨 및 당첨자의 쿠폰 전송을 위한 목적으로 사용되며, 다른 목적으로 사용되지 않습니다.
   - 수집된 전화번호는 사용자의 요청에 따라 언제든지 삭제할 수 있습니다.

4. 정보의 보관 및 기간
   - 사용자의 전화번호는 보안이 유지되는 서버에 안전하게 저장됩니다.
   - 사용자가 전화번호 삭제를 요청할 경우, 수집된 모든 정보는 완전히 삭제됩니다.
   - 이벤트 추첨 및 당첨자 전송 후 수집된 전화번호는 완전히 삭제됩니다.

5. 정보의 공유
   - 수집된 전화번호는 어떠한 경우에도 제3자와 공유되지 않습니다.
   - 법적 요구가 있을 경우에만 관련 법률에 따라 정보를 제공할 수 있습니다.

6. 동의 철회
   - 사용자는 언제든지 동의를 철회할 수 있으며, 동의 철회 시 이벤트 참여 철회와 함께 전화번호가 삭제됩니다.
   - 동의 철회는 고객 지원팀(startingblue0603@gmail.com)으로 연락 주시기 바랍니다.

7. 문의
   - 이벤트에 대한 문의사항은 고객 지원팀(startingblue0603@gmail.com)으로 연락 주시기 바랍니다.

위 내용을 충분히 이해하였으며, 이에 동의합니다.
`}
                    </pre>
                </div>
            )}
            <div className="agree-container">
                <span>개인정보 처리 방침에 동의합니다</span>
                <Checkbox isChecked={isChecked} onClick={onClick} />
            </div>
        </div>
    );
};

export default PersonalInformationLayout;
