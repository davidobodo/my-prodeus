import React, { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";

import CategoryPreviews from "@/components/specific/categoryPreviews/CategoryPreviews";
import Discussion from "@/components/specific/discussion/Discussion";
import PeerReview from "@/components/specific/peerReview/PeerReview";
import Advert from "@/components/specific/advert/Advert";
import ViewingModule from "@/components/specific/viewingModule/ViewingModule";

import VideoPeerRevDisc from "@/components/specific/videoPeerRevDisc/VideoPeerRevDisc";

import backIcon from "@/assets/global/back.svg";

import "./ClassPage.scss";

const ClassPage = ({ location }) => {
    const { details, watchedDetails } = location.state;
    const { category, _id: classId } = details;
    const history = useHistory();

    const handleGoBack = useCallback(() => {
        history.goBack();
    }, [history]);
    return (
        <div id="class-page">
            <div className="class-page">
                <Advert />
                <div className="class-page__content">
                    <div className="back-link" onClick={handleGoBack}>
                        <img src={backIcon} alt="back" />
                        Back
                    </div>
                    <div className="class-page__content__top-section">
                        <VideoPeerRevDisc
                            details={location.state.details}
                            watchedDetails={watchedDetails ? watchedDetails.totalWatched : null}
                            classId={classId}
                        />
                    </div>
                    <div className="class-page__content__bottom-section">
                        <div className="preview-section">
                            <h2 className="header">
                                More <span className="blue"> {category}</span> classes
                            </h2>
                            <CategoryPreviews categoryTitle={category} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassPage;
