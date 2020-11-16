import React, { lazy, Suspense, useState, useCallback, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import LibrarySection from "./LibrarySection"; //Contains more routes loaded "lazyly"

import ScrollToTop from "@/components/specific/scrollToTop/ScrollToTop";

import Navbar from "@/components/conventional/navBar/NavBar";
import DailySnapshot from "@/components/specific/dailySnapshot/DailySnapshot";
import SiteLoadingPlaceholder from "@/components/specific/siteLoadingPlaceholder/SiteLoadingPlaceholder";
import CourseModal from "@/components/specific/courseModal/CourseModal";

import { reqShowCourseModal } from "@/store/global/slice/UtilSlice";

import { BASE_URL } from "@/utils/Url";
import { populateAllClasses } from "./store/global/slice/ClassSlice";
import { populateAllCourses } from "./store/global/slice/CourseSlice";

// Not used because apparently Redirect helps with that
import NotFound from "@/pages/404/404.jsx";

const SignIn = lazy(() => import("@/pages/signIn/SignIn" /* webpackChunkName: "SignIn" */));
const SignUp = lazy(() => import("@/pages/signUp/SignUp" /* webpackChunkName: "SignUp" */));
const ActivityPage = lazy(() => import("@/pages/activityPage/ActivityPage" /* webpackChunkName: "ActivityPage" */));
const PortfolioPage = lazy(() => import("@/pages/portfolioPage/PortfolioPage" /* webpackChunkName: "PortfolioPage" */));
const CoursePage = lazy(() => import("@/pages/coursePage/CoursePage" /* webpackChunkName: "CoursePage" */));
const ClassPage = lazy(() => import("@/pages/classPage/ClassPage" /* webpackChunkName: "ClassPage" */));
const AddClassPage = lazy(() => import("@/pages/addClassPage/AddClassPage" /* webpackChunkName: "AddClassPage" */));
const CreateCoursePage = lazy(() =>
    import("@/pages/createCoursePage/CreateCoursePage" /* webpackChunkName: "CreateCoursePage" */)
);
const OnboardingProdegrees = lazy(() =>
    import("@/pages/onboardingProdegrees/OnboardingProdegrees" /* webpackChunkName: "CreateCoursePage" */)
);
const OnboardingCategories = lazy(() =>
    import("@/pages/onboardingCategories/OnboardingCategories" /* webpackChunkName: "CreateCoursePage" */)
);

//-----------------------------------------------------------------------------
//Logged OUT screens
//-----------------------------------------------------------------------------
const PublicRoutes = () => {
    return (
        <Suspense fallback={<SiteLoadingPlaceholder />}>
            <Switch>
                <Route exact path="/" component={SignIn} />
                <Route exact path="/signup" component={SignUp} />
                <Redirect to="/" />
            </Switch>
        </Suspense>
    );
};

//-----------------------------------------------------------------------------
//Logged IN screens
//-----------------------------------------------------------------------------
const PrivateRoutes = () => {
    const dispatch = useDispatch();

    const { showCourseModal } = useSelector((state) => state.utils);
    const { profilePicLink } = useSelector((state) => state.auth);
    const { userToken } = useSelector((state) => state.auth);

    const [showDailySnapshot, setShowDailySnapshot] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    const handleShowDailySnapshot = useCallback(() => {
        setShowDailySnapshot(!showDailySnapshot);
    }, [showDailySnapshot]);

    const handleShowCourseModal = useCallback(() => {
        dispatch(reqShowCourseModal(""));
    }, [dispatch]);

    const handleCloseDailySnapshot = useCallback(() => {
        if (showDailySnapshot) {
            setShowDailySnapshot(false);
        }
    }, [showDailySnapshot]);

    //---------------------------------------------------------------------
    //Use Effect
    //---------------------------------------------------------------------
    useEffect(() => {
        //Get all classes in DB
        axios
            .get(`${BASE_URL}/class/all`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then((res) => {
                dispatch(populateAllClasses(res.data));
                setHasLoaded(true);
            })
            .catch((err) => {
                setHasLoaded(true);
                alert(err);
            });

        //Get all courses in DB
        axios
            .get(`${BASE_URL}/course/all`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then((res) => {
                dispatch(populateAllCourses(res.data));
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    return (
        <div className="app-wrapper">
            {/* {!hasLoaded && <SiteLoadingPlaceholder />} */}
            <div
                className={showDailySnapshot ? "app-wrapper__main-body show-daily-snapshot" : "app-wrapper__main-body"}
                onClick={handleCloseDailySnapshot}
            >
                <Navbar
                    showDailySnapshot={showDailySnapshot}
                    handleShowDailySnapshot={handleShowDailySnapshot}
                    profilePic={profilePicLink}
                />
                <Suspense fallback={<SiteLoadingPlaceholder />}>
                    <ScrollToTop />
                    <Switch>
                        <Route path="/library" component={LibrarySection} />
                        <Route exact path="/activity" component={ActivityPage} />
                        <Route exact path="/portfolio" component={PortfolioPage} />
                        <Route exact path="/library-course" component={CoursePage} />
                        <Route exact path="/library-class" component={ClassPage} />
                        <Route exact path="/library-add-class" component={AddClassPage} />
                        <Route exact path="/library-create-course" component={CreateCoursePage} />
                        <Redirect to="/activity" />
                    </Switch>
                </Suspense>
            </div>
            {showDailySnapshot && (
                <DailySnapshot handleShowDailySnapshot={handleShowDailySnapshot} profilePic={profilePicLink} />
            )}
            <CourseModal addCourse={showCourseModal} handleShowCourseModal={handleShowCourseModal} />
        </div>
    );
};

const OnboardingRoutes = () => {
    return (
        <Suspense fallback={<SiteLoadingPlaceholder />}>
            <Switch>
                <Route exact path="/onboarding/prodegrees" component={OnboardingProdegrees} />
                <Route exact path="/onboarding/categories" component={OnboardingCategories} />
                <Redirect to="/onboarding/prodegrees" />
            </Switch>
        </Suspense>
    );
};

const Root = () => {
    const { userToken } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.auth);

    const renderRoutes = () => {
        if (userToken && user?.favStudies.length !== 0 && user?.favCategories.length >= 5) {
            return <PrivateRoutes />;
        } else if (userToken) {
            return <OnboardingRoutes />;
        } else {
            return <PublicRoutes />;
        }
    };

    return <BrowserRouter>{renderRoutes()}</BrowserRouter>;
};

export default Root;
