import React from "react";

import siteLogo from "@/assets/global/logo-full.svg";

import "./SiteLoadingPlaceholder.scss";
const SiteLoadingPlaceholder = ({ label = "Loading..." }) => {
    return (
        <div className="site-loader-component">
            <div className="site-loader-component__inner">
                <img src={siteLogo} alt="" />
                {/* <p>{label}</p> */}
            </div>
        </div>
    );
};

export default SiteLoadingPlaceholder;
