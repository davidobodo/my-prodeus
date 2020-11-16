import React, { useCallback, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Difficulty from "@/components/specific/difficulty/Difficulty";
import Time from "@/components/specific/time/Time";
import Likes from "@/components/specific/likes/Likes";
import BookmarkIcon from "@/assets/global/BookmatkIcon";
import File from "@/components/specific/file/File";

import "./CoursePreviewCard.scss";

import { BASE_URL } from "@/utils/Url";
import { renderEmoji } from "@/utils/Utils";
import { updateCourseCurrentlyViewed } from "@/store/global/slice/CourseSlice";

const CoursePreviewCard = ({ details }) => {
    const { title, category, difficulty, duration, _id: courseId, owner } = details;

    const dispatch = useDispatch();
    const history = useHistory();

    const { userToken } = useSelector((state) => state.auth);

    const [classesPresent, setClassesPresent] = useState([]);

    const handleRedirect = useCallback(
        (e) => {
            e.stopPropagation();
            const payload = {
                details,
                classesPresent
            };
            dispatch(updateCourseCurrentlyViewed(payload));
            history.push({ pathname: "/library-course" });
        },
        [details, classesPresent]
    );

    const handleBookmarkCourse = useCallback((e) => {
        e.stopPropagation();
        axios
            .post(
                `${BASE_URL}/course/save/${courseId}`,
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
    }, []);

    useEffect(() => {
        axios
            .get(`${BASE_URL}/course/classes/${courseId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then((res) => {
                setClassesPresent(res.data);
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    return (
        <div className="course-preview-card-component">
            <div
                className="image-wrapper"
                style={{ backgroundImage: `url(${classesPresent.length !== 0 ? classesPresent[0].class.image : ""})` }}
                onClick={handleRedirect}
            >
                <div className="badge">
                    <File number={classesPresent.length} />
                </div>
                <div className="likes-wrapper">
                    <Likes iconColor="#4389f8" bgColor="#fff" color="#000" />
                </div>

                <div className="bottom-actions">
                    <div className="bottom-actions__bookmark" onClick={handleBookmarkCourse}>
                        <div className="popup">Bookmark</div>
                        <BookmarkIcon color="#fff" bgColor="#e63146" opacity="1" />
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

export default memo(CoursePreviewCard);
