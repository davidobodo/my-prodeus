import React, { memo } from "react";

import LikesIcon from "@/assets/global/LikesIcon";

import "./Likes.scss";

const Likes = ({ iconColor, value = "9.8", bgColor, color }) => {
    return (
        <div className="likes-component" style={{ backgroundColor: bgColor, color }}>
            <LikesIcon iconColor={iconColor} />
            {value}
        </div>
    );
};

export default memo(Likes);
