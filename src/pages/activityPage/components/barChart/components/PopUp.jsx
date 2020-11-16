import React, { memo } from "react";

import increaseIcon from "@/assets/pages/activityPage/increase.svg";
import decreaseIcon from "@/assets/pages/activityPage/decrease.svg";

import "./PopUp.scss";

import { COLORS } from "@/utils/Constants";

const { choiceGreen, choiceRed } = COLORS;

const PopUp = ({ myData, mySiblingsData }) => {
    const { value: myValue, date: myDate } = myData;
    const { value: mySiblingsValue, date: mySiblingsDate } = mySiblingsData;
    let lowerNumber;

    //Find percentage equivalent of each valut
    const difference = Math.abs(myValue - mySiblingsValue);

    if (parseInt(myValue) < parseInt(mySiblingsValue)) {
        lowerNumber = myValue;
    } else if (parseInt(myValue) > parseInt(mySiblingsValue)) {
        lowerNumber = mySiblingsValue;
    } else {
        lowerNumber = myValue;
    }

    const renderPercentage = () => {
        //Any number divided by zero would result in an invalid calculation here
        if (lowerNumber === 0) return 0;
        return ((difference / lowerNumber) * 100).toFixed(1);
    };

    // console.log(myDate, mySiblingsDate);

    return (
        <div className="popup">
            <h6 className="popup__top">Aug 30 vs Aug 24</h6>
            <div className="popup__bottom">
                <h4>{myValue}m</h4>
                {lowerNumber === myValue ? (
                    <>
                        <img src={decreaseIcon} alt="" />
                        <h5 style={{ color: choiceRed }}>{renderPercentage()}%</h5>
                    </>
                ) : (
                    <>
                        <img src={increaseIcon} alt="" />
                        <h5 style={{ color: choiceGreen }}>{renderPercentage()}%</h5>
                    </>
                )}
            </div>
        </div>
    );
};

export default memo(PopUp);
