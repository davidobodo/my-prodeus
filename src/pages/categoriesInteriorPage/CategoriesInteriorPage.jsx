import React, { useState, useEffect, memo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import LibrarySidebar from "@/components/specific/librarySidebar/LibrarySidebar";
import PreviewCard from "@/components/specific/classPreviewCard/ClassPreviewCard";
import Advert2 from "@/components/specific/advert2/Advert2";
import SiteLoadingPlaceholder from "@/components/specific/siteLoadingPlaceholder/SiteLoadingPlaceholder";

import plus from "@/assets/pages/categoriesInterior/plus.svg";
import { BASE_URL } from "@/utils/Url";
import { reqUpdateUser } from "@/store/global/slice/AuthSlice";
import { getLocalStorage, setLocalStorage } from "@/utils/Utils";

import "./CategoriesInteriorPage.scss";

import { capitalizeFirstLetter } from "@/utils/Utils";

const Page = ({ location }) => {
    const { id } = useParams();
    const { title, mainCategory } = location.state; //title: name of category, mainCategory: where the category belongs to
    const dispatch = useDispatch();

    const { userToken } = useSelector((state) => state.auth);
    const { favCategories } = useSelector((state) => state.auth.user);
    const { allClasses } = useSelector((state) => state.class);

    const [hasLoaded, setHasLoaded] = useState(false); //To make sure categories have been sorted out appropraitely before displaying them
    const [categoryClasses, setCategoryClasses] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);

    const pageHeading = capitalizeFirstLetter(id);

    // ---------------------------------------------------------------------
    // Network Requests
    // ---------------------------------------------------------------------
    const handleSetFavCategory = () => {
        let updatedFavCategories;

        // Check if category is present in favCategories
        // If it is then user desires to remove it
        const isPresent = favCategories.find((item) => {
            return item.name === title;
        });

        if (isPresent) {
            const data = favCategories.filter((item) => {
                return item.name !== title;
            });
            updatedFavCategories = [...data];
        } else {
            const newCategory = {
                name: title,
                category: mainCategory
            };
            updatedFavCategories = [...favCategories, newCategory];
        }

        const body = {
            favCategories: updatedFavCategories
        };

        axios
            .post(`${BASE_URL}/user/update`, body, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then((res) => {
                //Updata general store
                console.log(res.data);
                dispatch(reqUpdateUser(res.data));
                //Update Local storage
                const localStorageData = getLocalStorage("prodeus");
                localStorageData.user = res.data;
                setLocalStorage("prodeus", localStorageData);
            })
            .catch((err) => {
                alert(err);
            });
    };

    //---------------------------------------------------------------------
    //Helper functions
    //---------------------------------------------------------------------
    //I needed this function to be hoisted that is why i used the normal function declaration
    function handleSetCategoryClasses() {
        const data = allClasses.filter((item) => {
            return item.category === title;
        });

        setCategoryClasses(data);
        setHasLoaded(true);
    }

    const checkIfUserIsFollowing = useCallback(() => {
        //Check if this category is among the favourite categories
        const isPresent = favCategories.find((item) => {
            return item.name === title;
        });

        if (isPresent) {
            setIsFollowing(true);
        } else {
            setIsFollowing(false);
        }
    }, [favCategories, id]);

    const handleSetIsFollowing = () => {
        setIsFollowing(!isFollowing);
        handleSetFavCategory();
    };

    //---------------------------------------------------------------------
    //UseEffects
    //---------------------------------------------------------------------
    useEffect(() => {
        if (allClasses) {
            handleSetCategoryClasses();
        }
    }, [allClasses, id]);

    useEffect(() => {
        checkIfUserIsFollowing();
    }, [favCategories, id]);

    if (!hasLoaded) {
        return <SiteLoadingPlaceholder />;
    }

    return (
        <div className="library-section-wrapper">
            <div className="library-section-wrapper__left-column">
                <LibrarySidebar />
                <div className="library-section-wrapper__left-column__content">
                    <div id="categories-interior-page">
                        <div className="categories-interior-page">
                            <div className="categories-interior-page__header">
                                <h1>{title} </h1>
                                <button
                                    className="btn-follow"
                                    onClick={handleSetIsFollowing}
                                    style={{ backgroundColor: isFollowing ? "#22283a" : "#b4b4c9" }}
                                >
                                    <span>{isFollowing ? "Following" : "Follow"}</span>
                                    <img src={plus} alt="follow" />
                                </button>
                            </div>
                            {categoryClasses.length !== 0 ? (
                                <div className="categories-interior-page__content">
                                    <div className="group">
                                        {categoryClasses.slice(0, 12).map((item, index) => {
                                            return <PreviewCard key={index} details={item} />;
                                        })}
                                    </div>
                                    <div className="advert-wrapper">
                                        <Advert2 />
                                    </div>
                                    <div className="group">
                                        {categoryClasses.slice(12, 24).map((item, index) => {
                                            return <PreviewCard key={index} details={item} />;
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <h2 style={{ marginLeft: "70px" }}>Sorry No classes added yet</h2>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Page);
