import React, { useCallback, useState } from "react";
import Moment from "react-moment";

import replyIcon from "@/assets/global/reply.svg";
import profilePic from "@/assets/pages/portfolioPage/profile-pic.png";

import Reply from "./Reply";

import "../Discussion.scss";

const Comment = ({ handleComment, details }) => {
    const { user, _updated_at, replies, content, _id: discId } = details;
    const [showReplies, setShowReplies] = useState(false);

    const handleShowReplies = useCallback(() => {
        setShowReplies(!showReplies);
    }, [showReplies]);

    return (
        <div className="post">
            <div
                className="img-wrapper"
                style={{
                    backgroundImage: `url(${profilePic})`,
                    backgroundSize: "cover"
                }}
            ></div>
            <div className="post-details">
                <h5 className="title">
                    <span className="blue">
                        {user.first_name} {user.last_name}
                    </span>{" "}
                    <span className="time">
                        <Moment local format="HH:mm">
                            {_updated_at}
                        </Moment>
                    </span>
                </h5>
                <p>{content}</p>
                <h5 className="btn-reply" onClick={() => handleComment(discId)}>
                    Reply
                </h5>
                {replies.length !== 0 && (
                    <h5 className="expand-reply" onClick={handleShowReplies}>
                        {showReplies ? (
                            <>Close {replies.length === 1 ? "Reply" : "Replies"}</>
                        ) : (
                            <>
                                <img src={replyIcon} alt="" />
                                &nbsp; {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
                            </>
                        )}
                    </h5>
                )}

                {showReplies && (
                    <div className="replies-wrapper">
                        {replies.length !== 0 &&
                            replies.map((item, i) => {
                                return <Reply key={i} details={item} />;
                            })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comment;
