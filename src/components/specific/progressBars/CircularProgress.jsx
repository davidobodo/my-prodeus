import React, { memo } from "react";

import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

import "./ProgressBars.scss";

const CircularProgress = ({ percent, color, trailColor, children, size = "100", strokeWidth = 10 }) => {
    return (
        <div className="circular-progress-component" style={{ width: `${size}px`, height: `${size}px` }}>
            <Progress
                percent={percent}
                status="default"
                type="circle"
                width={`${size}px`}
                strokeWidth={strokeWidth}
                theme={{
                    default: {
                        color,
                        trailColor
                    }
                }}
            />
            {children}
        </div>
    );
};

export default memo(CircularProgress);
