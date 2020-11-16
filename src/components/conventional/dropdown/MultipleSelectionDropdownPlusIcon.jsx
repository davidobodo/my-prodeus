import React, { useState, useCallback, useRef, useEffect, memo } from "react";

import PlusMinusCheckbox from "@/components/conventional/checkbox/PlusMinusCheckbox";

import ArrowIcon from "@/assets/global/ArrowIcon";

import "./Dropdown.scss";

const MultipleSelectionDropdownPlusIcon = ({ placeholder, options, name, value, handleChange, left }) => {
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

    const handleClickDocument = useCallback(
        (e) => {
            const target = e.target;

            const dropdownElement = dropdownRef.current;

            if (target !== dropdownElement && !dropdownElement.contains(target)) {
                setIsOpen(false);
                handleChange(selectedOptions);
            }
        },
        [selectedOptions, handleChange]
    );

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
                    ? "multiple-selection-dropdown-component-plus-icon is-open"
                    : "multiple-selection-dropdown-component-plus-icon"
            }
            role="list-box"
            name={name}
            ref={dropdownRef}
        >
            <div className="dd-header" onClick={toggleList}>
                <div className="dd-header__left-column">{left}</div>
                <input type="text" placeholder={placeholder} onChange={handleOnChangeInput} ref={inputRef} />
                <div className="dd-header__right-column">
                    {/* nesting conditionals in components like this is not always good expecially 
                    when you have some implementation that depends on clicking on the entire document
                    (e.g closing dropdown by clicking anywhere in a document).
                    But because this section is POSITIONED ABSOLUTE we would make the exception*/}
                    {isOpen ? (
                        <div className="icon-wrapper">
                            <ArrowIcon />
                        </div>
                    ) : (
                        <h4 className="count">{selectedOptions.length}</h4>
                    )}
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
                                {text}
                                <PlusMinusCheckbox checked={!!isPresent} onChange={handleOptionClicked(value)} />
                            </li>
                        );
                    })
                )}
            </ul>
        </div>
    );
};

export default memo(MultipleSelectionDropdownPlusIcon);
