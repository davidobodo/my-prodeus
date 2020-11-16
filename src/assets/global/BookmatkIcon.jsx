import React, { memo } from "react";

const BookmarkIcon = ({ color = "#e63146", bgColor = "#e63146", opacity = "0.15" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34">
            <g id="Group_11695" data-name="Group 11695" transform="translate(-227 -622.953)">
                <path
                    id="Path_17027"
                    data-name="Path 17027"
                    d="M17,0A17,17,0,1,1,0,17,17,17,0,0,1,17,0Z"
                    transform="translate(227 622.953)"
                    fill={bgColor}
                    opacity={opacity}
                />
                <g id="Group_6084" data-name="Group 6084" transform="translate(239 633.953)">
                    <g id="bookmark-black-shape" transform="translate(0 0)">
                        <path
                            id="Path_14161"
                            data-name="Path 14161"
                            d="M43.095.4a.882.882,0,0,0-.41-.325A.853.853,0,0,0,42.342,0H34.166a.852.852,0,0,0-.343.071.881.881,0,0,0-.41.325.849.849,0,0,0-.152.491V11.1a.85.85,0,0,0,.152.491.881.881,0,0,0,.41.325.852.852,0,0,0,.343.071.923.923,0,0,0,.648-.261l3.44-3.358,3.44,3.358a.921.921,0,0,0,.647.253.867.867,0,0,0,.343-.063.881.881,0,0,0,.41-.325.849.849,0,0,0,.152-.491V.887A.85.85,0,0,0,43.095.4Z"
                            transform="translate(-33.261)"
                            fill={color}
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default memo(BookmarkIcon);
