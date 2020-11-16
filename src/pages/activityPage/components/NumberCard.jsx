import React from "react";

import "../ActivityPage.scss";

const NumberCard = ({ img, number, label, color }) => {
    return (
        <div className="number-card-component">
            <div className="number-card-component__icon-wrapper">
                <img src={img} alt="" />
            </div>
            <div className="number-card-component__info">
                <h1 style={{ color: `${color}` }}>{number}</h1>
                <h2>{label}</h2>
            </div>
        </div>
    );
};

export default NumberCard;
