import React, { useEffect } from "react";

import YouTube from "./CustomReactYoutube";

import "./VideoPlayer.scss";
const VideoPlayer = ({ youtubeId }) => {
    return (
        <div className="video-player-component">
            <YouTube videoId={youtubeId} />
        </div>
    );
};

export default VideoPlayer;
