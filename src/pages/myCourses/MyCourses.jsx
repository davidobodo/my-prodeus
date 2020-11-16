import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import LibrarySidebar from "@/components/specific/librarySidebar/LibrarySidebar";
import FilterSidebar from "@/components/specific/filterSidebar/FilterSidebar";
import CoursePreviewCard from "@/components/specific/coursePreviewCard/CoursePreviewCard";
import SiteLoadingPlaceholder from "@/components/specific/siteLoadingPlaceholder/SiteLoadingPlaceholder";

import Advert from "@/components/specific/advert/Advert";
import Advert2 from "@/components/specific/advert2/Advert2";
import SearchFilter from "@/components/specific/searchFilter/SearchFilter";
import useSearchAndFilter from "@/components/conventional/customHooks/useSearchAndFilter";

import { BASE_URL } from "@/utils/Url";
import { updateCreatedCourses } from "@/store/global/slice/CourseSlice";

import "./MyCourses.scss";

const MyCourses = () => {
    //----------------------------------------------------------------------------
    //Helpers
    //----------------------------------------------------------------------------
    const dispatch = useDispatch();
    const { userToken } = useSelector((state) => state.auth);
    const { createdCourses } = useSelector((state) => state.course);
    const {
        showFilterSidebar,
        handleShowFilterSidebar,
        searchValue,
        handleSetSearchValue,
        displayedVideos,
        filters,
        sortBy,
        handleSetFilters,
        handleSortBy,
        handleApplyFilters,
        handleClearFilters
    } = useSearchAndFilter(createdCourses, false);

    //----------------------------------------------------------------------------
    //Use Effects
    //----------------------------------------------------------------------------
    useEffect(() => {
        axios
            .get(`${BASE_URL}/course/created`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then((res) => {
                dispatch(updateCreatedCourses(res.data));
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    return (
        <div className={showFilterSidebar ? "library-section-wrapper show-filter-sidebar" : "library-section-wrapper"}>
            <div className="library-section-wrapper__left-column">
                <LibrarySidebar />
                <div className="library-section-wrapper__left-column__content">
                    <div id="my-courses-page">
                        <div className="my-courses-page">
                            <div className="my-courses-page__header">
                                <h1>My Courses</h1>
                            </div>
                            <div className="my-courses-page__content">
                                <div className="search-filter-wrapper">
                                    <SearchFilter
                                        handleShowFilterSidebar={handleShowFilterSidebar}
                                        value={searchValue}
                                        handleChange={handleSetSearchValue}
                                    />
                                </div>
                                {displayedVideos.length !== 0 ? (
                                    <>
                                        <div className="group">
                                            {displayedVideos.slice(0, 6).map((item, i) => {
                                                return <CoursePreviewCard details={item} key={i} />;
                                            })}
                                        </div>
                                        <div className="advert-wrapper">
                                            <Advert />
                                        </div>
                                        <div className="group">
                                            {displayedVideos.slice(6).map((item, i) => {
                                                return <CoursePreviewCard details={item} key={i} />;
                                            })}
                                        </div>
                                        <div className="advert-wrapper" style={{ marginBottom: "0px" }}>
                                            <Advert2 />
                                        </div>
                                    </>
                                ) : (
                                    <h2 style={{ marginLeft: "70px" }}>You haven't saved any courses yet</h2>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="library-section-wrapper__right-column">
                {showFilterSidebar && (
                    <FilterSidebar
                        filters={filters}
                        handleShowFilterSidebar={handleShowFilterSidebar}
                        sortBy={sortBy}
                        handleSetFilters={handleSetFilters}
                        handleSortBy={handleSortBy}
                        handleSaveFilters={handleApplyFilters}
                        handleClearFilters={handleClearFilters}
                    />
                )}
            </div>
        </div>
    );
};

export default MyCourses;
