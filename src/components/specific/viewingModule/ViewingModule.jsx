import React, { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Likes from "@/components/specific/likes/Likes";
import Difficulty from "@/components/specific/difficulty/Difficulty";
import Time from "@/components/specific/time/Time";
import VideoPlayer from "@/components/specific/videoPlayer/VideoPlayer";

import AddFolderIcon from "@/assets/global/AddFolderIcon";
import BookmarkIcon from "@/assets/global/BookmatkIcon";
import TimeIcon from "@/assets/global/TimeIcon";
import imgPlaceholder from "@/assets/global/user.svg";

import { BASE_URL } from "@/utils/Url";

import profilePic from "@/assets/pages/portfolioPage/profile-pic.png";

import "./ViewingModule.scss";

import { secondsToHms, renderEmoji } from "@/utils/Utils";
import { reqShowCourseModal } from "@/store/global/slice/UtilSlice";
import { useEffect } from "react";
const ViewingModule = ({ details, timeLogged = null }) => {
    const dispatch = useDispatch();
    const { userToken } = useSelector((state) => state.auth);
    const { category, title, difficulty, duration, description, youtubeID, _id: classId } = details;

    const [videoSectionDetails, setVideoSectionDetails] = useState();

    const handleAddCourse = useCallback(
        (e) => {
            e.stopPropagation();
            dispatch(reqShowCourseModal(classId));
        },
        [dispatch]
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

    useEffect(() => {
        axios
            .get(`${BASE_URL}/class/one/${classId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then((res) => {
                setVideoSectionDetails(res.data);
            })
            .catch((err) => {
                alert(err);
            });
    }, [classId]);

    return (
        <div className="viewing-module-component">
            <div className="viewing-module-component__header">
                <div className="viewing-module-component__header__left">
                    <div className="likes-wrapper col">
                        <Likes iconColor="#fff" />
                    </div>
                    <div className="difficulty-wrapper col">
                        <Difficulty difficulty={difficulty} iconBg="transparent" iconColor="#f7cf34" />
                    </div>
                    <div className="time-wrapper col"></div>
                </div>
                <div className="viewing-module-component__header__right">
                    <div className="bookmark-wrapper" onClick={handleBookmarkClass}>
                        <BookmarkIcon />
                    </div>
                    <div className="add-wrapper" onClick={handleAddCourse}>
                        <AddFolderIcon />
                    </div>
                    {timeLogged && (
                        <div className="time-logged-section">
                            {/* <Time iconBg="transparent" iconColor="#4389f8" duration={duration} /> */}
                            <TimeIcon iconBg="transparent" iconColor="#4389f8" />
                            <p>Time Logged: &nbsp;</p>
                            <h4>{secondsToHms(timeLogged)}</h4>
                        </div>
                    )}
                </div>
            </div>
            <div
                className="viewing-module-component__video-player"
                // style={{ backgroundImage: `url(${bgImg})` }}
            >
                <VideoPlayer youtubeId={youtubeID} />
            </div>
            <div className="viewing-module-component__video-info">
                <h5 className="category">
                    <span role="img" aria-label="">
                        {renderEmoji(category)}
                    </span>
                    {category}
                </h5>
                <div className="title-author">
                    <h2 className="title">{title}</h2>
                    <div className="author">
                        <div className="author__name">
                            <h2>{videoSectionDetails?.instructor}</h2>
                            <h6>Instructor</h6>
                        </div>
                        <div
                            className="author__image"
                            style={{
                                backgroundImage: `url(${videoSectionDetails?.instructorImage})`,
                                backgroundSize: "cover"
                            }}
                        ></div>
                    </div>
                </div>
                <div className="viewing-module-component__video-info__description">
                    <h3>Description</h3>
                    <p>{description}</p>

                    <div className="added-by">
                        <div className="added-by__name">
                            <h6>Added By</h6>
                            <h4>
                                {videoSectionDetails?.user.first_name} {videoSectionDetails?.user.last_name}
                            </h4>
                        </div>
                        <div
                            className="added-by__image"
                            style={{
                                backgroundImage: `url(${imgPlaceholder})`,
                                backgroundSize: "cover"
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewingModule;
