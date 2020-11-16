import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import moment from "moment";

import CourseCard from "./components/CourseCard";
import NumberCard from "./components/NumberCard";
import PercentageCard from "./components/PercentageCard";
import BarChart from "./components/barChart/BarChart";
import DoughnutChart from "./components/doughnutChart/DoughnutChart";
import TopicsChart from "./components/topicsChart/TopicsChart";

import Advert from "@/components/specific/advert/Advert";
import useGetProdegreeInfo from "@/components/conventional/customHooks/useGetProdegreeInfo";

import classesAddedIcon from "@/assets/pages/activityPage/classesAddedIcon.svg";
import classesCompletedIcon from "@/assets/pages/activityPage/classesCompletedIcon.svg";
import hoursWatchedIcon from "@/assets/pages/activityPage/hoursWatchedIcon.svg";

import { COLORS, TIME_WATCHED } from "@/utils/Constants";
import { BASE_URL } from "@/utils/Url";
import {
    secondsToHms,
    getUniqueCategoriesAndTheirTotalTimeWatched,
    getTotalVideoSecondsWatched,
    videoDurationToSeconds,
    getLoopCount,
    getDayPrefix
} from "@/utils/Utils";

import { updateCreatedClasses } from "@/store/global/slice/ClassSlice";

import "./ActivityPage.scss";

const {
    choiceBlue,
    choiceGreen,
    choicePurple,
    choiceLightBlue,
    choiceLightGreen,
    choiceLightPurple,
    choiceRed,
    choiceLightRed,
    choiceYellow,
    choiceLightYellow
} = COLORS;

