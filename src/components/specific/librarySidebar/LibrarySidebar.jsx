import React, { memo } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";

import DiscoverIcon from "@/assets/global/librarySidebar/DiscoverIcon";
import CategoriesIcon from "@/assets/global/librarySidebar/CategoriesIcon";
import SavedIcon from "@/assets/global/librarySidebar/SavedIcon";
import SearchIcon from "@/assets/global/librarySidebar/SearchIcon";
import AddClassIcon from "@/assets/global/librarySidebar/AddClassIcon";
import HistoryIcon from "@/assets/global/librarySidebar/HistoryIcon";
import PlusIcon from "@/assets/global/librarySidebar/PlusIcon";

import "./LibrarySidebar.scss";
import SubLinks from "./Sublinks";

import { CATEGORIES } from "@/utils/Constants";

const LibrarySidebar = () => {
    const isMatch = useRouteMatch("/library/categories");

    return (
        <div className="library-sidebar-component">
            <ul>
                <li>
                    <NavLink to="/library/discover" className="main-link">
                        <DiscoverIcon />
                        Discover
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/library/categories" className="main-link">
                        <CategoriesIcon />
                        Categories
                    </NavLink>
                    {isMatch && (
                        <ul className="sublinks-wrapper">
                            {Object.entries(CATEGORIES).map((item, i) => {
                                return <SubLinks key={i} details={item} />;
                            })}
                        </ul>
                    )}
                </li>
                <li>
                    <NavLink to="/library/history" className="main-link">
                        <HistoryIcon />
                        History
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/library/saved" className="main-link">
                        <SavedIcon />
                        Saved
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/library/search" className="main-link">
                        <SearchIcon />
                        Search
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/library-add-class" className="main-link">
                        <AddClassIcon />
                        Add Class
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default memo(LibrarySidebar);
