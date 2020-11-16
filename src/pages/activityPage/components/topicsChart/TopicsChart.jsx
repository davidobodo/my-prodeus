import React, { useState } from "react";

import "../../ActivityPage.scss";
import { useEffect } from "react";
import { secondsToHms, assignColor } from "@/utils/Utils";

const TopicsChart = ({ data, totalTimeInSec }) => {
    const [displayedData, setDisplayedData] = useState([]);

    useEffect(() => {
        if (data && data.length !== 0) {
            const myArray = [];

            //Get top five topics
            for (let i = 0; i < 5; i++) {
                const item = {
                    name: data[i].title,
                    timeInHms: data[i].timeInHms,
                    percent: data[i].percentage,
                    color: assignColor(i)
                };

                myArray.push(item);
            }

            //calculate for others
            const sumOfFirstFive = data?.slice(0, 5).reduce((total, item) => {
                return total + item.timeInSec;
            }, 0);

            const timeInSec = totalTimeInSec - sumOfFirstFive;
            const percentOfOthers = ((timeInSec / totalTimeInSec) * 100).toFixed(0);

            const others = {
                name: "Others",
                timeInHms: secondsToHms(timeInSec),
                percent: percentOfOthers,
                color: assignColor(5)
            };

            myArray.push(others);
            setDisplayedData(myArray);
        }
    }, [data]);
    return (
        <div className="section topics-card">
            <h1 className="topics-card__title">Topics</h1>
            {displayedData && displayedData.length !== 0 && (
                <>
                    <div className="topics-card__color-bar">
                        {displayedData.map((item, i) => {
                            const { color, percent } = item;
                            return (
                                <span
                                    key={i}
                                    style={{ display: "inline-block", backgroundColor: color, width: `${percent}%` }}
                                ></span>
                            );
                        })}
                    </div>
                    <div className="topics-card__courses">
                        {displayedData.map((item, i) => {
                            const { name, percent, timeInHms, color } = item;
                            return (
                                <div key={i} className="topics-card__courses__course">
                                    <div className="color-code" style={{ backgroundColor: `${color}` }}></div>
                                    <div>
                                        <h3>{name}</h3>
                                        <h5>
                                            {percent}% | {timeInHms}
                                        </h5>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default TopicsChart;
