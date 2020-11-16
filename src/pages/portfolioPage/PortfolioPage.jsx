import React, { useState, useCallback, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import ClassPreviewCard from "@/components/specific/classPreviewCard/ClassPreviewCard";
import Button from "@/components/conventional/button/Button";
import useGetProdegreeInfo from "@/components/conventional/customHooks/useGetProdegreeInfo";
import SiteLoadingPlaceholder from "@/components/specific/siteLoadingPlaceholder/SiteLoadingPlaceholder";

import EditModal from "./components/editModal/EditModal";
import ProdegreeCard from "./components/ProdegreeCard";

import editIcon from "@/assets/global/edit.svg";
import userImg from "@/assets/global/user.svg";

import capBlackIcon from "@/assets/pages/portfolioPage/cap-black.svg";
import timeBlackIcon from "@/assets/pages/portfolioPage/time-black.svg";

import "./PortfolioPage.scss";

class Skill {
    constructor(title, icon) {
        this.title = title;
        this.icon = icon;
    }
}

const PortfolioPage = () => {
    const data = useGetProdegreeInfo();

    const { user } = useSelector((state) => state.auth);
    const { profilePicLink } = useSelector((state) => state.auth);
    const { userToken } = useSelector((state) => state.auth);

    const [editInfo, setEditInfo] = useState(false);
    const [recentlyWatched, setRecentlyWatched] = useState(data.watchedClasses);
    const [userSkills, setUserSkills] = useState([]);
    const [proDegrees, setProDegrees] = useState(data.proDegrees);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [finishComputingData, setFinishComputingData] = useState(false); //To Make sure all calculations are complete

    //-----------------------------------------------------------------------
    //Constants
    //-----------------------------------------------------------------------
    const SKILLS = useRef([
        new Skill("Adobe Photoshop", "📐"),
        new Skill("Architectural Rendering", "💥"),
        new Skill("Adobe XD", "🏛️"),
        new Skill("Wireframing", "👚"),
        new Skill("Maya 3D", "🎨"),
        new Skill("React.js", "🕹️")
    ]).current;

    //-----------------------------------------------------------------------
    //Helper Functions
    //-----------------------------------------------------------------------
    const handleEditInfo = useCallback(() => {
        setEditInfo(!editInfo);
    }, [editInfo]);

    const renderProdegreeSection = useCallback(() => {
        //Check if any videos have been watched
        const watchedVideos = proDegrees.filter((proDegree) => {
            return proDegree.categories.length !== 0;
        });

        if (watchedVideos.length === 0) {
            return <p>You haven't registered any pro degrees</p>;
        } else {
            return proDegrees.map((prodegree, index) => {
                return prodegree.categories.length !== 0 ? (
                    <div className="prodegree-card-wrapper" key={index}>
                        <ProdegreeCard details={prodegree} />
                    </div>
                ) : null;
            });
        }
    }, [proDegrees]);

    //-----------------------------------------------------------------------
    //UseEffects
    //-----------------------------------------------------------------------
    useEffect(() => {
        if (data) {
            setProDegrees(data.proDegrees);
            setRecentlyWatched(data.watchedClasses);
            setFinishComputingData(true);
        }
    }, [data]);

    useEffect(() => {
        if (finishComputingData) {
            //So that page content is loaded completely before displaying
            setTimeout(() => {
                setHasLoaded(true);
            }, 3000);
        }
    }, [finishComputingData]);

    return (
        <>
            {!hasLoaded && <SiteLoadingPlaceholder />}
            <div id="portfolio-page">
                <div className="portfolio-page">
                    <div className="portfolio-page__left-column">
                        <div className="portfolio-page__left-column__info-card">
                            <div className="icon-wrapper">
                                <img src={editIcon} alt="edit" onClick={handleEditInfo} />
                            </div>
                            <div className="info-card-inner">
                                <div className="img-wrapper">
                                    <img src={profilePicLink || userImg} alt="" />
                                </div>
                                <div className="details">
                                    <h1>
                                        {user.first_name} {user.last_name}
                                    </h1>
                                    <h4>{user.title || "Enter your title"}</h4>
                                    <p>{user.bio || "Tell us about yourself"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="portfolio-page__right-column">
                        <div className="prodegree">
                            <h1 className="prodegree__title">ProDegrees</h1>
                            {renderProdegreeSection()}
                        </div>
                        <div className="my-skills">
                            <h1 className="my-skills__title">My Skills</h1>
                            {userSkills.length !== 0 ? (
                                <>
                                    <div className="my-skills__info">
                                        {SKILLS.map((item, i) => {
                                            const { title, icon } = item;
                                            return (
                                                <div key={i} className="skill-card-wrapper">
                                                    <div className="skill-card">
                                                        <h1 className="skill-card__title">{title}</h1>
                                                        <div className="skill-card__info">
                                                            <div className="skill-card__info__icon-wrapper">{icon}</div>
                                                            <div className="skill-card__info__description">
                                                                <h4>
                                                                    1.4k Hours
                                                                    <div className="icon-wrapper">
                                                                        <img src={timeBlackIcon} alt="" />
                                                                    </div>
                                                                </h4>
                                                                <h4>
                                                                    201 Classes
                                                                    <div className="icon-wrapper">
                                                                        <img src={capBlackIcon} alt="" />
                                                                    </div>
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="my-skills__btn-wrapper">
                                        <Button variant="double-blue">See More</Button>
                                    </div>
                                </>
                            ) : (
                                <p>You havent registered any skills</p>
                            )}
                        </div>
                        <div className="recently-watched">
                            <h1 className="recently-watched__title">Recently Watched</h1>
                            {recentlyWatched.length !== 0 ? (
                                <div className="recently-watched__info">
                                    {recentlyWatched.slice(0, 6).map((item, index) => {
                                        return <ClassPreviewCard key={index} details={item.class} />;
                                    })}
                                </div>
                            ) : (
                                <p>You haven't watched any videos</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <EditModal
                editInfo={editInfo}
                handleEditInfo={handleEditInfo}
                user={user}
                userToken={userToken}
                profilePicLink={profilePicLink}
            />
        </>
    );
};

export default PortfolioPage;
