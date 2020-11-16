import React, { memo, useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "semantic-ui-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

import cancelIcon from "@/assets/global/cancel.svg";

import { BASE_URL } from "@/utils/Url";

import CourseCard from "./CourseCard";

import "./CourseModal.scss";

const CourseModal = ({ addCourse, handleShowCourseModal }) => {
    const history = useHistory();
    const { userToken } = useSelector((state) => state.auth);
    const { classIdToAddToCourse } = useSelector((state) => state.utils);
    const [createdCourses, setCreatedCourses] = useState([]);

    const handleNewCourse = useCallback(() => {
        handleShowCourseModal();
        history.push({ pathname: "/library-create-course", state: { classId: classIdToAddToCourse } });
    }, [handleShowCourseModal, history, classIdToAddToCourse]);

    const handleAddToCourse = useCallback(
        (courseId, title) => {
            const body = {
                courseId: courseId,
                classId: classIdToAddToCourse
            };
            axios
                .post(`${BASE_URL}/course/addclass`, body, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userToken}`
                    }
                })
                .then((res) => {
                    toast.success(`Added to course - ${title}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                    });

                    handleShowCourseModal();
                })
                .catch((err) => {
                    alert(err);
                });
        },
        [classIdToAddToCourse]
    );

    // ----------------------------------------------------------------------------
    // UseEffects
    // ----------------------------------------------------------------------------
    useEffect(() => {
        axios
            .get(`${BASE_URL}/course/created`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then((res) => {
                setCreatedCourses(res.data);
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    return (
        <Modal onClose={handleShowCourseModal} open={addCourse} className="course-modal-component">
            <div className="cancel-icon">
                <img src={cancelIcon} alt="x" onClick={handleShowCourseModal} />
            </div>

            <div className="course-modal-component__content">
                <h4 className="header">Add to Course</h4>
                <button className="btn-purple" onClick={handleNewCourse}>
                    New Course
                </button>
                <div className="courses-wrapper">
                    {createdCourses &&
                        createdCourses.length !== 0 &&
                        createdCourses.map((item, i) => {
                            return (
                                <CourseCard
                                    key={i}
                                    details={item}
                                    handleAddToCourse={handleAddToCourse}
                                    userToken={userToken}
                                />
                            );
                        })}
                </div>
            </div>
        </Modal>
    );
};

export default memo(CourseModal);
