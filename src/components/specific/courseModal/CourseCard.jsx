import React, { useEffect } from "react";
import axios from "axios";
import "./CourseModal.scss";
import userIcon from "@/assets/global/courseModal/user.svg";
import timeIcon from "@/assets/global/courseModal/time.svg";

import { BASE_URL } from "@/utils/Url";
import { videoDurationToSeconds, secondsToHms, showErrorToast } from "@/utils/Utils";
import { useState } from "react";

const CourseCard = ({ details, handleAddToCourse, userToken }) => {
    const { category, title, classCount, image, _id: courseId } = details;

    const [students, setStudents] = useState([]);
    const [totalCourseTime, setTotalCourseTime] = useState("");
    const [classesPresent, setClassesPresent] = useState(classCount);

    useEffect(() => {
        axios
            .get(`${BASE_URL}/course/students/${courseId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then((res) => {
                setStudents(res.data);
            })
            .catch((err) => {
                console.log(err);
                showErrorToast(err);
            });

        //retrieve all classes in this course
        axios
            .get(`${BASE_URL}/course/classes/${courseId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then((res) => {
                //loop through all the classes
                setClassesPresent(res.data);
                const totalTimeInsecs = res.data.reduce((total, item) => {
                    return total + videoDurationToSeconds(item.class.duration);
                }, 0);

                setTotalCourseTime(secondsToHms(totalTimeInsecs));
            })
            .catch((err) => {
                console.log(err);
                showErrorToast(err);
            });
    }, []);

    return (
        <div className="course-details" onClick={() => handleAddToCourse(courseId, title)}>
            <div
                className="img-wrapper"
                style={{
                    backgroundImage: `url(${image})`
                }}
            >
                <div className="badge">{classesPresent ? classesPresent.length : 0}</div>
            </div>
            <div className="details">
                <h6>{category}</h6>
                <h4>{title}</h4>
                <div className="details__info">
                    <div className="col">
                        <img src={userIcon} alt="" />
                        <span>
                            {students.length} {students.length === 1 ? "student" : "students"}
                        </span>
                    </div>
                    {totalCourseTime && (
                        <div className="col">
                            <img src={timeIcon} alt="" />
                            <span>{totalCourseTime}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
