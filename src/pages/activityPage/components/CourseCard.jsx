import React from "react";

import LinearProgress from "@/components/specific/progressBars/LinearProgress";

// import logo from "@/assets/global/logo-full.svg";

import advanced from "@/assets/global/allLogos/Advanced.svg";
import advanced1 from "@/assets/global/allLogos/Advanced1.svg";
import advanced2 from "@/assets/global/allLogos/Advanced2.svg";
import apprentice from "@/assets/global/allLogos/Apprentice.svg";
import expert from "@/assets/global/allLogos/Expert.svg";
import grandmaster from "@/assets/global/allLogos/Grandmaster.svg";
import interested from "@/assets/global/allLogos/Interested.svg";
import master from "@/assets/global/allLogos/Master.svg";
import noCredits from "@/assets/global/allLogos/NoCredits.svg";
import proficient from "@/assets/global/allLogos/Proficient.svg";
import proficient1 from "@/assets/global/allLogos/Proficient1.svg";
import pursuing from "@/assets/global/allLogos/Pursuing.svg";

import "../ActivityPage.scss";
const CourseCard = ({ title, level, totalCredits, currentCredits, color, trailColor }) => {
    const renderIcon = () => {
        switch (level) {
            case "Advanced":
                return <img src={advanced} alt="" />;
            case "Advanced 1":
                return <img src={advanced1} alt="" />;
            case "Advanced 2":
                return <img src={advanced2} alt="" />;
            case "Apprentice":
                return <img src={apprentice} alt="" />;
            case "Expert":
                return <img src={expert} alt="" />;
            case "Grand Master":
                return <img src={grandmaster} alt="" />;
            case "Interested":
                return <img src={interested} alt="" />;
            case "Master":
                return <img src={master} alt="" />;
            case "No Credits":
                return <img src={noCredits} alt="" />;
            case "Proficient":
                return <img src={proficient} alt="" />;
            case "Proficient 1":
                return <img src={proficient1} alt="" />;
            case "Pursuing":
                return <img src={pursuing} alt="" />;
            default:
                return null;
        }
    };
    return (
        <div className="course-card-component">
            <div className="course-card-component__title">
                <h3 style={{ color }}>{title}</h3>
                <div className="course-card-component__title__img-wrapper">{renderIcon()}</div>
            </div>
            {level !== "No Credits" && <h1 className="course-card-component__level">{level}</h1>}
            <div>
                <LinearProgress total={totalCredits} current={currentCredits} color={color} trailColor={trailColor} />
            </div>
        </div>
    );
};

export default CourseCard;
