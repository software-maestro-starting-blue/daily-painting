import React, { ChangeEvent } from 'react';
import './GenderSelection.css';

export interface Props {
  gender: string;
  setGender: (gender: string) => void;
}

const GenderSelection = (props: Props) => {
  const { gender, setGender } = props;

  const handleGenderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  };

  return (
    <div className="gender-selection">
      <label className='gender-label'>성별</label>
      <select
        className="gender-select"
        value={gender}
        onChange={handleGenderChange}
      >
        <option value="남성">남성</option>
        <option value="여성">여성</option>
      </select>
      <p className="selected-gender">Selected Gender: {gender}</p>
    </div>
  );
};

export default GenderSelection;
