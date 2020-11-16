import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import LibrarySidebar from "@/components/specific/librarySidebar/LibrarySidebar";
import FilterSidebar from "@/components/specific/filterSidebar/FilterSidebar";
import ClassPreviewCard from "@/components/specific/classPreviewCard/ClassPreviewCard";
import Advert2 from "@/components/specific/advert2/Advert2";
import SearchFilter from "@/components/specific/searchFilter/SearchFilter";
import SiteLoadingPlaceholder from "@/components/specific/siteLoadingPlaceholder/SiteLoadingPlaceholder";

import "./AddMoreClasses.scss";

const AddMoreClasses = () => {
    //----------------------------------------------------------------------------
    //Helpers
    //----------------------------------------------------------------------------
    const { allClasses } = useSelector((state) => state.class);

    //----------------------------------------------------------------------------
    //State
    //----------------------------------------------------------------------------
    const [displayedVideos, setDisplayedVideos] = useState([]); // Has videos fetched and after applying filter as the case may be
    const [showFilterSidebar, setShowFilterSidebar] = useState(false);

    //----------------------------------------------------------------------------
    //Helper Functions
    //----------------------------------------------------------------------------
    const handleShowFilterSidebar = useCallback(() => {
        setShowFilterSidebar(!showFilterSidebar);
    }, [showFilterSidebar]);

    const handleApplyFilter = useCallback((values) => {
        setDisplayedVideos(values);
    }, []);

    // ----------------------------------------------------------------------------
    // UseEffects
    // ----------------------------------------------------------------------------
    useEffect(() => {
        setDisplayedVideos(allClasses);
    }, [allClasses]);

    return (
        <div className="add-more-classes-component">
            {displayedVideos && displayedVideos.length !== 0 ? (
                <div className="add-more-classes-component__content">
                    <div className="search-filter-wrapper">
                        <SearchFilter handleShowFilterSidebar={handleShowFilterSidebar} />
                    </div>
                    <div className="group">
                        {displayedVideos.slice(0, 12).map((item, index) => {
                            return <ClassPreviewCard key={index} details={item} />;
                        })}
                    </div>

                    <div className="group">
                        {displayedVideos.slice(12).map((item, index) => {
                            return <ClassPreviewCard key={index} details={item} />;
                        })}
                    </div>
                </div>
            ) : (
                <h2 style={{ marginLeft: "70px" }}>Fetching videos...</h2>
            )}

            {showFilterSidebar && (
                <FilterSidebar
                    handleShowFilterSidebar={handleShowFilterSidebar}
                    videoList={allClasses}
                    handleApplyFilter={handleApplyFilter}
                />
            )}
        </div>
    );
};

export default AddMoreClasses;
