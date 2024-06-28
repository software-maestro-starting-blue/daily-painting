import React from "react";
import "./MetPeopleSelectionLayout.css";

export interface MetPeopleSelectionLayoutProps {
    metPeople: string[];
    selectedPeople: string[];
    onMetPeopleClick: (person: string) => void;
}

const MetPeopleSelectionLayout = (props: MetPeopleSelectionLayoutProps) => {
    const { metPeople, selectedPeople, onMetPeopleClick } = props;

    return (
        <div className="met-people-selection">
            <label className="people-label">만난 사람</label>
            <div className="people-options">
                {metPeople.map((person, index) => (
                    <PersonOption
                        key={index}
                        person={person}
                        selectedPeople={selectedPeople}
                        onMetPeopleClick={onMetPeopleClick}
                    />
                ))}
            </div>
            <p className="selected-people">
                Selected People: {selectedPeople.join(", ")}
            </p>
        </div>
    );
};

const getIcon = (person: string) => {
    try {
        return require(`../icon/metperson/${person}.png`);
    } catch (error) {
        return require("../icon/metperson/DEFAULT.png");
    }
};

export interface PersonOptionProps {
    person: string;
    selectedPeople: string[];
    onMetPeopleClick: (person: string) => void;
}

const PersonOption = (props: PersonOptionProps) => {
    const { person, selectedPeople, onMetPeopleClick } = props;

    return (
        <div
            className={`people-option ${
                selectedPeople.includes(person) ? "selected" : ""
            }`}
            onClick={() => onMetPeopleClick(person)}
        >
            <img src={getIcon(person)} alt={person} className="people-icon" />
            <label className="met-people-option-label">{person}</label>
        </div>
    );
};

export default MetPeopleSelectionLayout;
