import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import FilterSidebar from "@/components/specific/filterSidebar/FilterSidebar";
import SiteLoadingPlaceholder from "@/components/specific/siteLoadingPlaceholder/SiteLoadingPlaceholder";
import Advert from "@/components/specific/advert/Advert";

const DiscoverPage = lazy(() => import("@/pages/discoverPage/DiscoverPage" /* webpackChunkName: "PortfolioPage" */));
const SearchPage = lazy(() => import("@/pages/searchPage/SearchPage" /* webpackChunkName: "SearchPage" */));
const SavedPage = lazy(() => import("@/pages/savedPage/SavedPage" /* webpackChunkName: "SavedPage" */));
const CategoriesPage = lazy(() =>
    import("@/pages/categoriesPage/CategoriesPage" /* webpackChunkName: "CategoriesPage" */)
);
const CategoriesInteriorPage = lazy(() =>
    import("@/pages/categoriesInteriorPage/CategoriesInteriorPage" /* webpackChunkName: "CategoriesInteriorPage" */)
);
const HistoryPage = lazy(() => import("@/pages/historyPage/HistoryPage" /* webpackChunkName: "HistoryPage" */));
const MyCoursesPage = lazy(() => import("@/pages/myCourses/MyCourses" /* webpackChunkName: "MyCoursesPage" */));

const LibrarySection = () => {
    return (
        <>
            <Advert />
            <Suspense fallback={<SiteLoadingPlaceholder />}>
                <Switch>
                    <Route exact path="/library/discover" component={DiscoverPage} />
                    <Route exact path="/library/search" component={SearchPage} />
                    <Route exact path="/library/history" component={HistoryPage} />
                    <Route exact path="/library/categories" component={CategoriesPage} />
                    <Route exact path="/library/categories/:id" component={CategoriesInteriorPage} />
                    <Route exact path="/library/saved" component={SavedPage} />
                    <Route exact path="/library/saved/my-courses" component={MyCoursesPage} />
                </Switch>
            </Suspense>
        </>
    );
};

export default LibrarySection;
