import React, { memo } from "react";

const AdvancedIcon = ({ type = "filled-box", circleColor = "#e63146", circleBgColor = "rgba(230, 49, 70, 0.15)" }) => {
    const renderIcon = () => {
        switch (type) {
            case "filled-box":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
                        <g id="Group_10286" data-name="Group 10286" transform="translate(-714 -278)">
                            <rect
                                id="Rectangle_7244"
                                data-name="Rectangle 7244"
                                width="21"
                                height="21"
                                rx="5"
                                transform="translate(714 278)"
                                fill="#e63146"
                            />
                            <g id="Group_10293" data-name="Group 10293">
                                <path
                                    id="Path_16366"
                                    data-name="Path 16366"
                                    d="M0,0V6"
                                    transform="translate(721 288)"
                                    fill="none"
                                    stroke="#fff"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                />
                                <path
                                    id="Path_16365"
                                    data-name="Path 16365"
                                    d="M0,0V8"
                                    transform="translate(725 286)"
                                    fill="none"
                                    stroke="#fff"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                />
                                <path
                                    id="Path_16367"
                                    data-name="Path 16367"
                                    d="M0,0V10"
                                    transform="translate(729 284)"
                                    fill="none"
                                    stroke="#fff"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                />
                            </g>
                        </g>
                    </svg>
                );
            case "circle":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                        <g id="Group_11642" data-name="Group 11642" transform="translate(-511 -1465)">
                            <circle
                                id="Ellipse_1486"
                                data-name="Ellipse 1486"
                                cx="25"
                                cy="25"
                                r="25"
                                transform="translate(511 1465)"
                                fill={circleBgColor}
                            />
                            <g id="Group_11643" data-name="Group 11643">
                                <line
                                    id="Line_1251"
                                    data-name="Line 1251"
                                    y1="5.6"
                                    transform="translate(528 1491.493)"
                                    fill="none"
                                    stroke={circleColor}
                                    strokeLinecap="round"
                                    strokeWidth="4"
                                />
                                <line
                                    id="Line_1252"
                                    data-name="Line 1252"
                                    y1="9.8"
                                    transform="translate(535 1487.293)"
                                    fill="none"
                                    stroke={circleColor}
                                    strokeLinecap="round"
                                    strokeWidth="4"
                                />
                                <line
                                    id="Line_1253"
                                    data-name="Line 1253"
                                    y1="14"
                                    transform="translate(542 1483.093)"
                                    fill="none"
                                    stroke={circleColor}
                                    strokeLinecap="round"
                                    strokeWidth="4"
                                />
                            </g>
                        </g>
                    </svg>
                );
            default:
                return null;
        }
    };
    return <>{renderIcon()}</>;
};

export default memo(AdvancedIcon);
