import React, { memo } from "react";

import "./Input.scss";

const FilterModalInput = ({ placeholder, type = "text", name, id, img, label, value, handleChange, handleBlur }) => {
    return (
        <div className="filter-modal-component">
            <label className="filter-modal-component__label">{label}</label>
            <div className="filter-modal-component__input">
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

export default memo(FilterModalInput);
