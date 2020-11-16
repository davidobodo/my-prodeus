import React from "react";

const ArrowIcon = ({ color = "#b4b4c9" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="12.7" height="7.461" viewBox="0 0 12.7 7.461">
            <g id="left-arrow-2" transform="translate(12.7) rotate(90)">
                <g id="Group_6691" data-name="Group 6691">
                    <path
                        id="Path_13742"
                        data-name="Path 13742"
                        d="M2.507,6.352,7.258,1.6a.7.7,0,0,0,0-.982L6.842.2a.7.7,0,0,0-.982,0L.2,5.86a.7.7,0,0,0,0,.986L5.854,12.5a.7.7,0,0,0,.983,0l.416-.416a.7.7,0,0,0,0-.982Z"
                        fill={color}
                    />
                </g>
            </g>
        </svg>
    );
};

export default ArrowIcon;
