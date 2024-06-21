import React from 'react';
import './MetPeopleSelection.css';

interface Props {
  metPeople: string[];
  selectedPeople: string[];
  handleMetPeopleChange: (person: string) => void;
}

const MetPeopleSelection = (props: Props) => {
  const { metPeople, selectedPeople, handleMetPeopleChange } = props;

  const getIcon = (person: string) => {
    try {
      return require(`../icon/metperson/${person}.png`);
    } catch (error) {
      return require('../icon/metperson/default.png');
    }
  };
  
  return (
    <div className="met-people-selection">
      <label className="people-label">만난 사람</label>
      <div className="people-options">
        {metPeople.map((person, index) => (
          <div
            className={`people-option ${selectedPeople.includes(person) ? 'selected' : ''}`}
            key={index}
            onClick={() => handleMetPeopleChange(person)}
          >
            <img
              src={getIcon(person)}
              alt={person}
              className="people-icon"
            />
            <label className='met-people-option-label'>{person}</label>
          </div>
        ))}
      </div>
      <p className="selected-people">Selected People: {selectedPeople.join(', ')}</p>
    </div>
  );
};

export default MetPeopleSelection;
