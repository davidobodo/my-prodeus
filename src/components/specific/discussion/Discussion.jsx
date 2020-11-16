import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import Comment from "./components/Comment";
import profilePic from "@/assets/pages/portfolioPage/profile-pic.png";
import sendIcon from "@/assets/global/send.svg";
import axios from "axios";

import "./Discussion.scss";
import { useEffect } from "react";
import { useCallback } from "react";

import { BASE_URL } from "@/utils/Url";

import { COMMENTS } from "./Constants";

const Discussion = ({ id }) => {
    const { userToken } = useSelector((state) => state.auth);
    const [discussions, setDiscussions] = useState([]);
    const [discussionId, setDiscussionId] = useState("");
    const [isComment, setIsComment] = useState(false);
    const inputRef = useRef(null);

    const handleComment = (discId) => {
        inputRef.current.focus();
        setIsComment(true);
        setDiscussionId(discId);
    };

    const handleSubmitForm = useCallback(
        (e) => {
            e.preventDefault();

            //If isComment is true then we want to add a comment to a discussion, else we want to create a discussion
            if (isComment) {
                const commentDetails = {
                    discussionId: discussionId,
                    comment: inputRef.current.value
                };

                axios
                    .post(`${BASE_URL}/discussion/comment`, commentDetails, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${userToken}`
                        }
                    })
                    .then((res) => {
                        setIsComment(false);
                        getAllDiscussions();
                        inputRef.current.value = "";
                    })
                    .catch((err) => {
                        alert(err);
                    });
            } else {
                const discussionDetails = {
                    classId: id,
                    content: inputRef.current.value
                };

                axios
                    .post(`${BASE_URL}/discussion/add`, discussionDetails, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${userToken}`
                        }
                    })
                    .then((res) => {
                        getAllDiscussions();
                        inputRef.current.value = "";
                    })
                    .catch((err) => {
                        alert(err);
                    });
            }
        },
        [id, inputRef.current, isComment, discussionId]
    );

    const getAllDiscussions = useCallback(() => {
        axios
            .get(`${BASE_URL}/discussion/all/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then((res) => {
                setDiscussions(res.data);
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    useEffect(() => {
        getAllDiscussions();
    }, []);

    return (
        <div className="discussion-component">
            <h2>Discussion</h2>
            <div className="posts-wrapper" style={{ paddingTop: discussions.length === 0 ? "0px" : "10px" }}>
                {discussions.length !== 0 &&
                    discussions.map((item, i) => {
                        return <Comment key={i} handleComment={handleComment} details={item} />;
                    })}
            </div>
            <form className="input-wrapper" noValidate onSubmit={handleSubmitForm}>
                <input type="text" ref={inputRef} />
                <div className="icon-wrapper">
                    <img src={sendIcon} alt="" onClick={handleSubmitForm} />
                </div>
            </form>
        </div>
    );
};

export default Discussion;
