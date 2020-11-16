import React, { memo, useState, useCallback } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import CircularProgress from "@/components/specific/progressBars/CircularProgress";

import editIcon from "@/assets/global/edit.svg";
import minusIcon from "@/assets/global/dailySnapshot/minus.svg";
import plusIcon from "@/assets/global/dailySnapshot/plus.svg";

import { COLORS } from "@/utils/Constants";
import { BASE_URL } from "@/utils/Url";

import "../DailySnapshot.scss";
import { reqUpdateUser } from "@/store/global/slice/AuthSlice";
import { getLocalStorage, setLocalStorage } from "@/utils/Utils";

const { choiceBlue, choiceLightBlue } = COLORS;

const DailyGoal = ({ totalTimeSpentToday }) => {
    const dispatch = useDispatch();
    const { userToken } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.auth);

    const [showTimebar, setShowTimebar] = useState(false);
    const [dailyGoal, setDailyGoal] = useState(user.favDailyGoal || 0);

    const handleShowTimebar = useCallback(() => {
        setShowTimebar(true);
    }, []);

    const handleHideTimebar = useCallback(() => {
        setShowTimebar(false);
        handleStoreDailyGoal();
    });

    const handleSetDailyGoal = useCallback(
        (e) => {
            const { value } = e.target.dataset;

            if (value === "-") {
                if (dailyGoal !== 0) {
                    setDailyGoal((prevState) => prevState - 5);
                }
            } else if (value === "+") {
                if (dailyGoal !== 1440) {
                    setDailyGoal((prevState) => prevState + 5);
                }
            }
        },
        [dailyGoal]
    );

    //-----------------------------------------------------------------
    //Network Request
    //-----------------------------------------------------------------
    //Needed to be hoisted hence the function declaration
    function handleStoreDailyGoal() {
        const body = {
            favDailyGoal: dailyGoal
        };

        axios
            .post(`${BASE_URL}/user/update`, body, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then((res) => {
                dispatch(reqUpdateUser(res.data));

                //Update Local storage
                const localStorageData = getLocalStorage("prodeus");
                localStorageData.user = res.data;
                setLocalStorage("prodeus", localStorageData);
            })
            .catch((err) => {
                alert(err);
            });
    }

    const percentageComplete = ((totalTimeSpentToday / dailyGoal) * 100).toFixed(1);

    return (
        <>
            {showTimebar ? (
                <div className="summary__daily-goal-two section">
                    <h4>Set your daily goal</h4>
                    <div className="reactive-time-bar" onClick={handleSetDailyGoal}>
                        <button className="minus" data-value="-">
                            <img src={minusIcon} alt="-" data-value="-" />
                        </button>
                        <span>{dailyGoal}m</span>
                        <button className="plus" data-value="+">
                            <img src={plusIcon} alt="+" data-value="+" />
                        </button>
                    </div>
                    <button className="btn-submit" onClick={handleHideTimebar}>
                        Submit
                    </button>
                </div>
            ) : (
                <div className="summary__daily-goal-one section">
                    <div className="details">
                        <h2>Daily Goal</h2>
                        <p>
                            {totalTimeSpentToday}/{dailyGoal}
                            <span className="ash">m</span>
                            <img src={editIcon} alt="edit" onClick={handleShowTimebar} />
                        </p>
                    </div>
                    <div className="graph">
                        <CircularProgress percent={percentageComplete} color={choiceBlue} trailColor={choiceLightBlue}>
                            <span className="graph__number">
                                {percentageComplete}
                                <sup>%</sup>
                            </span>
                        </CircularProgress>
                    </div>
                </div>
            )}
        </>
    );
};

export default memo(DailyGoal);
