import React from "react";
import { Icon } from "semantic-ui-react";

import "./5starRating.scss";

const StarRating = ({ rating }) => {
    return (
        <div className="five-star-rating">
            {[1, 2, 3, 4, 5].map((item, i) => {
                return i <= rating ? <Icon name="star" key={i} /> : <Icon name="star outline" key={i} />;
            })}
        </div>
    );
};

export default StarRating;
