import React, { memo } from "react";

const BeginnerIcon = ({ type = "filled-box", circleColor = "#29c677", circleBgColor = "rgba(41, 198, 119, 0.15)" }) => {
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
                                fill="#29c677"
                            />
                            <g id="Group_10214" data-name="Group 10214" transform="translate(721 284)">
                                <path
                                    id="Path_16366"
                                    data-name="Path 16366"
                                    d="M0,0V6"
                                    transform="translate(0 4)"
                                    fill="none"
                                    stroke="#fff"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                />
                                <path
                                    id="Path_16365"
                                    data-name="Path 16365"
                                    d="M0,0V8"
                                    transform="translate(4 2)"
                                    fill="none"
                                    stroke="#fff"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                    opacity="0.35"
                                />
                                <path
                                    id="Path_16367"
                                    data-name="Path 16367"
                                    d="M0,0V10"
                                    transform="translate(8)"
                                    fill="none"
                                    stroke="#fff"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                    opacity="0.35"
                                />
                            </g>
                        </g>
                    </svg>
                );
            case "circle":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                        <g id="Group_11636" data-name="Group 11636" transform="translate(-511 -1465)">
                            <circle
                                id="Ellipse_1486"
                                data-name="Ellipse 1486"
                                cx="25"
                                cy="25"
                                r="25"
                                transform="translate(511 1465)"
                                fill={circleBgColor}
                            />
                            <g id="Group_11633" data-name="Group 11633" transform="translate(528 1483.093)">
                                <line
                                    id="Line_1251"
                                    data-name="Line 1251"
                                    y1="5.6"
                                    transform="translate(0 8.4)"
                                    fill="none"
                                    stroke={circleColor}
                                    strokeLinecap="round"
                                    strokeWidth="4"
                                />
                                <line
                                    id="Line_1252"
                                    data-name="Line 1252"
                                    y1="9.8"
                                    transform="translate(7 4.2)"
                                    fill="none"
                                    stroke={circleColor}
                                    strokeLinecap="round"
                                    strokeWidth="4"
                                    opacity="0.25"
                                />
                                <line
                                    id="Line_1253"
                                    data-name="Line 1253"
                                    y1="14"
                                    transform="translate(14)"
                                    fill="none"
                                    stroke={circleColor}
                                    strokeLinecap="round"
                                    strokeWidth="4"
                                    opacity="0.25"
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

export default memo(BeginnerIcon);
