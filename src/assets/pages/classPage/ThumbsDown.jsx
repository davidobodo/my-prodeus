import React, { memo } from "react";

const Icon = ({ color = "#b4b4c9" }) => {
    return (
        <svg
            id="Group_10348"
            data-name="Group 10348"
            xmlns="http://www.w3.org/2000/svg"
            width="18.125"
            height="16.875"
            viewBox="0 0 18.125 16.875"
        >
            <path
                id="Path_16390"
                data-name="Path 16390"
                d="M224.813,32.875h2.812V36a1.875,1.875,0,1,0,3.751,0V34.246a2.177,2.177,0,0,1,1.544-2.091l1.581-.486V21.938c0-.025,0-.049,0-.074A2.948,2.948,0,0,0,232.417,21h-7.6A2.812,2.812,0,0,0,222,23.813v6.25A2.812,2.812,0,0,0,224.813,32.875Z"
                transform="translate(-222 -21)"
                fill={color}
            />
            <path
                id="Path_16391"
                data-name="Path 16391"
                d="M452.938,21h1.875a.938.938,0,0,1,.938.938v10a.938.938,0,0,1-.937.938h-1.875a.938.938,0,0,1-.937-.937v-10A.938.938,0,0,1,452.938,21Z"
                transform="translate(-437.625 -21)"
                fill={color}
            />
        </svg>
    );
};

export default memo(Icon);
