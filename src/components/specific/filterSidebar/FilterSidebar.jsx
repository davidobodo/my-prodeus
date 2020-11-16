import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import MultipleSelectionDropdownPlusIcon from "@/components/conventional/dropdown/MultipleSelectionDropdownPlusIcon";
import MultipleSelectionDropdownCheckmark from "@/components/conventional/dropdown/MultipleSelectionDropdownCheckmark";

import cancelIcon from "@/assets/global/cancel-white.svg";
import sortIcon from "@/assets/global/sort-by.svg";
import checkIcon from "@/assets/global/check.svg";

import { TOPICS, DIFFICULTY_OPTIONS } from "@/utils/Constants";
import { categoryDropdownOptions } from "@/utils/Utils";

import "./FilterSidebar.scss";

const FilterSidebar = ({
    filters,
    handleShowFilterSidebar,
    sortBy,
    handleSetFilters,
    handleSortBy,
    handleSaveFilters,
    handleClearFilters
}) => {
    //----------------------------------------------------------------------------
    //Helpers
    //----------------------------------------------------------------------------
    const dispatch = useDispatch();
    const CATEGORY_OPTIONS = categoryDropdownOptions();
    const filterSidebarRef = useRef();

    //----------------------------------------------------------------------------
    //State
    //----------------------------------------------------------------------------
    const [btnShouldStick, setBtnShouldStick] = useState(true); // To position the save and clear button
    const [isSortOpen, setIsSortOpen] = useState(false);

    //----------------------------------------------------------------------------
    //Show or close filter sidebar
    //----------------------------------------------------------------------------
    const toggleVisibility = useCallback(() => {
        handleShowFilterSidebar();
    }, [handleShowFilterSidebar]);

    //----------------------------------------------------------------------------
    //Show or close sorting dropdown
    //----------------------------------------------------------------------------
    const handleDisplaySortingOptions = useCallback(() => {
        setIsSortOpen(!isSortOpen);
    }, [isSortOpen]);

    //----------------------------------------------------------------------------
    //Close filter sidebar on clicking anywhere outside the sidebar
    //----------------------------------------------------------------------------
    const handleClickDocument = useCallback(
        (e) => {
            const target = e.target;
            const filterSidebarElement = filterSidebarRef.current;

            if (target !== filterSidebarElement && !filterSidebarElement.contains(target)) {
                toggleVisibility();
            }
        },
        [toggleVisibility]
    );

    const handleSetSort = (e) => {
        setIsSortOpen(false);
        handleSortBy(e);
    };

    //----------------------------------------------------------------------------
    //On Clicking Save apply all filters
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    //If the window height is less than 864 then the save and clear button should not stick to the buttom of the page by default
    //----------------------------------------------------------------------------
    useEffect(() => {
        if (window.innerHeight < 864) {
            setBtnShouldStick(false);
        }
    });

    //----------------------------------------------------------------------------
    //Try to close teh filter sidebar anytime we click on the document
    //----------------------------------------------------------------------------
    useEffect(() => {
        document.addEventListener("click", handleClickDocument);

        return () => {
            document.removeEventListener("click", handleClickDocument);
        };
    }, [handleClickDocument]);

    const SORT_OPTIONS = ["Newest", "Oldest", "Most Popular", "Highest Rated"];

    return (
        <div className="filter-sidebar-component" ref={filterSidebarRef}>
            <div className="cancel-icon">
                <img src={cancelIcon} alt="x" onClick={toggleVisibility} />
            </div>
            <div className="filter-sidebar-component__header">
                <h1>Filter</h1>
                <div className="filter-sidebar-component__header__right-column">
                    <div className="text">
                        <h6>Sort By</h6>
                        <h2>{sortBy}</h2>
                    </div>
                    <div className="icon-wrapper">
                        <img src={sortIcon} alt="+" onClick={handleDisplaySortingOptions} />
                    </div>
                    <ul
                        className="options"
                        onClick={handleSetSort}
                        style={{ visibility: isSortOpen ? "visible" : "hidden" }}
                    >
                        {SORT_OPTIONS.map((item, i) => {
                            return sortBy === item ? (
                                <li key={i} data-name={item} style={{ color: "#22283a" }}>
                                    {item}
                                    <img src={checkIcon} alt="" />
                                </li>
                            ) : (
                                <li key={i} data-name={item}>
                                    {item}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="filter-sidebar-component__content">
                <div className="dropdown-wrapper">
                    <h6>Categories</h6>
                    <MultipleSelectionDropdownPlusIcon
                        value={filters.categories}
                        options={CATEGORY_OPTIONS}
                        handleChange={(val) => handleSetFilters(val, "categories")}
                        placeholder="Add Category"
                    />
                </div>
                <div className="dropdown-wrapper">
                    <h6>Topics</h6>
                    <MultipleSelectionDropdownPlusIcon
                        value={filters.topics}
                        options={TOPICS}
                        handleChange={(val) => handleSetFilters(val, "topics")}
                        placeholder="Add Topics..."
                    />
                </div>
                <div className="dropdown-wrapper">
                    <h6>Difficulty</h6>
                    <MultipleSelectionDropdownCheckmark
                        value={filters.difficulties}
                        options={DIFFICULTY_OPTIONS}
                        handleChange={(val) => handleSetFilters(val, "difficulties")}
                        placeholder="Select Difficulty"
                    />
                </div>
            </div>
            <div
                className="filter-sidebar-component__btn-wrapper"
                style={{ position: btnShouldStick ? "sticky" : "static", bottom: btnShouldStick ? "30px" : "0px" }}
            >
                <button className="btn-white" onClick={handleSaveFilters}>
                    Save
                </button>
                <button className="btn-transparent" onClick={handleClearFilters}>
                    Clear
                </button>
            </div>
        </div>
    );
};

export default FilterSidebar;
