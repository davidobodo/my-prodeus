import React, { useState, memo, useEffect, useCallback, useRef } from "react";

import CheckmarkCheckbox from "@/components/conventional/checkbox/CheckmarkCheckbox";
import ArrowIcon from "@/assets/global/ArrowIcon";
import "./Dropdown.scss";

const MultipleSelectionDropdownCheckmark = ({ placeholder, options, name, value, handleChange }) => {
    //Is Dropdown open
    const [isOpen, setIsOpen] = useState(false);

    const [selectedOptions, setSelectedOptions] = useState(value);

    const inputRef = useRef(null);

    const dropdownRef = useRef();

    //Options to be displayed in the dropdown. This could be initial values passed in,
    //or filtered values after user types into input field
    const [newOptions, setNewOptions] = useState(options);

    //Toggle dropdown display
    const toggleList = () => {
        setIsOpen(!isOpen);

        //Fire update to dropdown value
        handleChange(selectedOptions);
    };

    //Handles addition of a value into the dropdown selected options array
    const handleOptionClicked = (value) => () => {
        //Check if the option just clicked already exists in the dropdown selected options array
        const isPresent = selectedOptions.find((item) => {
            return item === value;
        });

        //If it exists, therefore we want to remove it
        if (isPresent) {
            const _filtered = selectedOptions.filter((item) => {
                return item !== value;
            });
            setSelectedOptions(_filtered);
            return;
        } else {
            //If it doesnt exist we want to add it
            setSelectedOptions([...selectedOptions, value]);
            return;
        }
    };

    const handleOnChangeInput = useCallback(
        (e) => {
            //Ref makes the input field an uncontrolled one, therefore i do not need to define a seperate state to control its value
            const { value } = e.target;

            //filter dropdown for fields that match input value
            const data = options.filter((item) => {
                return item.text.toLowerCase().includes(value.toLowerCase());
            });

            //Set dropdown options
            setNewOptions(data);
        },
        [options]
    );

    const handleClickDocument = useCallback((e) => {
        const target = e.target;
        const dropdownElement = dropdownRef.current;

        if (target !== dropdownElement && !dropdownElement.contains(target)) {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        //If dropdown is open, immediately focus on input field
        if (isOpen) {
            inputRef.current.focus();
        } else {
            setNewOptions(options);
        }
    }, [isOpen, options]);

    useEffect(() => {
        document.addEventListener("click", handleClickDocument);

        return () => {
            document.removeEventListener("click", handleClickDocument);
        };
    }, [handleClickDocument]);

    return (
        <div
            className={
                isOpen
                    ? "multiple-selection-dropdown-component-checkmark is-open"
                    : "multiple-selection-dropdown-component-checkmark"
            }
            role="list-box"
            name={name}
            ref={dropdownRef}
        >
            <div className="dd-header" onClick={toggleList}>
                <input type="text" placeholder={placeholder} onChange={handleOnChangeInput} ref={inputRef} />
                <div className="icon-wrapper" style={{ transform: isOpen ? "rotate(0deg)" : "rotate(180deg)" }}>
                    <ArrowIcon color={isOpen ? "#b4b4c9" : "#fff"} />
                </div>
            </div>
            <ul className="dd-list">
                {newOptions.length === 0 ? (
                    <li className="dd-list-item">No Results...</li>
                ) : (
                    newOptions.map((item) => {
                        const { key, value, text } = item;

                        //Checked if item is among selected options
                        //Use the value to determine if the checkbox is checked or unchecked
                        const isPresent = selectedOptions.find((item) => {
                            return item === value;
                        });

                        return (
                            <li className="dd-list-item" key={key} role="option">
                                <CheckmarkCheckbox checked={!!isPresent} onChange={handleOptionClicked(value)} />
                                {text}
                            </li>
                        );
                    })
                )}
            </ul>
        </div>
    );
};

export default memo(MultipleSelectionDropdownCheckmark);
