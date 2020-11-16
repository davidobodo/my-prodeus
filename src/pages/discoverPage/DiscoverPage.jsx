import React, { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import StarRating from "@/components/conventional/5starRating/5starRating";
import LibrarySidebar from "@/components/specific/librarySidebar/LibrarySidebar";
import CategoryPreviews from "@/components/specific/categoryPreviews/CategoryPreviews";
import CoursePreviewCard from "@/components/specific/coursePreviewCard/CoursePreviewCard";
import ClassPreviewCard from "@/components/specific/classPreviewCard/ClassPreviewCard";
import Difficulty from "@/components/specific/difficulty/Difficulty";
import Time from "@/components/specific/time/Time";
import Advert2 from "@/components/specific/advert2/Advert2";

import featuredBg from "@/assets/pages/discoverPage/featured-bg.png";

import { BASE_URL } from "@/utils/Url";
import { updateWatchedClasses } from "@/store/global/slice/ClassSlice";

import "./DiscoverPage.scss";

const DiscoverPage = () => {
    const dispatch = useDispatch();

    const { userToken } = useSelector((state) => state.auth);
    const { allClasses } = useSelector((state) => state.class);
    const { allCourses } = useSelector((state) => state.course);
    const { watchedClasses } = useSelector((state) => state.class);

    const [randomClasses, setRandomClasses] = useState([]);
    const [selectedCourseCategory, setSelectedCourseCategory] = useState([]);

    const handleSetRandomClasses = useCallback(() => {
        const data = [];
        for (let i = 0; i < 15; i++) {
            let randomNumber = Math.floor(Math.random() * allClasses.length); //Get a random index from the classes array
            data.push(allClasses[randomNumber]); //Push the class on that index into our random classes array
        }
        setRandomClasses(data);
    }, [allClasses]);

    const handleSetSelectedCourseCategory = useCallback(() => {
        const data = allCourses.filter((item) => {
            return item.category === "Animation";
        });

        setSelectedCourseCategory(data);
    }, [allCourses]);

    //---------------------------------------------------------------------
    //UseEffects
    //---------------------------------------------------------------------
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

    useEffect(() => {
        if (allClasses) {
            handleSetRandomClasses();
        }
    }, [allClasses]);

    useEffect(() => {
        if (allCourses) {
            handleSetSelectedCourseCategory();
        }
    }, [allCourses]);

    return (
        <div className="library-section-wrapper">
            <div className="library-section-wrapper__left-column">
                <LibrarySidebar />
                <div className="library-section-wrapper__left-column__content">
                    <div id="discover-page">
                        {/* continue watching */}
                        {watchedClasses.length !== 0 && (
                            <div className="preview-section continue-watching">
                                <h1 className="header">Continue Watching</h1>
                                <div className="previews-component-wrapper">
                                    <div className="previews-component">
                                        {watchedClasses.map((item, index) => {
                                            return item.class ? (
                                                <div className="preview-card-wrapper" key={index}>
                                                    <ClassPreviewCard details={item.class} watchedDetails={item} />
                                                </div>
                                            ) : null;
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* featured */}
                        <div className="preview-section featured">
                            <h1 className="header">Featured</h1>
                            <div
                                className="banner"
                                style={{
                                    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)),url(${featuredBg})`
                                }}
                            >
                                <div className="rating-wrapper">
                                    <StarRating rating="3" />
                                    <h3>
                                        4.5 <span>12,040 Reviews</span>
                                    </h3>
                                </div>
                                <h6 className="category">
                                    <span role="img" aria-label="">
                                        📱
                                    </span>
                                    Mobile app Development
                                </h6>
                                <h1 className="caption">How to make a ‘Gundam Style’ illustration</h1>
                                <div className="info">
                                    <section>
                                        <Difficulty difficulty="Advanced" iconBg="transparent" />
                                    </section>
                                    <section>
                                        <Time iconBg="transparent" iconColor="#fff" />
                                    </section>
                                </div>
                            </div>
                        </div>

                        {/* animation */}
                        <div className="preview-section because-illustration">
                            <h1 className="header">
                                Because you follow <span className="blue">Animation</span>
                            </h1>
                            <div className="previews-component-wrapper">
                                <div className="previews-component">
                                    {selectedCourseCategory.slice(0, 9).map((item, index) => {
                                        return (
                                            <div className="preview-card-wrapper" key={index}>
                                                <CoursePreviewCard details={item} />
                                            </div>
                                        );
                                    })}
                                    <div className="preview-card-wrapper see-all">
                                        <span role="img" aria-label="">
                                            💥
                                        </span>
                                        <h1>Animation</h1>
                                        <Link
                                            to={{
                                                pathname: `/library/categories/animation`,
                                                state: { title: "Animation", mainCategory: "Art & Design" }
                                            }}
                                        >
                                            <button>See all classes</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* advert */}
                        <div className="preview-section">
                            <Advert2 />
                        </div>

                        {/* random */}
                        <div className="preview-section top-random">
                            <h1 className="header">
                                Top class for <span className="purple">Random</span>
                            </h1>
                            <div className="previews-component-wrapper">
                                <div className="previews-component">
                                    {randomClasses.slice(0, 9).map((item, index) => {
                                        return (
                                            <div className="preview-card-wrapper" key={index}>
                                                <ClassPreviewCard details={item} />
                                            </div>
                                        );
                                    })}

                                    <div className="preview-card-wrapper see-all">
                                        <span role="img" aria-label="">
                                            💥
                                        </span>
                                        <h1>Random</h1>
                                        <Link to="/library/categories">
                                            <button>See all classes</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* illustration */}
                        <div className="preview-section top-illustration">
                            <h1 className="header">
                                Top class for <span className="blue">Illustration</span>
                            </h1>
                            <div className="previews-component-wrapper">
                                <CategoryPreviews categoryTitle="Illustration" mainCategoryTitle="Art & Design" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscoverPage;
