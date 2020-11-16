import React, { useState, memo, useCallback, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { BASE_URL } from "@/utils/Url";
import { reqUpdateUser } from "@/store/global/slice/AuthSlice";
import { getLocalStorage, setLocalStorage, renderEmoji, convertToUrlString } from "@/utils/Utils";

import "../CategoriesPage.scss";

const SectionCard = ({ title, mainCategory }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { favCategories } = useSelector((state) => state.auth.user);
    const { userToken } = useSelector((state) => state.auth);

    const [isFollowing, setIsFollowing] = useState(false);
    //---------------------------------------------------------------------
    //Network Requests
    //---------------------------------------------------------------------
    const handleSetFavCategory = () => {
        let updatedFavCategories;

        //Check if category is present in favCategories
        //If it is then user desires to remove it
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
    const handleSetIsFollowing = (e) => {
        e.stopPropagation();
        setIsFollowing(!isFollowing);
        handleSetFavCategory();
    };

    const checkIfUserIsFollowing = useCallback(() => {
        //Check if this category is among the favourite categories
        const isPresent = favCategories.find((item) => {
            return item.name === title;
        });

        if (isPresent) {
            setIsFollowing(true);
            return;
        }
    }, [favCategories]);

    const handleRedirect = useCallback(() => {
        const urlString = convertToUrlString(title);
        history.push({
            pathname: `/library/categories/${urlString}`,
            state: { title: title, mainCategory: mainCategory }
        });
    }, [history]);

    //---------------------------------------------------------------------
    //UseEffects
    //---------------------------------------------------------------------
    useEffect(() => {
        checkIfUserIsFollowing();
    }, [favCategories]);
    return (
        <div className="section-card-component" onClick={handleRedirect}>
            <div className="section-card-component__title">
                <span role="img" aria-label="">
                    {renderEmoji(title)}
                </span>
                <h1>{title}</h1>
            </div>
            <h4 className="section-card-component__follow">
                <span className="text">{isFollowing ? "Following" : "Follow"}</span>
                <span
                    className={isFollowing ? "icon-wrapper following" : "icon-wrapper"}
                    onClick={handleSetIsFollowing}
                >
                    <span></span>
                    <span></span>
                </span>
            </h4>
        </div>
    );
};

export default memo(SectionCard);
