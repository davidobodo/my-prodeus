import React, { memo } from "react";

const Icon = ({ color = "#4389f8" }) => {
    return (
        <svg
            id="Group_10347"
            data-name="Group 10347"
            xmlns="http://www.w3.org/2000/svg"
            width="18.125"
            height="16.875"
            viewBox="0 0 18.125 16.875"
        >
            <path
                id="Path_16388"
                data-name="Path 16388"
                d="M99.659,226H96.847v-3.125a1.875,1.875,0,0,0-3.751,0v1.754a2.177,2.177,0,0,1-1.544,2.091l-1.581.486v9.731c0,.025,0,.049,0,.074a2.948,2.948,0,0,0,2.085.864h7.6a2.812,2.812,0,0,0,2.812-2.812v-6.25A2.812,2.812,0,0,0,99.659,226Z"
                transform="translate(-84.347 -221)"
                fill={color}
            />
            <path
                id="Path_16389"
                data-name="Path 16389"
                d="M2.813,312.875H.938A.938.938,0,0,1,0,311.938v-10A.938.938,0,0,1,.938,301H2.813a.938.938,0,0,1,.938.938v10A.938.938,0,0,1,2.813,312.875Z"
                transform="translate(0 -296)"
                fill={color}
            />
        </svg>
    );
};

export default memo(Icon);
