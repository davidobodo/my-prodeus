import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "@/components/conventional/button/Button";
import SimpleDropdown from "@/components/conventional/dropdown/SimpleDropdown";
import MultipleSelectionDropdownPlusIcon from "@/components/conventional/dropdown/MultipleSelectionDropdownPlusIcon";
import Spinner from "@/components/conventional/spinner/Spinner";

import image from "@/assets/pages/addClassPage/class-img.png";
import plusIcon from "@/assets/pages/addClassPage/plus.svg";

import { YOUTUBE_API_URL, BASE_URL } from "@/utils/Url";

import { DIFFICULTY_OPTIONS, TOPICS } from "@/utils/Constants";
import { categoryDropdownOptions } from "@/utils/Utils";

import "./AddClassPage.scss";

const Page = () => {
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
            url: "",
            title: "",
            description: "",
            category: "",
            topics: [],
            difficulty: "",
            youtubeId: "",
            duration: "",
            instructor: "",
            instructorImage: ""
        },
        validationSchema: Yup.object({
            url: Yup.string()
                .required("Required")
                .matches(/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/, "Must be a youtube link"),
            topics: Yup.string().required("Select at least one topic"),
            category: Yup.string().required("Required"),
            difficulty: Yup.string().required("Required")
        }),
        onSubmit: (values) => {
            const {
                title,
                description,
                category,
                topics,
                difficulty,
                youtubeId,
                duration,
                instructor,
                instructorImage
            } = values;
            const details = {
                title,
                description,
                duration,
                category,
                difficulty,
                language: "English",
                youtubeID: youtubeId,
                topics,
                instructor,
                instructorImage
            };
            handleRequestAddClass(details);
        }
    });
    const { values, handleSubmit, handleChange, touched, errors, handleBlur, setFieldValue } = formik; //extract useful properties and methods from formik

    //---------------------------------------------------------------------
    //Helper Functions
    //---------------------------------------------------------------------
    //Extract the video Id from the youtube video link
    const handleExtractYoutubeVideoId = useCallback((url) => {
        const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return match && match[1].length == 11 ? match[1] : false;
    }, []);

    const handleGetVideoInfo = useCallback(
        async (url) => {
            const youtubeId = handleExtractYoutubeVideoId(url);
            const videoInfo = await handleFetchYoutubeVideoContent(youtubeId);
            setFieldValue("youtubeId", youtubeId, false); //false indicates do not fire any validation
            setFieldValue("duration", videoInfo.duration, false);
            setFieldValue("title", videoInfo.title, false);
            setFieldValue("description", videoInfo.description, false);
            setFieldValue("instructor", videoInfo.instructor, false);
            setFieldValue("instructorImage", videoInfo.instructorImage, false);
        },
        [handleExtractYoutubeVideoId, setFieldValue]
    );

    //---------------------------------------------------------------------
    //Network Requests
    //---------------------------------------------------------------------
    //Get all info about youtube video from videos Id
    async function handleFetchYoutubeVideoContent(youtubeId) {
        const { data } = await axios.get(
            `${YOUTUBE_API_URL}?id=${youtubeId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=contentDetails,snippet`
        );

        if (!data.items.length) {
            console.log("\n\n\n\n\n\n undefined data \n\n\n\n\n\n");
            return "remove";
        }

        const youtubeData = data.items[0].snippet;
        const duration = data.items[0].contentDetails.duration;
        const hours = moment.duration(duration).hours();
        const minutes = moment.duration(duration).minutes();
        const seconds = moment.duration(duration).seconds();
        const time = hours > 0 ? `${hours}hrs ${minutes}m` : `${minutes}m ${seconds}s`;

        return {
            id: youtubeId,
            title: youtubeData.title,
            description: youtubeData.description,
            image: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
            duration: time,
            instructor: youtubeData.channelTitle,
            instructorImage: youtubeData.thumbnails.default.url
        };
    }

    //Network request to add class (This request is made here cause its response has no "direct" effect on the global state)
    const handleRequestAddClass = (body) => {
        setIsLoading(true);
        axios
            .post(`${BASE_URL}/class/add`, body, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then((res) => {
                setIsLoading(false);
                console.log(res);
                const details = res.data;
                history.push({ pathname: "/library-class", state: { details } });
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            });
    };

    //---------------------------------------------------------------------
    //UseEffects
    //---------------------------------------------------------------------
    //Make sure its a valid youtube link being put into the url field before performing any youtube related action
    useEffect(() => {
        const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
        if (values.url && errors.url !== true && youtubeRegex.test(values.url)) {
            handleGetVideoInfo(`${values.url}`);
        }
    }, [values.url, errors.url, handleGetVideoInfo]);

    const dropdownOptionsGenerator = () => {};

    useEffect(() => {}, []);

    return (
        <div id="add-class-page">
            <div className="add-class-page">
                <div className="add-class-page__left-column">
                    <h1 className="add-class-page__left-column__header">Add Class</h1>
                    <form noValidate onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <div className="add-class-page__input-component">
                                <label className="add-class-page__input-component__label">URL</label>
                                <div className="add-class-page__input-component__input">
                                    <input
                                        type="text"
                                        placeholder="Youtube URL"
                                        name="url"
                                        id="url"
                                        value={values.url}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                {touched.url && errors.url ? (
                                    <div className="input-error-message">{errors.url}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="input-wrapper">
                            <div className="add-class-page__input-component">
                                <label className="add-class-page__input-component__label">TITLE</label>
                                <div className="add-class-page__input-component__input">
                                    <input
                                        type="text"
                                        placeholder="Class Title"
                                        name="title"
                                        id="title"
                                        value={values.title}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="textarea-wrapper">
                            <div className="add-class-page__textarea-component">
                                <label htmlFor="">Description</label>
                                <textarea
                                    name=""
                                    id=""
                                    cols=""
                                    rows=""
                                    placeholder="Write a description"
                                    value={values.description}
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
                            />
                            {touched.category && errors.category ? (
                                <div className="input-error-message">{errors.category}</div>
                            ) : null}
                        </div>

                        <div className="dropdown-wrapper">
                            <h6>Topics</h6>
                            <MultipleSelectionDropdownPlusIcon
                                value={values.topics}
                                options={TOPICS}
                                handleChange={(value) => setFieldValue("topics", value)}
                                name="topics"
                                placeholder="Add Topics..."
                            />
                            {touched.topics && errors.topics ? (
                                <div className="input-error-message">{errors.topics}</div>
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
                            />
                            {touched.difficulty && errors.difficulty ? (
                                <div className="input-error-message">{errors.difficulty}</div>
                            ) : null}
                        </div>

                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Spinner />
                                    Adding Class...
                                </>
                            ) : (
                                <>
                                    <span className="icon-wrapper">
                                        <img src={plusIcon} alt="+" />
                                    </span>
                                    <span className="text">Add Class</span>
                                </>
                            )}
                        </Button>
                    </form>
                </div>
                <div className="add-class-page__right-column" style={{ backgroundImage: `url(${image})` }}></div>
            </div>
        </div>
    );
};

export default Page;
