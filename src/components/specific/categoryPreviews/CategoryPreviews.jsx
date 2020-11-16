import React, { useState, memo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ClassPreviewCard from "@/components/specific/classPreviewCard/ClassPreviewCard";

import "./CategoryPreviews.scss";
import { convertToUrlString } from "@/utils/Utils";

const CategoryPreviews = ({ categoryTitle = "Enter class Name", mainCategoryTitle }) => {
    const { allClasses } = useSelector((state) => state.class);
    const [variousClasses, setVariousClasses] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);

    const urlString = convertToUrlString(categoryTitle);

    const handleFilterClasses = useCallback(() => {
        const data = allClasses.filter((item) => {
            return item.category === categoryTitle;
        });

        setVariousClasses(data);
        setHasLoaded(true);
    }, [allClasses]);

    useEffect(() => {
        if (allClasses) {
            handleFilterClasses();
        }
    }, [allClasses]);

    if (!hasLoaded) {
        return <h4>Loading...</h4>;
    }
    return (
        <div className="previews-component">
            {variousClasses.slice(0, 9).map((item, index) => {
                return (
                    <div className="preview-card-wrapper" key={index}>
                        <ClassPreviewCard details={item} />
                    </div>
                );
            })}

            <div className="preview-card-wrapper see-all">
                <span role="img" aria-label="">
                    💥
                </span>
                <h1>{categoryTitle}</h1>
                <Link
                    to={{
                        pathname: `/library/categories/${urlString}`,
                        state: { title: categoryTitle, mainCategory: mainCategoryTitle }
                    }}
                >
                    <button>See all classes</button>
                </Link>
            </div>
        </div>
    );
};

export default memo(CategoryPreviews);
