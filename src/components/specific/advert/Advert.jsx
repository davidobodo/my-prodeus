import React, { useState } from "react";

import cancel from "@/assets/pages/activityPage/cancelIcon.svg";
import advertPic from "@/assets/pages/activityPage/advertPic.png";

import "./Advert.scss";
const Advert = () => {
    const [showAdvert, setShowAdvert] = useState(true);
    return (
        <>
            {showAdvert ? (
                <div className="my-custom-advert-one">
                    <div className="image" style={{ backgroundImage: `url(${advertPic})` }}></div>
                    <img src={cancel} alt="" className="cancel-icon" onClick={() => setShowAdvert(false)} />
                </div>
            ) : null}
        </>
    );
};

export default Advert;
