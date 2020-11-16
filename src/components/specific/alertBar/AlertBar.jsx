import React, { memo, useCallback } from "react";
import { toast } from "react-toastify";
const AlertBar = () => {
    console.log("mounted");
    const renderToast = useCallback(() => {
        console.log("fired");
        toast.success("Stock added to database successfully", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    }, []);

    return <div>{renderToast()}</div>;
};

export default memo(AlertBar);
