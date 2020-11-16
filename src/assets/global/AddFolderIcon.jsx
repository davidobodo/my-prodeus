import React from "react";

const AddFolderIcon = ({ color = "#6a28e6", bgColor = "#6a28e6", opacity = "0.15" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34">
            <g id="Group_10186" data-name="Group 10186" transform="translate(-227 -622.953)">
                <rect
                    id="Rectangle_7355"
                    data-name="Rectangle 7355"
                    width="34"
                    height="34"
                    rx="17"
                    transform="translate(227 622.953)"
                    fill={bgColor}
                    opacity={opacity}
                />
                <path
                    id="Path_14356"
                    data-name="Path 14356"
                    d="M183.187,3002.728H174.7l-.761-.922a1.179,1.179,0,0,0-.891-.406h-2.723a1.01,1.01,0,0,0-1,1v9.992a1.009,1.009,0,0,0,1,1H183.2a1.009,1.009,0,0,0,1-1v-8.664A1.034,1.034,0,0,0,183.187,3002.728Zm-4.013,5.734h-1.681v1.68a.637.637,0,1,1-1.274,0v-1.68h-1.68a.637.637,0,0,1,0-1.275h1.68v-1.68a.637.637,0,1,1,1.274,0v1.68h1.681a.637.637,0,0,1,0,1.275Z"
                    transform="translate(66.895 -2367.239)"
                    fill={color}
                />
            </g>
        </svg>
    );
};

export default AddFolderIcon;
