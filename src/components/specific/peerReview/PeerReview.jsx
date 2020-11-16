import React, { useState, useCallback, memo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import Button from "@/components/conventional/button/Button";
import MultipleSelectionDropdownPlusIcon from "@/components/conventional/dropdown/MultipleSelectionDropdownPlusIcon";
import PlusMinusCheckbox from "@/components/conventional/checkbox/PlusMinusCheckbox";

import IntermediateIcon from "@/assets/global/levels/IntermediateIcon";
import BeginnerIcon from "@/assets/global/levels/BeginnerIcon";
import AdvancedIcon from "@/assets/global/levels/AdvancedIcon";
import searchIcon from "@/assets/global/search.svg";

import ArrowIcon from "@/assets/global/ArrowIcon";
import ThumbsUpIcon from "@/assets/pages/classPage/ThumbsUp";
import ThumbsDownIcon from "@/assets/pages/classPage/ThumbsDown";

import { BASE_URL } from "@/utils/Url";
import { categoryDropdownOptions } from "@/utils/Utils";

import "./PeerReview.scss";

const PeerReview = ({ id }) => {
    const { userToken } = useSelector((state) => state.auth);
    const SKILLS = categoryDropdownOptions();
    //Show the questions and answers
    const [showPeerReview, setShowPeerReview] = useState(false);

    //Whether user would recommend or not
    const [userLikes, setUserLikes] = useState(false);
    const [userDislikes, setUserDislikes] = useState(false);

    //Is it beginner, intermediate or advanced
    const [difficultyRate, setDifficultyRate] = useState("");

    //Options selected from the dropdown
    const [peerSelectedOptions, setPeerSelectedOptions] = useState([]);

    const handleShowPeerReview = useCallback(() => {
        setShowPeerReview(!showPeerReview);
    }, [showPeerReview]);

    const handleSetUserLikes = useCallback(() => {
        if (userLikes === true) {
            setUserLikes(false);
            return;
        } else if (userLikes === false && userDislikes === false) {
            setUserLikes(true);
            return;
        }
    }, [userLikes, userDislikes]);

    const handleSetUserDislikes = useCallback(() => {
        if (userDislikes === true) {
            setUserDislikes(false);
            return;
        } else if (userDislikes === false && userLikes === false) {
            setUserDislikes(true);
            return;
        }
    }, [userLikes, userDislikes]);

    const handleSetDifficultyRate = useCallback((e) => {
        const { rate } = e.currentTarget.dataset;
        setDifficultyRate(rate);
    }, []);

    const handleSetPeerSelectedOptions = useCallback((val) => {
        setPeerSelectedOptions(val);
    }, []);

    const handleSubmitReview = useCallback(() => {
        let recommended;

        if (userLikes) {
            recommended = true;
        } else {
            recommended = false;
        }

        const body = {
            skills: peerSelectedOptions,
            difficulty: difficultyRate,
            classId: id,
            recommended: recommended
        };

        axios
            .post(`${BASE_URL}/class/review`, body, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then((res) => {
                setShowPeerReview(false);
            })
            .catch((err) => {
                alert(err);
            });
    });

    const TUTOR_OPTIONS = ["3D Design", "Animation", "Architecture"];

    return (
        <div className="peer-review-component">
            <div className="peer-review-component__header" onClick={handleShowPeerReview}>
                <h2>Peer Review</h2>
                <div style={{ transform: showPeerReview ? "" : "rotate(180deg)", marginTop: "4px" }}>
                    <ArrowIcon />
                </div>
            </div>

            {showPeerReview && (
                <div className="peer-review-component__content">
                    <div className="question">
                        <h4 className="title">Would you recommend this class?</h4>
                        <div className="answer">
                            <div
                                className="img-wrapper"
                                style={{ backgroundColor: userLikes ? "#4389f8" : "#e2edfe" }}
                                onClick={handleSetUserLikes}
                            >
                                <ThumbsUpIcon color={userLikes ? "#fff" : "#4389f8"} />
                            </div>

                            <div
                                className="img-wrapper"
                                style={{ backgroundColor: userDislikes ? "#b4b4c9" : "rgba(180, 180, 201, 0.2)" }}
                                onClick={handleSetUserDislikes}
                            >
                                <ThumbsDownIcon color={userDislikes ? "#fff" : "#b4b4c9"} />
                            </div>
                        </div>
                    </div>
                    <div className="question">
                        <h4 className="title">How would you rate the difficulty of this class?</h4>
                        <div className="answer">
                            <div className="answer__option">
                                <div onClick={handleSetDifficultyRate} data-rate="beginner">
                                    <BeginnerIcon
                                        type="circle"
                                        circleBgColor={
                                            difficultyRate === "beginner"
                                                ? "rgba(41, 198, 119, 1)"
                                                : "rgba(41, 198, 119, 0.15)"
                                        }
                                        circleColor={difficultyRate === "beginner" ? "#fff" : "#29c677"}
                                    />
                                </div>
                                <span className="answer__option__text">Beginner</span>
                            </div>
                            <div className="answer__option">
                                <div onClick={handleSetDifficultyRate} data-rate="intermediate">
                                    <IntermediateIcon
                                        type="circle"
                                        circleBgColor={
                                            difficultyRate === "intermediate"
                                                ? "rgba(247, 207, 52, 1)"
                                                : "rgba(247, 207, 52, 0.15)"
                                        }
                                        circleColor={difficultyRate === "intermediate" ? "#fff" : "#f7cf34"}
                                    />
                                </div>
                                <span className="answer__option__text">Intermediate</span>
                            </div>
                            <div className="answer__option">
                                <div onClick={handleSetDifficultyRate} data-rate="advanced">
                                    <AdvancedIcon
                                        type="circle"
                                        circleBgColor={
                                            difficultyRate === "advanced"
                                                ? "rgba(230, 49, 70, 1)"
                                                : "rgba(230, 49, 70, 0.15)"
                                        }
                                        circleColor={difficultyRate === "advanced" ? "#fff" : "#e63146"}
                                    />
                                </div>
                                <span className="answer__option__text">Advanced</span>
                            </div>
                        </div>
                    </div>
                    <div className="question">
                        <h4 className="title">What skills did you learn from this class?</h4>
                        <div className="added-by-creator">
                            {TUTOR_OPTIONS.map((option, i) => {
                                //Does the tutor added option match an option selected by a peer
                                const isPresent = peerSelectedOptions.find((item) => {
                                    return item === option;
                                });

                                return isPresent ? (
                                    <div className="added-by-creator__option isChecked" key={i}>
                                        <span className="added-by-creator__option__text">{option}</span>
                                        <PlusMinusCheckbox disabled={true} checked={true} />
                                    </div>
                                ) : (
                                    <div className="added-by-creator__option" key={i}>
                                        <span className="added-by-creator__option__text">{option}</span>
                                        <PlusMinusCheckbox disabled={true} />
                                    </div>
                                );
                            })}
                        </div>
                        <MultipleSelectionDropdownPlusIcon
                            value={[]}
                            options={SKILLS}
                            handleChange={(value) => handleSetPeerSelectedOptions(value)}
                            left={<img src={searchIcon} alt="search" />}
                            placeholder="Search Skills"
                        />
                    </div>
                    <Button type="button" handleOnClick={handleSubmitReview}>
                        Save
                    </Button>
                </div>
            )}
        </div>
    );
};

export default memo(PeerReview);
