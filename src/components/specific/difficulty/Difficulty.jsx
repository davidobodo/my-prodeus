import React from "react";

import IntermediateIcon from "@/assets/global/levels/IntermediateIcon";
import BeginnerIcon from "@/assets/global/levels/BeginnerIcon";
import AdvancedIcon from "@/assets/global/levels/AdvancedIcon";

import "./Difficulty.scss";

const Difficulty = ({ difficulty, variant, iconBg, iconColor }) => {
    const renderDifficultyLevel = () => {
        switch (difficulty) {
            case "Beginner":
                return (
                    <>
                        <BeginnerIcon iconBg={iconBg} iconColor={iconColor} />
                        <span className="text">Beginner</span>
                    </>
                );
            case "Intermediate":
                return (
                    <>
                        <IntermediateIcon iconBg={iconBg} iconColor={iconColor} />
                        <span className="text">Intermediate</span>
                    </>
                );
            case "Advanced":
                return (
                    <>
                        <AdvancedIcon iconBg={iconBg} iconColor={iconColor} />
                        <span className="text">Advanced</span>
                    </>
                );
            default:
                return null;
        }
    };
    return <div className="difficulty-component">{renderDifficultyLevel()}</div>;
};

export default Difficulty;
