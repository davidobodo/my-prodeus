import React from "react";

import CircularProgress from "@/components/specific/progressBars/CircularProgress";
import "../ActivityPage.scss";

const PercentageCard = ({ percent, label, color, trailColor }) => {
    return (
        <div className="percentage-card-component">
            <div className="percentage-card-component__info">
                <h1>{label}</h1>
            </div>
            <div className="percentage-card-component__percent-wrapper">
                <CircularProgress percent={percent} color={color} trailColor={trailColor}>
                    <span className="number">
                        {percent}
                        <sup>%</sup>
                    </span>
                </CircularProgress>
            </div>
        </div>
    );
};

export default PercentageCard;
