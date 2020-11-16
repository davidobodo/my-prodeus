import React from "react";
import adv from "@/assets/pages/discoverPage/adv.png";

import "./Advert2.scss";

const Advert2 = () => {
    return (
        <div className="my-custom-advert-two">
            <div style={{ backgroundImage: `url(${adv})` }} className="my-advert-img"></div>
        </div>
    );
};

export default Advert2;
