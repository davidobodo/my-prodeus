import React from "react";

import "./Checkbox.scss";

const CheckmarkCheckbox = ({ checked, onChange, disabled = false }) => {
    return (
        <div className="checkmark-checkbox-component">
            <input type="checkbox" onChange={onChange} checked={checked} disabled={disabled} />
            <span className="custom-checkbox"></span>
            {/*"position-filler" is used to correct position issue due toposition absolute*/}
            <span className="position-filler"></span>
        </div>
    );
};

export default CheckmarkCheckbox;
