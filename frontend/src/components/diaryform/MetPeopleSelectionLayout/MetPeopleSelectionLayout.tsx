import React from "react";
import "./MetPeopleSelectionLayout.css";

export interface MetPeopleSelectionLayoutProps {
    metPeople: string[];
    metPeopleKoreanNames: string[];
    selectedPeople: string[];
    onMetPeopleClick: (person: string) => void;
}

const MetPeopleSelectionLayout = (props: MetPeopleSelectionLayoutProps) => {
    const { metPeople, metPeopleKoreanNames, selectedPeople, onMetPeopleClick } = props;

    return (
        <div className="met-people-selection">
            <label className="people-label">만난 사람</label>
            <div className="people-options">
                {metPeople.map((person, index) => (
                    <PersonOption
                        key={index}
                        metPerson={person}
                        metPersonKoreanName={metPeopleKoreanNames[index]}
                        isSelected={selectedPeople.includes(person)}
                        onMetPeopleClick={onMetPeopleClick}
                    />
                ))}
            </div>
        </div>
    );
};

export interface PersonOptionProps {
    metPerson: string;
    metPersonKoreanName: string;
    isSelected: boolean;
    onMetPeopleClick: (person: string) => void;
}

const PersonOption = (props: PersonOptionProps) => {
    const { metPerson, metPersonKoreanName, isSelected, onMetPeopleClick } = props;

    return (
        <div
            className={`people-option ${isSelected ? "selected" : ""}`}
            onClick={() => onMetPeopleClick(metPerson)}
        >
            <img src={getIcon(metPerson)} alt={metPerson} className="people-icon" />
            <label className="met-people-option-label">{metPersonKoreanName}</label>
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

export default MetPeopleSelectionLayout;
