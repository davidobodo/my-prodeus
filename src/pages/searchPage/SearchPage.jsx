import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import LibrarySidebar from "@/components/specific/librarySidebar/LibrarySidebar";
import FilterSidebar from "@/components/specific/filterSidebar/FilterSidebar";
import ClassPreviewCard from "@/components/specific/classPreviewCard/ClassPreviewCard";
import Advert2 from "@/components/specific/advert2/Advert2";
import SearchFilter from "@/components/specific/searchFilter/SearchFilter";
import SiteLoadingPlaceholder from "@/components/specific/siteLoadingPlaceholder/SiteLoadingPlaceholder";
import useSearchAndFilter from "@/components/conventional/customHooks/useSearchAndFilter";

import "./SearchPage.scss";
import { showSuccessToast } from "@/utils/Utils";

const SearchPage = () => {
    //----------------------------------------------------------------------------
    //Helpers
    //----------------------------------------------------------------------------
    const { allClasses } = useSelector((state) => state.class);
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
    } = useSearchAndFilter(allClasses, true);

    useState(() => {
        showSuccessToast(
            "We nee to consider List virtualization for this page, cause even if i lazy load the items on this page. It would still not have any substantial effect on the page. "
        );
    }, []);

    return (
        <div className={showFilterSidebar ? "library-section-wrapper show-filter-sidebar" : "library-section-wrapper"}>
            <div className="library-section-wrapper__left-column">
                <LibrarySidebar />
                <div className="library-section-wrapper__left-column__content">
                    <div id="search-page">
                        <div className="search-page">
                            {displayedVideos && displayedVideos.length !== 0 ? (
                                <div className="search-page__content">
                                    <div className="search-filter-wrapper">
                                        <SearchFilter
                                            handleShowFilterSidebar={handleShowFilterSidebar}
                                            value={searchValue}
                                            handleChange={handleSetSearchValue}
                                        />
                                    </div>
                                    <div className="group">
                                        {displayedVideos.slice(0, 12).map((item, index) => {
                                            return <ClassPreviewCard key={index} details={item} />;
                                        })}
                                    </div>
                                    <div className="advert-wrapper">
                                        <Advert2 />
                                    </div>
                                    <div className="group">
                                        {displayedVideos.slice(12).map((item, index) => {
                                            return <ClassPreviewCard key={index} details={item} />;
                                        })}
                                    </div>
                                    <div className="advert-wrapper" style={{ marginBottom: "0px" }}>
                                        <Advert2 />
                                    </div>
                                </div>
                            ) : (
                                <h2 style={{ marginLeft: "70px" }}>Fetching videos...</h2>
                            )}
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

export default SearchPage;
