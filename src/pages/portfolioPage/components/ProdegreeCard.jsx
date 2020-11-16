import React, { memo, useRef, useEffect, useState } from "react";

import classesIcon from "@/assets/pages/portfolioPage/classes.svg";
import creditsIcon from "@/assets/pages/portfolioPage/credits.svg";
import hoursIcon from "@/assets/pages/portfolioPage/hours.svg";

import "../PortfolioPage.scss";
import { getUniqueCategoriesAndTheirTotalTimeWatched, renderEmoji } from "@/utils/Utils";

const ProdegreesCard = ({ details }) => {
    const { title, degreeType, totalHoursWatched, categories, obtainedCredits } = details;
    const [groupedCategories, setGroupedCategories] = useState([]);

    useEffect(() => {
        const data = getUniqueCategoriesAndTheirTotalTimeWatched(categories);
        setGroupedCategories(data);
    }, []);

    return (
        <div className="prodegree__details">
            <div className="prodegree__details__left-column">
                <div className="top">
                    {degreeType !== "No Credits" && <h2 className="level">{degreeType}</h2>}
                    <h1 className="degree">{title}</h1>
                    <p className="time">(c. 2016)</p>
                </div>
                <div className="bottom">
                    <div>
                        <img src={hoursIcon} alt="" />
                        <h1>{totalHoursWatched.toFixed(1)}</h1>
                        <h6>Hours</h6>
                    </div>
                    <div>
                        <img src={classesIcon} alt="" />
                        <h1>{categories.length}</h1>
                        <h6>Classes</h6>
                    </div>
                    <div>
                        <img src={creditsIcon} alt="" />
                        <h1>{obtainedCredits}</h1>
                        <h6>Credits</h6>
                    </div>
                </div>
            </div>
            <div className="prodegree__details__right-column">
                {groupedCategories.map((item, i) => {
                    const { title, hms } = item;
                    return (
                        <div key={i} className="module">
                            <h3>
                                <span role="img" aria-label="">
                                    {renderEmoji(title)}
                                </span>
                                {title}
                            </h3>
                            <h3 className="blue">{hms}</h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default memo(ProdegreesCard);
