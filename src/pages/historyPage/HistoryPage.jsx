import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import LibrarySidebar from "@/components/specific/librarySidebar/LibrarySidebar";
import FilterSidebar from "@/components/specific/filterSidebar/FilterSidebar";
import ClassPreviewCard from "@/components/specific/classPreviewCard/ClassPreviewCard";
import Advert2 from "@/components/specific/advert2/Advert2";
import SearchFilter from "@/components/specific/searchFilter/SearchFilter";
import useSearchAndFilter from "@/components/conventional/customHooks/useSearchAndFilter";

import { updateWatchedClasses } from "@/store/global/slice/ClassSlice";
import { BASE_URL } from "@/utils/Url";

import "./HistoryPage.scss";

const HistoryPage = () => {
    //----------------------------------------------------------------------------
    //Helpers
    //----------------------------------------------------------------------------
    const { userToken } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { watchedClasses } = useSelector((state) => state.class); //Has all classes from database
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
    } = useSearchAndFilter(watchedClasses, true);

    //----------------------------------------------------------------------------
    //Get all watched classes. This request has been made elsewhere in the app. Neveertheless its response can change easily hence we make the request here again, so as to get the most recent response
    //----------------------------------------------------------------------------
    useEffect(() => {
        // const alexToken =
        // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNodWFpYnVhbGV4YW5kZXJAZ21haWwuY29tIiwibmFtZSI6InNodWFpYnUiLCJpZCI6Ilg5V3IzNEtYUDgiLCJpYXQiOjE2MDI5Nzc3NzAsImV4cCI6MTYzNDUxMzc3MH0.j8MtHC7Do5Au9b47NiczK1SkVtOfezO1hT9NdFDmlbs";

        //Get all watched
        axios
            .get(`${BASE_URL}/watch/allwithclass`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then((res) => {
                dispatch(updateWatchedClasses(res.data));
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
                    <div id="history-page">
                        <div className="history-page">
                            <div className="history-page__header">
                                <h1>History</h1>
                            </div>
                            <div className="history-page__content">
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
                                            {displayedVideos.map((item, index) => {
                                                return item.class ? (
                                                    <ClassPreviewCard
                                                        details={item.class}
                                                        watchedDetails={item}
                                                        key={index}
                                                    />
                                                ) : null;
                                            })}
                                        </div>
                                        <div className="advert-wrapper" style={{ marginBottom: "0px" }}>
                                            <Advert2 />
                                        </div>
                                    </>
                                ) : (
                                    <h2 style={{ marginLeft: "70px" }}>You haven't watched any classes yet</h2>
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

export default HistoryPage;
