import React from "react";
import "./MetPeopleSelectionLayout.css";

export interface MetPeopleSelectionProps {
    metPeople: string[];
    selectedPeople: string[];
    onMetPeopleClick: (person: string) => void;
}

const MetPeopleSelection = (props: MetPeopleSelectionProps) => {
    const { metPeople, selectedPeople, onMetPeopleClick } = props;

    return (
        <div className="met-people-selection">
            <label className="people-label">만난 사람</label>
            <div className="people-options">
                {metPeople.map((person, index) =>
                    PersonOption(
                        person,
                        selectedPeople,
                        onMetPeopleClick,
                        index
                    )
                )}
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
        return require("../icon/metperson/default.png");
    }
};

const PersonOption = (
    person: string,
    selectedPeople: string[],
    onMetPeopleClick: (person: string) => void,
    index: number
) => (
    <div
        className={`people-option ${
            selectedPeople.includes(person) ? "selected" : ""
        }`}
        key={index}
        onClick={() => onMetPeopleClick(person)}
    >
        <img src={getIcon(person)} alt={person} className="people-icon" />
        <label className="met-people-option-label">{person}</label>
    </div>
);

export default MetPeopleSelection;
