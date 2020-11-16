import React, { useState, useEffect } from "react";

import Doughnut from "./submoduleDoughnut/DonutChart";

import { secondsToHms } from "@/utils/Utils";
import "./DoughnutChart.scss";
const DoughnutChart = ({ categories, totalTimeInSec }) => {
    const [data, setData] = useState();
    const renderColor = (index) => {
        switch (index) {
            case 0:
                return "#4389F8";
            case 1:
                return "#F7CF34";
            case 2:
                return "#29C677";
            case 3:
                return "#E63146";
            case 4:
                return "#6A28E6";
        }
    };

    const sumOfFirstFive = categories?.slice(0, 5).reduce((total, item) => {
        return total + item.sec;
    }, 0);

    const timeSpentOnOthersInSeconds = totalTimeInSec - sumOfFirstFive;
    const timeSpentOnOthersInHms = secondsToHms(timeSpentOnOthersInSeconds);

    const renderOthers = () => {
        //Find others percentage
        return (
            <div className="custom-legend__item">
                <div className="circle" style={{ backgroundColor: "#B4B4C9" }}></div>
                <div className="text">
                    <h3>Other</h3>
                    <h5>
                        {parseInt((timeSpentOnOthersInSeconds / totalTimeInSec) * 100)}% | {timeSpentOnOthersInHms}
                    </h5>
                </div>
            </div>
        );
    };

    useEffect(() => {
        if (categories && categories.length !== 0) {
            setData([
                {
                    label: categories[0].title,
                    value: categories[0].sec
                },
                {
                    label: categories[1].title,
                    value: categories[1].sec
                },
                {
                    label: categories[2].title,
                    value: categories[2].sec
                },
                {
                    label: categories[3].title,
                    value: categories[3].sec
                },
                {
                    label: categories[4].title,
                    value: categories[4].sec
                },

                {
                    label: "Other",
                    value: timeSpentOnOthersInSeconds
                }
            ]);
        }
    }, [categories]);
    return (
        <div className="doughnut-chart-component">
            {data && <Doughnut data={data} width={300} height={300} legend={false} />}
            {categories && (
                <div className="custom-legend">
                    {categories.slice(0, 5).map((category, index) => {
                        const { title, hms, sec } = category;
                        return (
                            <div className="custom-legend__item" key={index}>
                                <div className="circle" style={{ backgroundColor: renderColor(index) }}></div>
                                <div className="text">
                                    <h3>{title}</h3>
                                    <h5>
                                        {parseInt((sec / totalTimeInSec) * 100)}% | {hms}
                                    </h5>
                                </div>
                            </div>
                        );
                    })}

                    {categories.length > 5 && renderOthers()}
                </div>
            )}
        </div>
    );
};

export default DoughnutChart;
