import React, { memo, useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import { getDayPrefix } from "@/utils/Utils";

import "./BarChart.scss";

import DayBars from "./components/DayBars";

const Barchart = ({ data }) => {
    //------------------------------------------------------------------------------
    //Store
    //------------------------------------------------------------------------------
    const { user } = useSelector((state) => state.auth);

    //------------------------------------------------------------------------------
    //State
    //------------------------------------------------------------------------------
    const [displayedData, setdisplayedData] = useState(data);

    //------------------------------------------------------------------------------
    //Variables
    //------------------------------------------------------------------------------
    const DOTS = Array.from({ length: 40 });

    //------------------------------------------------------------------------------
    //Helper functions
    //------------------------------------------------------------------------------
    /*
    Bar maximum height is 265px
    Total height = 300px;
    day height = 20px;
    space between day and start of bar = 15px
    therefore available bar height = 300px - 20px -15px = 265px

    1440m = 265px
    x m = y px

    */
    //Take in minutes, spits out pixels
    const renderBarHeight = useCallback((minutes) => {
        return parseFloat((minutes / 1440) * 265).toFixed(4);
    }, []);

    //user set daily goal height on bar chart
    const dailyGoalHeight = renderBarHeight(user.favDailyGoal);

    //------------------------------------------------------------------------------
    // Use Effects
    //------------------------------------------------------------------------------
    useEffect(() => {
        //Get all the bars
        const bars = document.querySelectorAll(".bar-wrapper .bar");

        //For each bar, if its height is greater than or equal to the daily goal change its background color to green
        bars.forEach((bar) => {
            if (parseFloat(bar.style.height) >= dailyGoalHeight) {
                //if so change its background color
                bar.style.backgroundColor = "#29C677";
            }
        });
    }, [dailyGoalHeight, user.favDailyGoal]);

    useEffect(() => {
        // console.log(data);
        if (data && data.length !== 0) {
            const myArray = [];
            for (let i = 0; i < data.length; i++) {
                let dayPrefix;
                if (i === 6) {
                    dayPrefix = "S";
                } else {
                    dayPrefix = getDayPrefix(i + 1);
                }
                const dayInfo = {
                    lastWeek: {
                        value: parseInt(data[i][0].timeInSec / 60),
                        height: renderBarHeight(data[i][0].timeInSec / 60), //because chart displays time in minutes
                        date: data[i][0].date
                    },
                    thisWeek: {
                        value: data[i][1] ? parseInt(data[i][1].timeInSec / 60) : 0,
                        height: data[i][1] ? renderBarHeight(data[i][1].timeInSec / 60) : 0, //because chart displays time in minutes
                        date: data[i][1] ? data[i][1].date : 0
                    },
                    dayPrefix: dayPrefix
                };
                myArray.push(dayInfo);
            }
            setdisplayedData(myArray);
        }
    }, [data]);

    // console.log(displayedData);

    return (
        <div className="bar-chart-component">
            {displayedData.length !== 0 &&
                displayedData.map((day, index) => {
                    return <DayBars key={index} dayDetails={day} />;
                })}

            {user.favDailyGoal === undefined || user.favDailyGoal === 0 ? null : (
                <div
                    className="bar-chart-component__dailygoal-marker"
                    style={{ bottom: `calc(${dailyGoalHeight}px + 35px)` }}
                >
                    <div className="text">
                        <h6>Goal</h6>
                        <h6>{user.favDailyGoal}m</h6>
                    </div>
                    <div className="dots">
                        {DOTS.map((dot, i) => {
                            return <span className="dots__dot" key={i}></span>;
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default memo(Barchart);
