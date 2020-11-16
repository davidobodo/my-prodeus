import React from "react";

import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

import "./ProgressBars.scss";
const LinearProgress = ({ total, current, color, trailColor }) => {
    const percent = (current / total) * 100;
    return (
        <div className="linear-progress-component">
            <Progress
                percent={percent}
                status="default"
                theme={{
                    default: {
                        color,
                        trailColor
                    }
                }}
            />
            <div className="linear-progress-component__values">
                <h6 className="linear-progress-component__current-value" style={{ color: color }}>
                    {current} credits
                </h6>
                <h6 className="linear-progress-component__total-value">{total} credits</h6>
            </div>
        </div>
    );
};

export default LinearProgress;
