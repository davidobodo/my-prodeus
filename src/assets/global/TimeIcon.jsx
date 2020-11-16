import React from "react";

const TimeIcon = ({ iconBg, iconColor }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g id="Group_11849" data-name="Group 11849" transform="translate(1753.141 -217.25)">
                {iconBg === "transparent" ? (
                    ""
                ) : (
                    <rect
                        id="Rectangle_8126"
                        data-name="Rectangle 8126"
                        width="24"
                        height="24"
                        rx="5"
                        transform="translate(-1753.141 217.25)"
                        fill="#4389f8"
                    />
                )}

                <path
                    id="Path_16814"
                    data-name="Path 16814"
                    d="M7,0a7,7,0,1,0,7,7A7,7,0,0,0,7,0Zm3.026,8.331H7.058l-.029,0L7,8.331a.484.484,0,0,1-.484-.484V2.905a.484.484,0,0,1,.968,0V7.363h2.542a.484.484,0,0,1,0,.968Z"
                    transform="translate(-1748.141 222.25)"
                    fill={iconColor}
                />
            </g>
        </svg>
    );
};

export default TimeIcon;
