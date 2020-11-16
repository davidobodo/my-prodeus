import React, { memo } from "react";

import "./Input.scss";

const AccSettingsInput = ({ placeholder, type = "text", name, id, img, label, value, handleChange, handleBlur }) => {
    return (
        <div className="acc-set-input-component">
            <label className="acc-set-input-component__label">{label}</label>
            <div className="acc-set-input-component__input">
                <input
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    id={id}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>
        </div>
    );
};

export default memo(AccSettingsInput);
