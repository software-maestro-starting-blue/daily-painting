import React, { ChangeEvent } from "react";
import "../App.css";
import "./BirthYearInput.css";

export interface BirthYearInputProps {
    birthYear: number;
    setBirthYear: (birthYear: number) => void;
}

const BirthYearInput = (props: BirthYearInputProps) => {
    const { birthYear, setBirthYear } = props;

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setBirthYear(Number(e.target.value));
    };

    const generateYearOptions = (): JSX.Element[] => {
        const years: number[] = [];

        for (let year = 2024; year >= 1960; year--) {
            years.push(year);
        }

        return years.map((year) => (
            <option key={year} value={year}>
                {year}
            </option>
        ));
    };

    return (
        <div className="birth-year-input">
            <label className="birth-year-label">출생 연도</label>
            <select
                className="birth-year-select"
                value={birthYear}
                onChange={handleChange}
            >
                {generateYearOptions()}
            </select>
            <p className="selected-birth-year">
                Selected Birth Year: {birthYear}
            </p>
        </div>
    );
};

export default BirthYearInput;
