import React from "react";
import "./PhoneNumber.css"

export interface PhoneNumberProps {
    isDisabled: boolean,
    phoneNumber: string[],
    handlePhoneNumberChange: (index:number, phoneNumber: string) => void
}

const PhoneNumber = (props: PhoneNumberProps) => {
    const { isDisabled, phoneNumber, handlePhoneNumberChange, ...rest } = props;

    return (
        <div className="phone-number-container">
            <label className="phone-number-label" htmlFor="phone-number">
                전화번호
            </label>
            <div className="phone-number-inputs">
                <input
                    className="phone-number-input"
                    type="text"
                    maxLength={3}
                    value={phoneNumber[0]}
                    onChange={(e) => handlePhoneNumberChange(0, e.target.value)}
                    disabled={isDisabled}
                />
                <span className="phone-number-hyphen">-</span>
                <input
                    className="phone-number-input"
                    type="text"
                    maxLength={4}
                    value={phoneNumber[1]}
                    onChange={(e) => handlePhoneNumberChange(1, e.target.value)}
                    disabled={isDisabled}
                />
                <span className="phone-number-hyphen">-</span>
                <input
                    className="phone-number-input"
                    type="text"
                    maxLength={4}
                    value={phoneNumber[2]}
                    onChange={(e) => handlePhoneNumberChange(2, e.target.value)}
                    disabled={isDisabled}
                />
            </div>
        </div>
    );
};

export default PhoneNumber;
