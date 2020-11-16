import React, { memo, useState } from "react";
import { useCallback } from "react";
import { NavLink } from "react-router-dom";

import "./LibrarySidebar.scss";

import { convertToUrlString } from "@/utils/Utils";

const SubLinks = ({ details }) => {
    const [show, setShow] = useState(false);

    const handleOnClick = useCallback(() => {
        setShow(!show);
    }, [show]);

    return (
        <li className={show ? "sub-links show-sub-sub-links" : "sub-links"}>
            <div className="sub-links__title" onClick={handleOnClick}>
                <div className="plus-minus-icon">
                    <span></span>
                    <span></span>
                </div>
                <h1>{details[0]}</h1>
            </div>
            <ul className="sub-links__sub-sub-links">
                {details[1].map((item, index) => {
                    //Create string to be added to url from link title
                    let urlString;
                    //Replace all spaces and all slashes with "-"
                    urlString = convertToUrlString(item);

                    return (
                        <li key={index}>
                            {/* <NavLink to={`/library/categories/${urlString}`}>{item}</NavLink> */}
                            <NavLink
                                to={{
                                    pathname: `/library/categories/${urlString}`,
                                    state: { title: item, mainCategory: details[0] }
                                }}
                            >
                                {item}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </li>
    );
};

export default memo(SubLinks);
