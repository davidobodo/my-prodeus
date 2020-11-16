import React, { useState, memo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CoursePreviewCard from "@/components/specific/coursePreviewCard/CoursePreviewCard";

import "./CoursePreviews.scss";
import { convertToUrlString } from "@/utils/Utils";

const CoursePreviews = ({ categoryTitle = "Enter class Name" }) => {
    const { allCourses } = useSelector((state) => state.course);
    const [variousCourses, setVariousCourses] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);

    const urlString = convertToUrlString(categoryTitle);

    const handleFilterCourses = useCallback(() => {
        const data = allCourses.filter((item) => {
            return item.category === categoryTitle;
        });

        setVariousCourses(data);
        setHasLoaded(true);
    }, [allCourses]);

    useEffect(() => {
        if (allCourses) {
            handleFilterCourses();
        }
    }, [allCourses]);

    if (!hasLoaded) {
        return <h4>Loading...</h4>;
    }
    return (
        <div className="previews-component">
            {variousCourses.slice(0, 9).map((item, index) => {
                return (
                    <div className="preview-card-wrapper" key={index}>
                        <CoursePreviewCard details={item} />
                    </div>
                );
            })}

            <div className="preview-card-wrapper add-more">
                <Link to="/library-add-class">
                    <span onClick={() => console.log("Here")} className="plus-icon">
                        <span></span>
                        <span></span>
                    </span>
                </Link>
                <h2>
                    Add More <br /> Classes
                </h2>
            </div>
        </div>
    );
};

export default memo(CoursePreviews);
