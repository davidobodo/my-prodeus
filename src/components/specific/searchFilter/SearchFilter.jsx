import React, { memo } from "react";

import searchIcon from "@/assets/global/search.svg";
import filterIcon from "@/assets/global/filter.svg";

import "./SearchFilter.scss";

const SearchFilter = ({ handleShowFilterSidebar, value, handleChange }) => {
    return (
        <div className="search-filter-component">
            <img src={searchIcon} alt="search" />
            <input
                type="text"
                placeholder="Search by instructor, keyword or topic"
                value={value}
                onChange={handleChange}
            />
            <img src={filterIcon} alt="filter" onClick={handleShowFilterSidebar} style={{ cursor: "pointer" }} />
        </div>
    );
};

export default memo(SearchFilter);
