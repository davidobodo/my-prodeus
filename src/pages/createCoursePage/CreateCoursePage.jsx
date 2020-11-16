import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "@/components/conventional/button/Button";
import SimpleDropdown from "@/components/conventional/dropdown/SimpleDropdown";
import Spinner from "@/components/conventional/spinner/Spinner";

import image from "@/assets/pages/addClassPage/class-img.png";
import plusIcon from "@/assets/pages/addClassPage/plus.svg";

import { BASE_URL } from "@/utils/Url";

import { DIFFICULTY_OPTIONS } from "@/utils/Constants";
import { categoryDropdownOptions } from "@/utils/Utils";

import "./CreateCoursePage.scss";

const CreateCoursePage = ({ location }) => {
    const history = useHistory();

    const CATEGORY_OPTIONS = categoryDropdownOptions();
    //To show loading spinner
    const [isLoading, setIsLoading] = useState(false);

    const userToken = useSelector((state) => state.auth.userToken);

    //---------------------------------------------------------------------
    //Form state manaagement, validations and submitting handled by Formik
    //---------------------------------------------------------------------
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            category: "",
            difficulty: ""
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
            category: Yup.string().required("Required"),
            difficulty: Yup.string().required("Required")
        }),
        onSubmit: (values) => {
            const { title, description, category, difficulty } = values;
            const details = {
                title,
                description,
                category,
                difficulty,
                language: "english"
            };
            handleRequestAddClass(details);
        }
    });
    const { values, handleSubmit, handleChange, touched, errors, handleBlur, setFieldValue } = formik; //extract useful properties and methods from formik

    //---------------------------------------------------------------------
    //Network Requests
    //---------------------------------------------------------------------
    //Network request to add class (This request is made here cause its response has no "direct" effect on the global state)
    const handleRequestAddClass = async (body) => {
        let courseId;
        setIsLoading(true);
        try {
            //Create new course
            const resOne = await axios.post(`${BASE_URL}/course/add`, body, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            });

            if (resOne.status === 200) {
                const details = {
                    courseId: resOne.data._id,
                    classId: location.state.classId
                };
                //add class to new course
                const resTwo = await axios.post(`${BASE_URL}/course/addclass`, details, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userToken}`
                    }
                });
                setIsLoading(false);

                //redirect to course page
                if (resTwo.status === 200) {
                    history.push({ pathname: "/library-course", state: { details: resOne.data } });
                }
            } else {
                setIsLoading(false);
                throw resOne;
            }
        } catch (err) {
            setIsLoading(false);
            console.log(err);
        }
    };

    return (
        <div id="create-course-page">
            <div className="create-course-page">
                <div className="create-course-page__left-column">
                    <h1 className="create-course-page__left-column__header">Create Course</h1>
                    <form noValidate onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <div className="create-course-page__input-component">
                                <label className="create-course-page__input-component__label">TITLE</label>
                                <div className="create-course-page__input-component__input">
                                    <input
                                        type="text"
                                        placeholder="Class Title"
                                        name="title"
                                        id="title"
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="textarea-wrapper">
                            <div className="create-course-page__textarea-component">
                                <label htmlFor="">Description</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    cols=""
                                    rows=""
                                    placeholder="Write a description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                ></textarea>
                            </div>
                        </div>

                        <div className="dropdown-wrapper">
                            <h6>Category</h6>
                            <SimpleDropdown
                                placeholder="Select Category"
                                value={values.category}
                                options={CATEGORY_OPTIONS}
                                handleChange={(value) => setFieldValue("category", value)}
                                name="category"
                                id="category"
                            />
                            {touched.category && errors.category ? (
                                <div className="input-error-message">{errors.category}</div>
                            ) : null}
                        </div>

                        <div className="dropdown-wrapper">
                            <h6>Difficulty</h6>
                            <SimpleDropdown
                                placeholder="Select Difficulty"
                                value={values.difficulty}
                                options={DIFFICULTY_OPTIONS}
                                handleChange={(value) => setFieldValue("difficulty", value)}
                                name="difficulty"
                                id="difficulty"
                            />
                            {touched.difficulty && errors.difficulty ? (
                                <div className="input-error-message">{errors.difficulty}</div>
                            ) : null}
                        </div>

                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Spinner />
                                    Creating Course...
                                </>
                            ) : (
                                <>
                                    <span className="icon-wrapper">
                                        <img src={plusIcon} alt="+" />
                                    </span>
                                    <span className="text">Create Course</span>
                                </>
                            )}
                        </Button>
                    </form>
                </div>
                <div className="create-course-page__right-column" style={{ backgroundImage: `url(${image})` }}></div>
            </div>
        </div>
    );
};

export default CreateCoursePage;
