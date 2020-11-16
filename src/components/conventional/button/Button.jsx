import React, { memo } from "react";

import "./Button.scss";

const Button = ({ children, type = "text", handleOnClick, variant, disabled = false }) => {
    const renderButton = () => {
        switch (variant) {
            case "double-blue":
                return (
                    <button
                        type={type}
                        className="double-blue-btn-component"
                        onClick={handleOnClick}
                        variant={variant}
                        disabled={disabled}
                    >
                        {children}
                    </button>
                );
            default:
                return (
                    <button
                        type={type}
                        className="button-component"
                        onClick={handleOnClick}
                        variant={variant}
                        disabled={disabled}
                    >
                        {children}
                    </button>
                );
        }
    };

    return <>{renderButton()}</>;
};

export default memo(Button);
