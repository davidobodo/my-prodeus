import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./OnboardingProdegrees.scss";

import check from "@/assets/global/onBoarding/check.svg";
import art from "@/assets/global/onBoarding/art.svg";
import computer from "@/assets/global/onBoarding/cs.svg";
import business from "@/assets/global/onBoarding/bus.svg";
import lifestyle from "@/assets/global/onBoarding/life.svg";
import acad from "@/assets/global/onBoarding/acad.svg";

import { COLORS, TIME_WATCHED } from "@/utils/Constants";
import { BASE_URL } from "@/utils/Url";
import { getLocalStorage, setLocalStorage } from "@/utils/Utils";
import { reqUpdateUser } from "@/store/global/slice/AuthSlice";

const {
    choiceBlue,
    choiceGreen,
    choicePurple,
    choiceLightBlue,
    choiceLightGreen,
    choiceLightPurple,
    choiceRed,
    choiceLightRed,
    choiceYellow,
    choiceLightYellow,
    choiceAsh,
    choiceLightAsh
} = COLORS;
const Onboarding = () => {
    const history = useHistory();

    const dispatch = useDispatch();
    const [favStudies, setFavStudies] = useState([]);
    const { userToken } = useSelector((state) => state.auth);

    const handleClick = (e) => {
        const { name } = e.currentTarget.dataset;

        const isPresent = favStudies.find((item) => {
            return item === name;
        });

        if (isPresent) {
            const data = favStudies.filter((item) => {
                return item !== name;
            });

            setFavStudies(data);
            return;
        }

        setFavStudies([...favStudies, name]);
    };

    const handleNext = () => {
        const body = {
            favStudies
        };

        axios
            .post(`${BASE_URL}/user/update`, body, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then((res) => {
                dispatch(reqUpdateUser(res.data));

                //Update Local storage
                const localStorageData = getLocalStorage("prodeus");
                localStorageData.user = res.data;
                setLocalStorage("prodeus", localStorageData);
            })
            .catch((err) => {
                alert(err);
            });

        history.push("/onboarding/categories");
    };

    const studies = [
        {
            title: "Art & Design",
            bgColor: choiceGreen,
            picture: art
        },
        {
            title: "Computer Science",
            bgColor: choiceBlue,
            picture: computer
        },
        {
            title: "Business",
            bgColor: choiceRed,
            picture: business
        },
        {
            title: "Lifestyle",
            bgColor: choiceYellow,
            picture: lifestyle
        },
        {
            title: "Academics",
            bgColor: choicePurple,
            picture: acad
        }
    ];

    return (
        <div id="onboarding-prodegrees-page">
            <div className="onboarding-prodegrees-page">
                <h1 className="title">
                    What would you <br /> like to study?
                </h1>
                <div className="prodegrees">
                    {studies.map((item) => {
                        const { title, bgColor, picture } = item;

                        const isPresent = favStudies.find((item) => {
                            return item === title;
                        });
                        return (
                            <div
                                className="prodegree-card"
                                data-name={title}
                                style={{ backgroundColor: bgColor }}
                                onClick={handleClick}
                            >
                                <h1>{title}</h1>
                                {isPresent && <img src={check} alt="" className="check" />}
                                <img src={picture} alt="" className="picture" />
                            </div>
                        );
                    })}
                </div>
                <div className="btn-wrapper">
                    <button onClick={handleNext}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