const ActivityPage = () => {
    //------------------------------------------------------------------------------------------
    //Helpers
    //------------------------------------------------------------------------------------------
    const dispatch = useDispatch();
    const data = useGetProdegreeInfo();

    //------------------------------------------------------------------------------------------
    //Store
    //------------------------------------------------------------------------------------------
    const { userToken } = useSelector((state) => state.auth);
    const { createdClasses } = useSelector((state) => state.class);

    //------------------------------------------------------------------------------------------
    //State
    //------------------------------------------------------------------------------------------
    const [proDegrees, setProDegrees] = useState([]);
    const [hoursWatched, setHoursWatched] = useState();
    const [secondsWatched, setSecondsWatched] = useState();
    const [classTimeCompleted, setClassTimeCompleted] = useState();
    const [classesCompleted, setClassesCompleted] = useState();
    const [classesCompletedPercent, setClassesCompletedPercent] = useState();
    const [doughnutChartDetails, setDoughnutChartDetails] = useState();
    const [barChartTimeWatched, setBarChartTimeWatched] = useState([]);
    const [topicsSectionData, setTopicsSectionData] = useState([]);
    const [topicsTotalTime, setTopicsTotalTime] = useState(0);
    const [difficultiesPercent, setDifficultiesPercent] = useState({
        b: 0,
        i: 0,
        a: 0
    });
    const [difficultiesTime, setDifficultiesTime] = useState({
        b: 0,
        i: 0,
        a: 0
    });

    //------------------------------------------------------------------------------------------
    //TIME WATCHED (BAR CHART)
    //------------------------------------------------------------------------------------------
    const calculateTimeWatched = useCallback(() => {
        //Dummy data
        // const proDegrees = [
        //     {
        //         title: "ARTS",
        //         categories: TIME_WATCHED
        //     },
        //     {
        //         title: "COMPUTER SCIENCE",
        //         categories: TIME_WATCHED
        //     },
        //     {
        //         title: "BANKING",
        //         categories: TIME_WATCHED
        //     },
        //     {
        //         title: "SOCIAL MEDIA INFLUENCE",
        //         categories: TIME_WATCHED
        //     },
        //     {
        //         title: "GOLFER",
        //         categories: TIME_WATCHED
        //     }
        // ];

        //Get todays date
        const todaysDate = moment().format("DD-MM-YY");
        //Get the day of the week (this is returned in numbers ranging from 1(monday) - 7(sunday)
        // let dayOfTheWeek = moment(`${todaysDate}`, "DD-MM-YY").day();
        let dayOfTheWeek = moment(todaysDate, "DD-MM-YY").day();

        /*
        Our check should always span two weeks.
        Take for instance if today is Tuesday it means, we need to get time watched from last week monday(cause our graph starts from monday) till today
        same goes for any other day.

        Hence after getting todays date we need to keep going through every previous day(loop count) until we arrive at last week monday
        for monday, we go back 7 times to get to the last week monday
        for tuesday, we go back 8 times to get to the last week monday
        for wednesday, we go back 9 times to get to the last week monday

        Im sure you get the gist by now.
        While going through every previous day, we store the time spent watching videos for that day
        */
        let loopCount = getLoopCount(dayOfTheWeek);
        let ALL_TIME = [];

        // console.log(loopCount);

        for (let i = 0; i <= loopCount; i++) {
            // let activeDate = moment(todaysDate).clone().subtract(i, "days").format("DD-MM-YY");
            let activeDate = moment(todaysDate, "DD-MM-YY").clone().subtract(i, "days").format("DD-MM-YY");
            let timeRangesForActiveDate = [];

            proDegrees.forEach((proDegree) => {
                //Loop through all videos in datatbase
                proDegree.categories.forEach((video) => {
                    //Loop through the dateTime array in one video
                    video.dataTime.forEach((time, index) => {
                        //If the active date we are considering exists
                        if (time === activeDate) {
                            timeRangesForActiveDate.push(video.data[index]);
                        }
                    });
                });
            });

            //Convert the range into single values
            const timeValuesForActiveDate = timeRangesForActiveDate.map((range) => {
                const value = range.split("-");

                //if second index doesnt exist then range wasnt really a range but instead just a value
                if (value[1] === undefined) {
                    return 0;
                } else {
                    return value[1] - value[0];
                }
            });

            const totalTimeSentInTheDay = timeValuesForActiveDate.reduce((total, a) => {
                return total + a;
            }, 0);

            const dayOfTheWeek = moment(activeDate, "DD-MM-YY").day();
            const dayOfTheWeekPrefix = getDayPrefix(dayOfTheWeek);

            const structure = {
                date: activeDate,
                totalTime: totalTimeSentInTheDay,
                initial: dayOfTheWeekPrefix,
                number: dayOfTheWeek
            };

            ALL_TIME.push(structure);
        }

        //reorder array to start from last week monday
        const reversed = ALL_TIME.reverse();
        const ultimate = [];
        for (let i = 0; i < reversed.length; i++) {
            if (i > 6) {
                const valueToEdit = ultimate[i - 7];
                const a = [
                    ...valueToEdit,
                    {
                        date: reversed[i].date,
                        timeInSec: reversed[i].totalTime
                    }
                ];
                ultimate[i - 7] = a;
            } else {
                const a = {
                    date: reversed[i].date,
                    timeInSec: reversed[i].totalTime
                };

                ultimate.push([a]);
            }
        }

        setBarChartTimeWatched(ultimate);
    }, [proDegrees]);

    //------------------------------------------------------------------------------------------
    //CATEGORIES (Doughnut chart)
    //------------------------------------------------------------------------------------------
    const sortCategorizeIntoMostWatchedForDoughnutChart = useCallback(() => {
        //Get the unique categories from each prodegree.
        //Unique because more than one video may have the same category
        const uniqueCategories = proDegrees.map((item) => {
            return getUniqueCategoriesAndTheirTotalTimeWatched(item.categories);
        });

        //Joined the categories in all prodegrees together
        let joinedCategories = [];
        uniqueCategories.forEach((item) => {
            item.forEach((data) => {
                joinedCategories.push(data);
            });
        });

        //Arranged categories from highest time spent to lowest
        const sortedCategories = joinedCategories.sort((a, b) => {
            //We are comparing the time by seconds and the index 2 has the seconds value
            return b.sec - a.sec;
        });

        setDoughnutChartDetails(sortedCategories);
    }, [proDegrees]);

    //------------------------------------------------------------------------------------------
    //TOPICS
    //------------------------------------------------------------------------------------------
    const calculateTopicsSpent = useCallback(() => {
        //loop through each prodegree in all prodegrees
        let allTopicsSet = new Set();
        const eachProdegreeTopics = proDegrees.map((proDegree) => {
            //in each prodegree loop through watched videos
            const topicsInVideo = proDegree.categories.map((video) => {
                let topicsInThisProdegree = {};
                const timeSpentOnTopic = video.totalWatched;
                //in each watched video get the topics/skills associated to it
                video.class.topics.forEach((topic) => {
                    topicsInThisProdegree = {
                        ...topicsInThisProdegree,
                        [topic]: timeSpentOnTopic
                    };
                    allTopicsSet.add(topic);
                });
                return topicsInThisProdegree;
            });

            return topicsInVideo;
        });

        const allTopicsArray = [...allTopicsSet];

        let allTopicsAndAllTime = {};

        for (let index in allTopicsArray) {
            let topic = allTopicsArray[index];

            eachProdegreeTopics.forEach((proDegree) => {
                proDegree.forEach((videoTopics) => {
                    // if no time value exists for this topic, get out of my loop
                    if (videoTopics[topic] === undefined) return;

                    //check it the topic already exists in our object
                    if (allTopicsAndAllTime[topic]) {
                        allTopicsAndAllTime = {
                            ...allTopicsAndAllTime,
                            [topic]: allTopicsAndAllTime[topic] + videoTopics[topic]
                        };
                        return;
                    }

                    allTopicsAndAllTime = {
                        ...allTopicsAndAllTime,
                        [topic]: videoTopics[topic]
                    };
                });
            });
        }

        const getTotalTimeOnTopics = Object.values(allTopicsAndAllTime).reduce((total, index) => {
            return total + index;
        }, 0);

        let topicsWithMoreDetails = [];

        Object.entries(allTopicsAndAllTime).forEach((item) => {
            const a = {
                title: item[0],
                timeInSec: item[1],
                timeInHms: secondsToHms(item[1]),
                percentage: ((item[1] / getTotalTimeOnTopics) * 100).toFixed(2)
            };
            topicsWithMoreDetails.push(a);
        });

        const sorted = topicsWithMoreDetails.sort((a, b) => {
            return b.timeInSec - a.timeInSec;
        });

        setTopicsTotalTime(getTotalTimeOnTopics);
        setTopicsSectionData(sorted);
    }, [proDegrees]);

    //------------------------------------------------------------------------------------------
    //Current Prodegrees
    //------------------------------------------------------------------------------------------
    const getDegreeColors = useCallback((title) => {
        switch (title) {
            case "Art & Design":
                return {
                    color: choiceGreen,
                    trailColor: choiceLightGreen
                };
            case "Computer Science":
                return {
                    color: choiceBlue,
                    trailColor: choiceLightBlue
                };
            case "Business":
                return {
                    color: choiceRed,
                    trailColor: choiceLightRed
                };
            case "Academics":
                return {
                    color: choicePurple,
                    trailColor: choiceLightPurple
                };
            case "Lifestyle":
                return {
                    color: choiceYellow,
                    trailColor: choiceLightYellow
                };
        }
    }, []);
    const renderProdegrees = useCallback(() => {
        if (proDegrees.length === 0) {
            return null;
        } else {
            return proDegrees.map((proDegree, index) => {
                const { title, degreeType, obtainedCredits, availableCredits } = proDegree;
                const degreeColors = getDegreeColors(title);
                return proDegree.categories.length !== 0 ? (
                    <div className="section" key={index}>
                        <CourseCard
                            title={title}
                            level={degreeType}
                            color={degreeColors.color}
                            trailColor={degreeColors.trailColor}
                            currentCredits={obtainedCredits}
                            totalCredits={availableCredits}
                        />
                    </div>
                ) : null;
            });
        }
    }, [proDegrees]);

    //------------------------------------------------------------------------------------------
    //HOURS WATCHED
    //------------------------------------------------------------------------------------------
    const calculateTotalHoursWatched = useCallback(() => {
        const totalHoursWatched = proDegrees.reduce((total, item) => {
            return total + item.totalHoursWatched;
        }, 0);
        setHoursWatched(totalHoursWatched.toFixed(1));
        setSecondsWatched(getTotalVideoSecondsWatched(proDegrees));
    }, [proDegrees]);

    //------------------------------------------------------------------------------------------
    //CLASS TIME COMPLETED - (PERCENTAGE) hours watched out of total amount of hours available
    //------------------------------------------------------------------------------------------
    const calculateClassTimeCompleted = useCallback(() => {
        //Get total amount of hours available
        const eachProDegreeTotalSeconds = proDegrees.map((item) => {
            const totalSecondsForAllVideosInThisProDegree = item.categories.reduce((total, video) => {
                ///////////////////////
                //Convert each videos duration to seconds
                const totalSecondsForOneVideo = videoDurationToSeconds(video.videoDuration);

                return totalSecondsForOneVideo + total;
            }, 0);

            return totalSecondsForAllVideosInThisProDegree;
        });
        const totalSecondsOnAllProdegrees = eachProDegreeTotalSeconds.reduce((total, item) => {
            return total + item;
        }, 0);
        //Calculate total seconds user has watched in all prodegrees
        const totalSecondsonAllProdegreesWatchedByUser = proDegrees.reduce((total, item) => {
            return total + item.totalSecondsWatched;
        }, 0);
        const classTimeCompleted = (totalSecondsonAllProdegreesWatchedByUser / totalSecondsOnAllProdegrees) * 100;
        setClassTimeCompleted(classTimeCompleted.toFixed(1));
    }, [proDegrees]);

    //------------------------------------------------------------------------------------------
    //CLASSES COMPLETED(Number)
    //------------------------------------------------------------------------------------------
    const calculateClassesCompleted = useCallback(() => {
        //compare if the watched time is the same as the entire video duration
        const allProDegreesCompletedClassesArray = proDegrees.map((item) => {
            const eachProDegreeCompletedClasses = item.categories.filter((video) => {
                const totalVideoDuration = videoDurationToSeconds(video.class.duration);
                return totalVideoDuration === video.totalWatched;
            });

            return eachProDegreeCompletedClasses.length;
        });
        const allProDegreesCompletedClasses = allProDegreesCompletedClassesArray.reduce((total, item) => {
            return total + item;
        }, 0);
        setClassesCompleted(allProDegreesCompletedClasses);

        const allClassesViewedByUser = proDegrees.reduce((total, item) => {
            return total + item.categories.length;
        }, 0);
        const classesCompletedPercent = (allProDegreesCompletedClasses / allClassesViewedByUser) * 100;
        setClassesCompletedPercent(classesCompletedPercent);
    }, [proDegrees]);

    //------------------------------------------------------------------------------------------
    //DIFFICULTY
    //------------------------------------------------------------------------------------------
    const categorizeVideosIntoDifficulties = useCallback(() => {
        let beginner = [];
        let intermediate = [];
        let advanced = [];
        //assign videos to their difficulty level
        proDegrees.forEach((item) => {
            item.categories.forEach((video) => {
                if (video.class.difficulty === "Beginner") {
                    beginner.push(video);
                    return;
                } else if (video.class.difficulty === "Intermediate") {
                    intermediate.push(video);
                    return;
                } else if (video.class.difficulty === "Advanced") {
                    advanced.push(video);
                    return;
                }
            });
        });
        const beginnerTotalTimeInSec = beginner.reduce((total, item) => {
            return total + item.totalWatched;
        }, 0);
        const intermediateTotalTimeInSec = intermediate.reduce((total, item) => {
            return total + item.totalWatched;
        }, 0);
        const advancedTotalTimeInSec = advanced.reduce((total, item) => {
            return total + item.totalWatched;
        }, 0);
        const totalTimeWatched = beginnerTotalTimeInSec + intermediateTotalTimeInSec + advancedTotalTimeInSec;
        const beginnerPercent = (beginnerTotalTimeInSec / totalTimeWatched) * 100;
        const intermediatePercent = (intermediateTotalTimeInSec / totalTimeWatched) * 100;
        const advancedPercent = (advancedTotalTimeInSec / totalTimeWatched) * 100;

        setDifficultiesTime({
            ...difficultiesTime,
            b: secondsToHms(beginnerTotalTimeInSec),
            i: secondsToHms(intermediateTotalTimeInSec),
            a: secondsToHms(advancedTotalTimeInSec)
        });

        setDifficultiesPercent({
            ...difficultiesPercent,
            b: `${beginnerPercent.toFixed(2)}%`,
            i: `${intermediatePercent.toFixed(2)}%`,
            a: `${advancedPercent.toFixed(2)}%`
        });
    }, [proDegrees]);

    //------------------------------------------------------------------------------------------
    //Fire these functions once prodegrees is set
    //------------------------------------------------------------------------------------------
    useEffect(() => {
        if (proDegrees) {
            categorizeVideosIntoDifficulties();
            sortCategorizeIntoMostWatchedForDoughnutChart();
            calculateTotalHoursWatched();
            calculateClassTimeCompleted();
            calculateClassesCompleted();
            calculateTopicsSpent();
            calculateTimeWatched();
        }
    }, [proDegrees]);

    //------------------------------------------------------------------------------------------
    //When data loads then assign them to our prodegrees
    //------------------------------------------------------------------------------------------
    useEffect(() => {
        if (data) {
            setProDegrees(data.proDegrees);
        }
    }, [data]);

    //------------------------------------------------------------------------------------------
    //Get all classes Added (CLASSES ADDED)
    //------------------------------------------------------------------------------------------
    useEffect(() => {
        axios
            .get(`${BASE_URL}/class/created`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then((res) => {
                dispatch(updateCreatedClasses(res.data));
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    return (
        <div id="activity-page">
            <div className="activity-page">
                <Advert />
                <div className="activity-page__body">
                    <h1 className="activity-page__title">Learning Breakdown</h1>
                    <div className="activity-page__content">
                        <div className="activity-page__content__left-column">
                            {/* These course cards wont show on desktop */}
                            <div className="course-card-section-wrapper">{renderProdegrees()}</div>

                            {/* Time watched bar chart */}
                            <div className="section bar-chart-wrapper">
                                <div className="bar-chart-wrapper__header">
                                    <h1>Time watched</h1>
                                    <div className="legend">
                                        <div className="legend__item">
                                            <span style={{ backgroundColor: "#4389F8" }}></span>
                                            <h5>Last Week</h5>
                                        </div>
                                        <div className="legend__item">
                                            <span style={{ backgroundColor: "rgba(67, 137, 248, 0.3)" }}></span>
                                            <h5>This week</h5>
                                        </div>
                                        <div className="legend__item">
                                            <span style={{ backgroundColor: "#29C677" }}></span>
                                            <h5>Goal Met</h5>
                                        </div>
                                        <div className="legend__item">
                                            <span style={{ backgroundColor: "rgba(41, 198, 119, 0.3)" }}></span>
                                            <h5>Goal Met</h5>
                                        </div>
                                    </div>
                                </div>
                                <BarChart data={barChartTimeWatched} />
                            </div>

                            {/* Categories doughnut chart */}
                            <div className="section">
                                <h1>Categories</h1>
                                <div className="doughtnut-chart-wrapper">
                                    <DoughnutChart categories={doughnutChartDetails} totalTimeInSec={secondsWatched} />
                                </div>
                            </div>

                            {/* Topics bar */}
                            <TopicsChart data={topicsSectionData} totalTimeInSec={topicsTotalTime} />
                        </div>

                        {/* Right column */}
                        <div className="activity-page__content__right-column">
                            {/* These course cards will show in desktop only */}
                            <div className="course-card-section-wrapper row">{renderProdegrees()}</div>

                            {/* Classes Added */}
                            <div className=" row">
                                <NumberCard
                                    number={createdClasses.length}
                                    label="Classes Added"
                                    img={classesAddedIcon}
                                    color="#29C677"
                                />
                            </div>

                            {/* Hours watched */}
                            <div className="row">
                                <NumberCard
                                    number={hoursWatched}
                                    label="Hours Watched"
                                    img={hoursWatchedIcon}
                                    color="#4389F8"
                                />
                            </div>

                            {/* Class Time completed */}
                            <div className="row">
                                <PercentageCard
                                    percent={
                                        classTimeCompleted === undefined || classTimeCompleted === "NaN"
                                            ? "0"
                                            : classTimeCompleted
                                    }
                                    label="Class Time Completed"
                                    color={choiceBlue}
                                    trailColor={choiceLightBlue}
                                />
                            </div>

                            {/* Classes completed percentage*/}
                            <div className="row">
                                <PercentageCard
                                    percent={Number.isNaN(classesCompletedPercent) ? "0" : classesCompletedPercent}
                                    label="Classes Completed"
                                    color={choicePurple}
                                    trailColor={choiceLightPurple}
                                />
                            </div>

                            {/* Classes completed number */}
                            <div className="row">
                                <NumberCard
                                    number={classesCompleted}
                                    label="Classes Completed"
                                    img={classesCompletedIcon}
                                    color="#6A28E6"
                                />
                            </div>

                            {/* Difficulty */}
                            <div className="section difficulty row">
                                <h1>Difficulty</h1>
                                <div
                                    className="difficulty__color-summary"
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: `${difficultiesPercent.b} ${difficultiesPercent.i} ${difficultiesPercent.a}`,
                                        gridGap: "5px"
                                    }}
                                >
                                    <span style={{ backgroundColor: choiceRed }}></span>
                                    <span style={{ backgroundColor: choiceYellow }}></span>
                                    <span style={{ backgroundColor: choiceGreen }}></span>
                                </div>

                                {difficultiesPercent.b !== "NaN%" ? (
                                    <>
                                        <div className="difficulty__level">
                                            <div className="difficulty__level__info">
                                                <h3>
                                                    <span
                                                        className="color-code"
                                                        style={{ backgroundColor: choiceGreen }}
                                                    ></span>
                                                    Beginner
                                                </h3>
                                                <h5>
                                                    {difficultiesPercent.b} | {difficultiesTime.b}
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="difficulty__level">
                                            <div className="difficulty__level__info">
                                                <h3>
                                                    <span
                                                        className="color-code"
                                                        style={{ backgroundColor: choiceYellow }}
                                                    ></span>
                                                    Intermediate
                                                </h3>
                                                <h5>
                                                    {difficultiesPercent.i} | {difficultiesTime.i}
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="difficulty__level">
                                            <div className="difficulty__level__info">
                                                <h3>
                                                    <span
                                                        className="color-code"
                                                        style={{ backgroundColor: choiceRed }}
                                                    ></span>
                                                    Advanced
                                                </h3>
                                                <h5>
                                                    {difficultiesPercent.a} | {difficultiesTime.a}
                                                </h5>
                                            </div>
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityPage;
