import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import LibrarySidebar from "@/components/specific/librarySidebar/LibrarySidebar";
import FilterSidebar from "@/components/specific/filterSidebar/FilterSidebar";
import Advert2 from "@/components/specific/advert2/Advert2";
import SearchFilter from "@/components/specific/searchFilter/SearchFilter";
import Button from "@/components/conventional/button/Button";
import ClassPreviewCard from "@/components/specific/classPreviewCard/ClassPreviewCard";
import CoursePreviewCard from "@/components/specific/coursePreviewCard/CoursePreviewCard";
import useSearchAndFilter from "@/components/conventional/customHooks/useSearchAndFilter";

import { BASE_URL } from "@/utils/Url";
import { updateSavedVideos } from "@/store/global/slice/UtilSlice";

import "./SavedPage.scss";

const SavedPage = () => {
    //----------------------------------------------------------------------------
    //Helpers
    //----------------------------------------------------------------------------
    const dispatch = useDispatch();
    const { userToken } = useSelector((state) => state.auth);
    const { savedVideos } = useSelector((state) => state.utils);

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
    } = useSearchAndFilter(savedVideos, false);

    //----------------------------------------------------------------------------
    //Get all saved videos
    //----------------------------------------------------------------------------
    useEffect(() => {
        axios
            .get(`${BASE_URL}/library/saved`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then((res) => {
                dispatch(updateSavedVideos(res.data));
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
                    <div id="saved-page">
                        <div className="saved-page">
                            <div className="saved-page__header">
                                <h1>Saved</h1>

                                <Link to="/library/saved/my-courses">
                                    <Button variant="double-blue">My Courses</Button>
                                </Link>
                            </div>
                            <div className="saved-page__content">
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
                                            {displayedVideos.slice(0, 12).map((item) => {
                                                //If the video has a class count then it is a course
                                                if (item.classCount !== undefined) {
                                                    return <CoursePreviewCard details={item} />;
                                                } else {
                                                    return <ClassPreviewCard details={item} />;
                                                }
                                            })}
                                        </div>
                                        <div className="advert-wrapper">
                                            <Advert2 />
                                        </div>
                                        <div className="group">
                                            {displayedVideos.slice(12).map((item) => {
                                                //If the video has a class count then it is a course
                                                if (item.classCount !== undefined) {
                                                    return <CoursePreviewCard details={item} />;
                                                } else {
                                                    return <ClassPreviewCard details={item} />;
                                                }
                                            })}
                                        </div>
                                    </>
                                ) : (
                                    <h2 style={{ marginLeft: "70px" }}>You haven't saved any classes yet</h2>
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

export default SavedPage;
