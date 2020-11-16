import React from "react";

import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <h1>Page not found</h1>
            <Link to="/">Go back home</Link>
        </div>
    );
};

export default NotFound;
