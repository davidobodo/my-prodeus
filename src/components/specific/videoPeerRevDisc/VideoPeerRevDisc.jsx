import React from "react";

import Discussion from "@/components/specific/discussion/Discussion";
import PeerReview from "@/components/specific/peerReview/PeerReview";

import ViewingModule from "@/components/specific/viewingModule/ViewingModule";

import "./VideoPeerRevDisc.scss";
const VideoPeerRevDisc = ({ details, watchedDetails, classId }) => {
    return (
        <div className="video-peer-rev-disc-component">
            <div className="video-peer-rev-disc-component__left-section">
                <ViewingModule details={details} timeLogged={watchedDetails} />
            </div>
            <div className="video-peer-rev-disc-component__right-section">
                <div className="video-peer-rev-disc-component__right-section__top">
                    <PeerReview id={classId} />
                </div>
                <div className="video-peer-rev-disc-component__right-section__bottom">
                    <Discussion id={classId} />
                </div>
            </div>
        </div>
    );
};

export default VideoPeerRevDisc;
