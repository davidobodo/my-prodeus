import React, { useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Difficulty from "@/components/specific/difficulty/Difficulty";
import Time from "@/components/specific/time/Time";
import Likes from "@/components/specific/likes/Likes";
import AddFolderIcon from "@/assets/global/AddFolderIcon";
import BookmarkIcon from "@/assets/global/BookmatkIcon";

import { BASE_URL } from "@/utils/Url";

import { reqShowCourseModal } from "@/store/global/slice/UtilSlice";

import "./CoursePageClassCard.scss";
import { renderEmoji } from "@/utils/Utils";

const CoursePageClassCard = ({ details, watchedDetails = null, handleDisplayClassModule }) => {
    const { image, title, category, difficulty, duration, _id: classId } = details;

    const dispatch = useDispatch();
    const history = useHistory();

    const { userToken } = useSelector((state) => state.auth);

    const handleAddCourse = useCallback(
        (e) => {
            e.stopPropagation();
            dispatch(reqShowCourseModal(classId));
        },
        [dispatch]
    );

    const handleRedirect = useCallback(
        (e) => {
            e.stopPropagation();
            //Increase click count
            axios
                .post(
                    `${BASE_URL}/class/click/${classId}`,
                    {},
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${userToken}`
                        }
                    }
                )
                .then((res) => {
                    console.log(res, "click count");
                    //course has been saved, needs no ui feedback right now
                })
                .catch((err) => {
                    alert(err);
                });

            handleDisplayClassModule(details, watchedDetails, classId);
        },
        [details, watchedDetails]
    );

    const handleBookmarkClass = useCallback(
        (e) => {
            e.stopPropagation();
            axios
                .post(
                    `${BASE_URL}/class/save/${classId}`,
                    {},
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${userToken}`
                        }
                    }
                )
                .then(() => {
                    //course has been saved, needs no ui feedback right now
                })
                .catch((err) => {
                    alert(err);
                });
        },
        [classId]
    );

    return (
        <div className="class-preview-card-component">
            <div className="image-wrapper" style={{ backgroundImage: `url(${image})` }} onClick={handleRedirect}>
                <h5 className="badge-new">NEW</h5>
                <div className="likes-wrapper">
                    <Likes iconColor="#4389f8" bgColor="#fff" color="#000" />
                </div>

                <div className="bottom-actions">
                    <div onClick={handleBookmarkClass} className="bottom-actions__bookmark">
                        <div className="popup">Bookmark</div>
                        <BookmarkIcon color="#fff" bgColor="#e63146" opacity="1" />
                    </div>

                    <div onClick={handleAddCourse} className="bottom-actions__add-to-course">
                        <div className="popup">Add to course</div>
                        <AddFolderIcon color="#fff" bgColor="#6a28e6" opacity="1" />
                    </div>
                </div>
            </div>
            <h6 className="category">
                <span role="img" aria-label="">
                    {renderEmoji(category)}
                </span>
                {category}
            </h6>
            <h2 className="caption" onClick={handleRedirect}>
                {title}
            </h2>
            <div className="info">
                <section>
                    <Difficulty difficulty={difficulty} />
                </section>
                <section>
                    <Time iconColor="#fff" duration={duration} />
                </section>
            </div>
        </div>
    );
};

export default memo(CoursePageClassCard);
