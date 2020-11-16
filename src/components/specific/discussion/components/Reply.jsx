import React from "react";
import profilePic from "@/assets/pages/portfolioPage/profile-pic.png";
import "../Discussion.scss";
import Moment from "react-moment";

const Reply = ({ details }) => {
    const { user, _updated_at, comment } = details;
    return (
        <div className="reply">
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
                        {" "}
                        <Moment local format="HH:mm">
                            {_updated_at}
                        </Moment>
                    </span>
                </h5>
                <p>{comment}</p>
            </div>
        </div>
    );
};

export default Reply;
