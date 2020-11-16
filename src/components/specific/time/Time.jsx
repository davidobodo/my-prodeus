import React from "react";

import TimeIcon from "@/assets/global/TimeIcon";

import "./Time.scss";

const Time = ({ iconBg, iconColor, duration = "1hr 30min" }) => {
    return (
        <div className="time-component">
            <TimeIcon iconBg={iconBg} iconColor={iconColor} />
            <span className="text">{duration}</span>
        </div>
    );
};

export default Time;
