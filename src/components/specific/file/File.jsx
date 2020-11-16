import React, { memo } from "react";

import FileIcon from "@/assets/pages/coursePage/fileIcon";
import "./File.scss";

const File = ({ number }) => {
    return (
        <div className="file-component">
            <FileIcon />
            {number}
        </div>
    );
};

export default File;
