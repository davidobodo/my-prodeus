import React, { memo } from "react";

import "./Input.scss";

const AuthInput = ({ placeholder, type = "text", name, id, img, label, value, handleChange, handleBlur }) => {
    return (
        <div className="input-component">
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                id={id}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <img src={img} alt="key" />
        </div>
    );
};

export default memo(AuthInput);
