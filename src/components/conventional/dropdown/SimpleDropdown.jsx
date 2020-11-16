import React, { useState, memo, useEffect, useCallback, useRef } from "react";
import dropdownIcon from "@/assets/global/dropdownBlue.svg";

import "./Dropdown.scss";

const Dropdown = ({ placeholder, options, value, name, handleChange, id = "" }) => {
    //Is Dropdown open
    const [isOpen, setIsOpen] = useState(false);

    const [selectedOption, setSelectedOption] = useState(value);

    const dropdownRef = useRef();

    //Options to be displayed in the dropdown. This could be initial values passed in,
    //or filtered values after user types into input field
    const [newOptions, setNewOptions] = useState(options);

    const toggleList = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClicked = (value) => () => {
        setSelectedOption(value);
        setIsOpen(false);
        handleChange(value);
    };

    const handleOnChangeInput = (e) => {
        const { value } = e.target;

        //Change input value
        setSelectedOption(value);

        //filter dropdown for fields that match input value
        const data = options.filter((item) => {
            return item.text.toLowerCase().includes(value.toLowerCase());
        });

        //Set dropdown options
        setNewOptions(data);
    };

    const handleClickDocument = useCallback((e) => {
        const { target } = e;
        const dropdownElement = dropdownRef.current;

        if (target !== dropdownElement && !dropdownElement.contains(target)) {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("click", handleClickDocument);

        return () => document.removeEventListener("click", handleClickDocument);
    }, [isOpen, handleClickDocument]);

    return (
        <div
            className={isOpen ? "simpledropdown-component is-open" : "simpledropdown-component"}
            onClick={toggleList}
            role="list-box"
            name={name}
            id={id}
            ref={dropdownRef}
        >
            <div className="dd-header">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={selectedOption}
                    onChange={handleOnChangeInput}
                    className="dd-header-title"
                />
                <img src={dropdownIcon} alt="\/" className="dropdown-icon" />
            </div>
            <ul className="dd-list">
                {newOptions.length === 0 ? (
                    <li className="dd-list-item">No Results...</li>
                ) : (
                    newOptions.map((item) => {
                        const { key, value, text } = item;
                        return (
                            <li className="dd-list-item" key={key} role="option" onClick={handleOptionClicked(value)}>
                                {text}
                            </li>
                        );
                    })
                )}
            </ul>
        </div>
    );
};

export default memo(Dropdown);
