import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Difficulty from "@/components/specific/difficulty/Difficulty";
import Time from "@/components/specific/time/Time";
import File from "@/components/specific/file/File";
import VideoPeerRevDisc from "@/components/specific/videoPeerRevDisc/VideoPeerRevDisc";
import imgPlaceholder from "@/assets/global/user.svg";
import editIcon from "@/assets/global/edit.svg";
import CoursePreviews from "@/components/specific/coursePreviews/CoursePreviews";
import ClassPreviewCard from "@/components/specific/classPreviewCard/ClassPreviewCard";
import AddMoreClasses from "./components/addMoreClasses/AddMoreClasses";
import CoursePageClassCard from "./components/CoursePageClassCard";
import EditCourseModal from "./components/editCourseModal/EditCourseModal";

import backIcon from "@/assets/global/back.svg";

import { imageUrlBuilder } from "@/utils/Utils";

import "./CoursePage.scss";

const CoursePage = () => {
    //----------------------------------------------------------
    //Store
    //----------------------------------------------------------
    const { details: courseDetails } = useSelector((state) => state.course.courseCurrentlyViewed);
    const { classesPresent } = useSelector((state) => state.course.courseCurrentlyViewed);
    const { userToken } = useSelector((state) => state.auth);

    //----------------------------------------------------------
    //Helpers
    //----------------------------------------------------------
    const { title, owner, _id: courseId } = courseDetails;
    const history = useHistory();

    //----------------------------------------------------------
    //States
    //----------------------------------------------------------
    const [showVideo, setShowVideo] = useState(false);
    const [addMore, setAddMore] = useState(false);
    const [editInfo, setEditInfo] = useState(false);
    const [classData, setClassData] = useState({
        details: null,
        watchedDetails: null,
        classId: ""
    });

    //----------------------------------------------------------
    //To go back to previous page
    //----------------------------------------------------------
    const handleGoBack = useCallback(() => {
        history.goBack();
    }, [history]);

    //----------------------------------------------------------
    //To show the class clicked
    //----------------------------------------------------------
    const handleDisplayClassModule = (details, watchedDetails, classId) => {
        setShowVideo(true);
        setAddMore(false);

        setClassData({
            ...classData,
            details,
            watchedDetails,
            classId
        });
    };

    //----------------------------------------------------------
    //To show the search section in order to add more classes
    //----------------------------------------------------------
    const handleAddMoreClasses = () => {
        setAddMore(true);
        setShowVideo(false);
    };

    //----------------------------------------------------------
    //To show edit course modal
    //----------------------------------------------------------
    const handleEditCourse = useCallback(() => {
        setEditInfo(!editInfo);
    }, [editInfo]);

    //----------------------------------------------------------
    //For rendering course owner image
    //----------------------------------------------------------
    const renderImage = useCallback(() => {
        if (owner.image) {
            return imageUrlBuilder(owner._id, owner.image);
        } else {
            return imgPlaceholder;
        }
    }, [owner]);

    //----------------------------------------------------------
    //To display first class in course by default
    //----------------------------------------------------------
    useEffect(() => {
        if (classesPresent.length !== 0) {
            setShowVideo(true);

            setClassData({
                ...classData,
                details: classesPresent[0].class,
                watchedDetails: classesPresent[0],
                classId: classesPresent[0]._id
            });
        } else {
            setShowVideo(false);
        }
    }, [classesPresent]);

    return (
        <>
            <div id="course-page">
                <div className="course-page">
                    <div className="course-page__content">
                        {/* Top Navigation (i.e Back button and Edit course button) */}
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div className="back-link" onClick={handleGoBack}>
                                <img src={backIcon} alt="back" />
                                Back
                            </div>
                            <div className="edit-course" onClick={handleEditCourse}>
                                <img src={editIcon} alt="" />
                                Edit Course
                            </div>
                        </div>

                        {/* Course info section */}
                        <div className="course-page__content__top-section">
                            <div className="preview-section">
                                <div className="header">
                                    <div className="header__left-column">
                                        <h1>{title}</h1>
                                        <div className="tags">
                                            <section className="col">
                                                <File number={classesPresent.length} />
                                            </section>
                                            <section className="col">
                                                <Difficulty difficulty={courseDetails.difficulty} />
                                            </section>
                                            <section className="col">
                                                <Time iconColor="#fff" />
                                            </section>
                                        </div>
                                    </div>
                                    <div className="header__right-column">
                                        <div className="created-by">
                                            <div className="created-by__name">
                                                <h6 className="purple">Created By</h6>
                                                <h4>
                                                    {owner.first_name} {owner.last_name}
                                                </h4>
                                            </div>
                                            <div
                                                className="created-by__image"
                                                style={{
                                                    backgroundImage: `url(${renderImage()})`,
                                                    backgroundSize: "cover"
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="previews-component-wrapper">
                                    <div className="previews-component">
                                        {classesPresent &&
                                            classesPresent.length !== 0 &&
                                            classesPresent.map((item, index) => {
                                                return (
                                                    <div className="preview-card-wrapper" key={index}>
                                                        <CoursePageClassCard
                                                            details={item.class}
                                                            handleDisplayClassModule={handleDisplayClassModule}
                                                        />
                                                    </div>
                                                );
                                            })}

                                        <div className="preview-card-wrapper add-more" style={{ minHeight: "240px" }}>
                                            <span onClick={handleAddMoreClasses} className="plus-icon">
                                                <span></span>
                                                <span></span>
                                            </span>
                                            <h2>
                                                Add More <br /> Classes
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Video player, Peer review, discussion and section to add more classes */}
                        <div className="course-page__content__bottom-section">
                            {showVideo && (
                                <VideoPeerRevDisc
                                    details={classData.details}
                                    watchedDetails={classData.watchedDetails}
                                    classId={classData.classId}
                                />
                            )}

                            {addMore && <AddMoreClasses />}
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit course modal */}
            <EditCourseModal
                editInfo={editInfo}
                handleEditCourse={handleEditCourse}
                courseInfo={courseDetails}
                courseClasses={classesPresent}
                userToken={userToken}
            />
        </>
    );
};

export default CoursePage;
