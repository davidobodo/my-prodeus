import React, { useState, useCallback } from "react";
import { Accordion } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";

import LibrarySidebar from "@/components/specific/librarySidebar/LibrarySidebar";
import SectionCard from "./components/SectionsCard";

import arrowIcon from "@/assets/pages/categoriesPage/arrow.svg";

import "./CategoriesPage.scss";

import { CATEGORIES } from "@/utils/Constants";

const Page = () => {
    const { favCategories } = useSelector((state) => state.auth.user);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = useCallback(
        (e, titleProps) => {
            const { index } = titleProps;
            const newIndex = activeIndex === index ? -1 : index;
            setActiveIndex(newIndex);
        },
        [activeIndex]
    );

    return (
        <div className="library-section-wrapper">
            <div className="library-section-wrapper__left-column">
                <LibrarySidebar />
                <div className="library-section-wrapper__left-column__content">
                    <div id="categories-page">
                        <div className="categories-page">
                            <Accordion>
                                {/* My Categories */}
                                <Accordion.Title active={activeIndex === 0} index={0} onClick={handleClick}>
                                    <span className="icon-wrapper">
                                        <img src={arrowIcon} alt="" />
                                    </span>
                                    <h1>My Categories</h1>
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === 0}>
                                    <div className="section-wrapper">
                                        {favCategories.map((item, i) => {
                                            const { name, category } = item;
                                            return (
                                                <div key={i} className="section-card-wrapper">
                                                    <SectionCard title={name} mainCategory={category} />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </Accordion.Content>

                                {/* All Categories */}
                                {Object.entries(CATEGORIES).map((item, i) => {
                                    return (
                                        <React.Fragment key={i}>
                                            <Accordion.Title
                                                active={activeIndex === i + 1}
                                                index={i + 1}
                                                onClick={handleClick}
                                            >
                                                <span className="icon-wrapper">
                                                    <img src={arrowIcon} alt="" />
                                                </span>
                                                <h1>{item[0]}</h1>
                                            </Accordion.Title>
                                            <Accordion.Content active={activeIndex === i + 1}>
                                                <div className="section-wrapper">
                                                    {item[1].map((title, i) => {
                                                        return (
                                                            <div key={i} className="section-card-wrapper">
                                                                <SectionCard title={title} mainCategory={item[0]} />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </Accordion.Content>
                                        </React.Fragment>
                                    );
                                })}
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
