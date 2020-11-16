import React, { memo } from "react";

const LikesIcon = ({ iconColor }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="12.104" height="11.269" viewBox="0 0 12.104 11.269">
            <g id="Group_11242" data-name="Group 11242" transform="translate(0 0)">
                <path
                    id="Path_16905"
                    data-name="Path 16905"
                    d="M96.441,224.339H94.563v-2.087a1.252,1.252,0,0,0-2.5,0v1.171a1.453,1.453,0,0,1-1.031,1.4l-1.056.325v6.5c0,.017,0,.033,0,.049a1.969,1.969,0,0,0,1.392.577h5.078a1.878,1.878,0,0,0,1.878-1.878v-4.174A1.878,1.878,0,0,0,96.441,224.339Z"
                    transform="translate(-86.215 -221)"
                    fill={iconColor}
                />
                <path
                    id="Path_16906"
                    data-name="Path 16906"
                    d="M1.878,308.93H.626A.626.626,0,0,1,0,308.3v-6.678A.626.626,0,0,1,.626,301H1.878a.626.626,0,0,1,.626.626V308.3A.626.626,0,0,1,1.878,308.93Z"
                    transform="translate(0 -297.661)"
                    fill={iconColor}
                />
            </g>
        </svg>
    );
};

export default memo(LikesIcon);
