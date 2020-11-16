import React, { memo, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import Button from "@/components/conventional/button/Button";
import AccSettingsInput from "@/components/conventional/input/AccSettingsInput";
import Spinner from "@/components/conventional/spinner/Spinner";
import SimpleDropdown from "@/components/conventional/dropdown/SimpleDropdown";

import cancelIcon from "@/assets/global/cancel.svg";

import { BASE_URL } from "@/utils/Url";
import { DIFFICULTY_OPTIONS } from "@/utils/Constants";
import { categoryDropdownOptions } from "@/utils/Utils";

import {
    updateCourseCurrentlyViewedDetails,
    updateCourseCurrentlyViewedClasses
} from "@/store/global/slice/CourseSlice";
import "./EditCourseModal.scss";

const EditCourseModal = ({ editInfo, handleEditCourse, user, userToken, courseInfo, courseClasses }) => {
    //---------------------------------------------------------------------
    //Helpers
    //---------------------------------------------------------------------
    const dispatch = useDispatch();
    const CATEGORY_OPTIONS = categoryDropdownOptions();

    //---------------------------------------------------------------------
    //States
    //---------------------------------------------------------------------
    const [isLoading, setIsLoading] = useState(false); //To show loading spinner
    const [selectedClasses, setSelectedClasses] = useState([]);
    //Form state manaagement, validations and submitting handled by Formik
    const formik = useFormik({
        initialValues: {
            title: courseInfo.title,
            description: courseInfo.description,
            category: courseInfo.category,
            difficulty: courseInfo.difficulty
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
                difficulty
            };
            handleUpdateCourseDetails(details);
        }
    });
    const { values, handleSubmit, handleChange, touched, errors, handleBlur, setFieldValue } = formik; //extract useful properties and methods from formik

    //---------------------------------------------------------------------
    //Add/Remove classes from classes array
    //---------------------------------------------------------------------
    const handleSelectClass = useCallback(
        (value) => {
            //Check if the option just clicked already exists in the selected classes array
            const isPresent = selectedClasses.find((item) => {
                return item === value;
            });

            //If it exists, therefore we want to remove it
            if (isPresent) {
                const _filtered = selectedClasses.filter((item) => {
                    return item !== value;
                });
                setSelectedClasses(_filtered);
                return;
            } else {
                //If it doesnt exist we want to add it
                setSelectedClasses([...selectedClasses, value]);
                return;
            }
        },
        [selectedClasses]
    );

    //---------------------------------------------------------------------
    //Update Course Details
    //---------------------------------------------------------------------
    //Made it async since using async and await would be much cleaner("from code neatness perspective") than promises
    //although i still used promises in some places
    const handleUpdateCourseDetails = async (body) => {
        setIsLoading(true);

        //Edit course info
        axios
            .post(`${BASE_URL}/course/edit/${courseInfo._id}`, body, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then((res) => {
                dispatch(updateCourseCurrentlyViewedDetails(res.data));

                //close modal
                handleEditCourse();
            })
            .catch((err) => {
                alert(err);
            });

        //Delete some course classes

        //Map through all the class id's to be deleted
        const res1 = selectedClasses.map(async (item) => {
            //we want to make request which would take some time, therefore we return a promise
            return new Promise((resolve, reject) => {
                //create request body
                const body = {
                    classId: item,
                    courseId: courseInfo._id
                };

                axios
                    .post(`${BASE_URL}/course/removeclass`, body, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${userToken}`
                        }
                    })
                    .then((res) => {
                        //if successful resolve
                        resolve(res);
                    })
                    .catch((err) => {
                        //if unsuccessful reject
                        reject(err);
                    });
            });
        });

        try {
            //Wait for all selected classes to be deleted before resolving completely
            const res2 = await Promise.all(res1);

            //If successfully, make request to database to access the remaining classes
            const res3 = await axios.get(`${BASE_URL}/course/classes/${courseInfo._id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            });

            if (res3.status === 200) {
                dispatch(updateCourseCurrentlyViewedClasses(res3.data));
            } else {
                throw res3;
            }
        } catch (err) {
            console.log(err);
            // alert(err);
        }

        setIsLoading(false);
    };

    return (
        <Modal onClose={handleEditCourse} open={editInfo} className="edit-course-modal-component">
            <div className="cancel-icon">
                <img src={cancelIcon} alt="x" onClick={handleEditCourse} />
            </div>
            <form className="edit-course-modal-component__form" noValidate onSubmit={handleSubmit}>
                {/* Course title */}
                <div className="input-wrapper">
                    <AccSettingsInput
                        type="text"
                        placeholder="Title"
                        name="title"
                        id="title"
                        label="Title"
                        value={values.title}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    {touched.title && errors.title ? <div className="input-error-message">{errors.title}</div> : null}
                </div>

                {/* Course description */}
                <div className="textarea-wrapper">
                    <label htmlFor="">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Enter course description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    ></textarea>
                    {touched.description && errors.description ? (
                        <div className="input-error-message">{errors.description}</div>
                    ) : null}
                </div>

                {/* Course Category */}
                <div className="dropdown-wrapper">
                    <h6 className="dropdown-wrapper__title">Category</h6>
                    <SimpleDropdown
                        placeholder="Select Category"
                        value={values.category}
                        options={CATEGORY_OPTIONS}
                        handleChange={(value) => setFieldValue("category", value)}
                        name="category"
                    />
                    {touched.category && errors.category ? (
                        <div className="input-error-message">{errors.category}</div>
                    ) : null}
                </div>

                {/* Course Difficulty */}
                <div className="dropdown-wrapper">
                    <h6 className="dropdown-wrapper__title">Difficulty</h6>
                    <SimpleDropdown
                        placeholder="Difficulty"
                        value={values.difficulty}
                        options={DIFFICULTY_OPTIONS}
                        handleChange={(value) => setFieldValue("difficulty", value)}
                        name="difficulty"
                    />
                    {touched.difficulty && errors.difficulty ? (
                        <div className="input-error-message">{errors.difficulty}</div>
                    ) : null}
                </div>

                {/* Classes in course */}
                <div className="course-classes-wrapper">
                    {courseClasses &&
                        courseClasses.map((item, i) => {
                            const { category, title, image, _id: classId } = item.class;

                            const isSelected = selectedClasses.find((item) => {
                                return item === classId;
                            });
                            return (
                                <div className="class-details-wrapper" key={i}>
                                    <div className="class-details">
                                        <div
                                            className="class-details__img-wrapper"
                                            style={{ backgroundImage: `url(${image})` }}
                                        ></div>
                                        <div className="class-details__details">
                                            <h4>{title}</h4>
                                            <h6>{category}</h6>
                                        </div>
                                        <span
                                            className={isSelected ? "icon-wrapper selected" : "icon-wrapper"}
                                            onClick={() => handleSelectClass(classId)}
                                        >
                                            <span></span>
                                            <span></span>
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                </div>

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Spinner />
                            Saving...
                        </>
                    ) : (
                        "Save"
                    )}
                </Button>
            </form>
        </Modal>
    );
};

export default memo(EditCourseModal);
