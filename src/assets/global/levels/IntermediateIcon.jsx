import React, { memo } from "react";

const IntermediateIcon = ({
    type = "filled-box",
    iconBg,
    iconColor = "#fff",
    opacity = "0.35",
    circleColor = "#f7cf34",
    circleBgColor = "rgba(247, 207, 52, 0.15)"
}) => {
    const renderIcon = () => {
        switch (type) {
            case "filled-box":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <g id="Group_11848" data-name="Group 11848" transform="translate(-464 -523.25)">
                            {iconBg === "transparent" ? (
                                ""
                            ) : (
                                <g id="Group_11843" data-name="Group 11843">
                                    <g id="Group_11842" data-name="Group 11842">
                                        <rect
                                            id="Rectangle_8127"
                                            data-name="Rectangle 8127"
                                            width="24"
                                            height="24"
                                            rx="5"
                                            transform="translate(464 523.25)"
                                            fill="#f7cf34"
                                        />
                                    </g>
                                </g>
                            )}

                            <g id="Group_11846" data-name="Group 11846">
                                <g id="Group_11845" data-name="Group 11845">
                                    <g id="Group_11844" data-name="Group 11844">
                                        <g
                                            id="Group_11081"
                                            data-name="Group 11081"
                                            transform="translate(472.615 530.886)"
                                        >
                                            <path
                                                id="Path_16815"
                                                data-name="Path 16815"
                                                d="M0,0V6"
                                                transform="translate(0 4)"
                                                fill="none"
                                                stroke={iconColor}
                                                strokeLinecap="round"
                                                strokeWidth="2"
                                            />
                                            <path
                                                id="Path_16816"
                                                data-name="Path 16816"
                                                d="M0,0V8"
                                                transform="translate(4 2)"
                                                fill="none"
                                                stroke={iconColor}
                                                strokeLinecap="round"
                                                strokeWidth="2"
                                            />
                                            <path
                                                id="Path_16817"
                                                data-name="Path 16817"
                                                d="M0,0V10"
                                                transform="translate(8)"
                                                fill="none"
                                                stroke={iconColor}
                                                strokeLinecap="round"
                                                strokeWidth="2"
                                                opacity={opacity}
                                            />
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                );
            case "circle":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                        <g id="Group_11850" data-name="Group 11850" transform="translate(-511 -1465)">
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

export default memo(IntermediateIcon);
