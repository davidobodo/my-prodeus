import React from "react";

import PopUp from "./PopUp";

import "../BarChart.scss";
const DayBars = ({ dayDetails }) => {
    const { dayPrefix, lastWeek, thisWeek } = dayDetails;
    return (
        <div className="bar-chart-component__section">
            <div className="day">{dayPrefix}</div>
            <div className="bar-wrapper">
                <div style={{ position: "relative" }}>
                    <div className="bar last-week" style={{ height: `${lastWeek.height}px` }}></div>
                    <PopUp myData={lastWeek} mySiblingsData={thisWeek} />
                </div>
                <div style={{ position: "relative" }}>
                    <div className="bar this-week" style={{ height: `${thisWeek.height}px` }}></div>
                    <PopUp myData={thisWeek} mySiblingsData={lastWeek} />
                </div>
            </div>
        </div>
    );
};

export default DayBars;
