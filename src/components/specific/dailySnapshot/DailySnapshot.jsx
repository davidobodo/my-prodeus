import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import DailyGoal from "./components/DailyGoal";
import AccountSettings from "./components/accoutSettings/AccountSettings";

import cancelIcon from "@/assets/global/cancel.svg";
import userImg from "@/assets/global/user.svg";
// import face from "@/assets/global/face.png";

import "./DailySnapshot.scss";
import useGetProdegreeInfo from "@/components/conventional/customHooks/useGetProdegreeInfo";
import { secondsToHms, assignColor } from "@/utils/Utils";

const DailySnapshot = ({ handleShowDailySnapshot, profilePic }) => {
    const { user } = useSelector((state) => state.auth);
    const [showAccountSettings, setShowAccountSettings] = useState(false);
    const data = useGetProdegreeInfo();

    const [watchedClasses, setWatchedClasses] = useState([]);
    const [todaysBreakdown, setTodaysBreakdown] = useState([]);
    const [totalTimeToday, setTotalTimeToday] = useState();
    const [timeSpentOnOthers, setTimeSpentOnOthers] = useState(0);

    //If user signed up with google then their email would be stored in this field
    //We are making use of this field becuase a user is not meant to be able to edit their info if they indeed signed up with google
    const userSignedUpWithGoogle = user.user_email;

    const handleShowAccountSettings = useCallback(() => {
        if (userSignedUpWithGoogle) return;
        setShowAccountSettings(!showAccountSettings);
    }, [showAccountSettings]);

    const calculateTimeSpentToday = useCallback(() => {
        const todaysDate = moment().format("DD-MM-YY");

        let allTime = {};
        watchedClasses.forEach((item) => {
            item.dataTime.forEach((time, index) => {
                if (time === todaysDate) {
                    // if (time === todaysDate) {
                    const timeRange = item.data[index];
                    const timeArray = timeRange.split("-");
                    let timeValue;

                    if (timeArray[1] === undefined) {
                        timeValue = 0;
                    } else {
                        timeValue = timeArray[1] - timeArray[0];
                    }
                    const category = item.class.category;

                    if (allTime[category]) {
                        allTime = {
                            ...allTime,
                            [category]: allTime[category] + timeValue
                        };
                        return;
                    }

                    allTime = {
                        ...allTime,
                        [category]: timeValue
                    };
                }
            });
        });

        const allTimeTodayArray = Object.entries(allTime).map((item) => {
            return {
                category: item[0],
                timeInSec: item[1],
                timeInHms: secondsToHms(item[1])
            };
        });

        // //dummy content
        // const allTimeTodayArray = [
        //     {
        //         category: "Web design",
        //         timeInHms: secondsToHms(1630),
        //         timeInSec: 1630
        //     },
        //     {
        //         category: "Photography",
        //         timeInHms: secondsToHms(13),
        //         timeInSec: 13
        //     },
        //     {
        //         category: "Blockchain",
        //         timeInHms: secondsToHms(153),
        //         timeInSec: 153
        //     },
        //     {
        //         category: "Accounting",
        //         timeInHms: secondsToHms(263),
        //         timeInSec: 263
        //     },
        //     {
        //         category: "Business Law",
        //         timeInHms: secondsToHms(16300),
        //         timeInSec: 16300
        //     },
        //     {
        //         category: "Productivity",
        //         timeInHms: secondsToHms(6893),
        //         timeInSec: 6893
        //     },
        //     {
        //         category: "Anthropology",
        //         timeInHms: secondsToHms(1098),
        //         timeInSec: 1098
        //     },
        //     {
        //         category: "Biology",
        //         timeInHms: secondsToHms(162),
        //         timeInSec: 162
        //     }
        // ];

        const sorted = allTimeTodayArray.sort((a, b) => {
            return b.timeInSec - a.timeInSec;
        });
        const sumOfFirstFive = sorted?.slice(0, 5).reduce((total, item) => {
            return total + item.timeInSec;
        }, 0);

        const totalTimeTodayInSec = allTimeTodayArray.reduce((total, item) => {
            return total + item.timeInSec;
        }, 0);

        const timeSpentOnOthers = totalTimeTodayInSec - sumOfFirstFive;

        setTimeSpentOnOthers(timeSpentOnOthers);
        setTodaysBreakdown(sorted);
        setTotalTimeToday(parseInt(totalTimeTodayInSec / 60));
    }, [watchedClasses]);

    useEffect(() => {
        if (watchedClasses) {
            calculateTimeSpentToday();
        }
    }, [watchedClasses]);

    useEffect(() => {
        if (data) {
            setWatchedClasses(data.watchedClasses);
        }
    }, [data]);

    return (
        <div className="daily-snapshot-component">
            {showAccountSettings ? (
                <AccountSettings
                    handleShowAccountSettings={handleShowAccountSettings}
                    handleShowDailySnapshot={handleShowDailySnapshot}
                />
            ) : (
                <div className="summary">
                    <div className="icon-wrapper">
                        <img src={cancelIcon} alt="cancel" onClick={handleShowDailySnapshot} />
                    </div>
                    <div className="summary__user-details section" onClick={handleShowAccountSettings}>
                        <div className="summary__user-details__img-wrapper">
                            <img src={profilePic || userImg} alt="" />
                        </div>
                        <div className="summary__user-details__info">
                            <h1>
                                {user.first_name} {user.last_name}
                            </h1>
                            {userSignedUpWithGoogle ? <></> : <h5>My Account</h5>}
                        </div>
                    </div>
                    <DailyGoal totalTimeSpentToday={totalTimeToday} />
                    <div className="summary__todays-breakdown section">
                        <h2 className="summary__todays-breakdown__title">Today's Breakdown</h2>
                        <div className="summary__todays-breakdown__content">
                            {todaysBreakdown.slice(0, 5).map((item, index) => {
                                const { category, timeInHms } = item;

                                //Each color bar would have a length equal to their fraction of the hihest watched
                                const barWidth =
                                    (todaysBreakdown[index].timeInSec / todaysBreakdown[0].timeInSec) * 100;

                                return (
                                    <div className="course-progress" key={index}>
                                        <p className="course-progress__title">{category}</p>
                                        <div className="course-progress__bar">
                                            <span
                                                className="color-bar"
                                                style={{
                                                    backgroundColor: assignColor(index),
                                                    width: `${barWidth.toFixed(4)}%`
                                                }}
                                            ></span>{" "}
                                            <h4 style={{ color: assignColor(index) }}>{timeInHms}</h4>
                                        </div>
                                    </div>
                                );
                            })}

                            {todaysBreakdown.length > 5 && (
                                <div className="course-progress">
                                    <p className="course-progress__title">others</p>
                                    <div className="course-progress__bar">
                                        <span
                                            className="color-bar"
                                            style={{
                                                backgroundColor: assignColor(5),
                                                width: `${(timeSpentOnOthers / todaysBreakdown[0].timeInSec) * 100}`
                                            }}
                                        ></span>{" "}
                                        <h4 style={{ color: assignColor(5) }}>{secondsToHms(timeSpentOnOthers)}</h4>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DailySnapshot;
