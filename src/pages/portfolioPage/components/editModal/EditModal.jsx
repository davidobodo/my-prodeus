import React, { memo, useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import Button from "@/components/conventional/button/Button";
import AccSettingsInput from "@/components/conventional/input/AccSettingsInput";
import Spinner from "@/components/conventional/spinner/Spinner";

import userImg from "@/assets/global/user.svg";
import cancelIcon from "@/assets/global/cancel.svg";
import cameraIcon from "@/assets/pages/portfolioPage/camera.svg";

import { BASE_URL } from "@/utils/Url";

import "./EditModal.scss";
import { reqUpdateUser, reqUpdateProfilePicLink } from "@/store/global/slice/AuthSlice";
import { getLocalStorage, setLocalStorage } from "@/utils/Utils";

const EditModal = ({ editInfo, handleEditInfo, user, userToken, profilePicLink }) => {
    //---------------------------------------------------------------------
    //Helpers
    //---------------------------------------------------------------------
    const dispatch = useDispatch();

    //---------------------------------------------------------------------
    //States
    //---------------------------------------------------------------------
    const [isLoading, setIsLoading] = useState(false); //To show loading spinner

    const [profilePicPreview, setProfilePicPreview] = useState(profilePicLink); //Just to preview the picture
    const [profilePic, setProfilePic] = useState(); //Sent to backend

    //Form state manaagement, validations and submitting handled by Formik
    const formik = useFormik({
        initialValues: {
            name: `${user.first_name} ${user.first_name}`, //User already filled this during sign up
            title: user.title || "",
            bio: user.bio || ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required").matches(/\s/, "Name must contain firstname and lastname"),
            title: Yup.string().required("Required"),
            bio: Yup.string().required("Required")
        }),
        onSubmit: (values) => {
            const { bio, title, name } = values;
            const _name = name.split(" ");
            const details = {
                bio,
                title,
                first_name: _name[0],
                last_name: _name[1]
            };
            handleUpdateUserDetails(details);
        }
    });
    const { values, handleSubmit, handleChange, touched, errors, handleBlur } = formik; //extract useful properties and methods from formik

    //---------------------------------------------------------------------
    //Event handlers
    //---------------------------------------------------------------------
    const handleSetProfilePic = useCallback((e) => {
        const file = e.target.files[0];
        setProfilePic(file);

        const imagePreview = URL.createObjectURL(file);
        setProfilePicPreview(imagePreview);
    }, []);

    //---------------------------------------------------------------------
    //Network Requests
    //---------------------------------------------------------------------
    //Async request to update user fields
    const handleUpdateUserDetails = (body) => {
        setIsLoading(true);
        axios
            .post(`${BASE_URL}/user/update`, body, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then((res) => {
                setIsLoading(false);

                //Updata general store
                dispatch(reqUpdateUser(res.data));

                //Update Local storage
                const localStorageData = getLocalStorage("prodeus");
                localStorageData.user = res.data;
                setLocalStorage("prodeus", localStorageData);

                //close modal
                handleEditInfo();
            })
            .catch((err) => {
                setIsLoading(false);
                alert(err);
            });
    };

    //Async request to update profile picture
    const handleUpdateProfilePic = useCallback(() => {
        const formData = new FormData();
        formData.append("profilePicture", profilePic);
        axios
            .post(`${BASE_URL}/user/uploadpicture`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then((res) => {
                //Update store
                dispatch(reqUpdateUser(res.data.user));
                dispatch(reqUpdateProfilePicLink(res.data.imageLink));

                //Update Local storage
                const localStorageData = getLocalStorage("prodeus");
                localStorageData.user = res.data.user;
                localStorageData.profilePicLink = res.data.imageLink;
                setLocalStorage("prodeus", localStorageData);
            })
            .catch((err) => {
                alert(err);
            });
    }, [dispatch, profilePic, userToken]);

    //---------------------------------------------------------------------
    //Use Effects
    //---------------------------------------------------------------------
    useEffect(() => {
        if (profilePic) {
            handleUpdateProfilePic();
        }

        //Clean up when component unmounts
        return () => {
            URL.revokeObjectURL(profilePicPreview);
        };
    }, [profilePic, handleUpdateProfilePic, profilePicPreview]);

    return (
        <Modal onClose={handleEditInfo} open={editInfo} className="edit-modal-component">
            <div className="cancel-icon">
                <img src={cancelIcon} alt="x" onClick={handleEditInfo} />
            </div>
            <form className="edit-modal-component__form" noValidate onSubmit={handleSubmit}>
                <div
                    className="img-wrapper"
                    style={{ backgroundImage: `url(${profilePicPreview ? profilePicPreview : userImg})` }}
                >
                    <input type="file" accept=".jpg, .jpeg, .png" onChange={handleSetProfilePic} />
                    <div className="image">
                        <img src={cameraIcon} alt="" />
                    </div>
                </div>

                <div className="input-wrapper">
                    <AccSettingsInput
                        type="text"
                        placeholder="Name"
                        name="name"
                        id="name"
                        label="Name"
                        value={values.name}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    {touched.name && errors.name ? <div className="input-error-message">{errors.name}</div> : null}
                </div>

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

                <div className="textarea-wrapper">
                    <label htmlFor="">Bio</label>
                    <textarea
                        name="bio"
                        id="bio"
                        placeholder="Tell us about yourself"
                        value={values.bio}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    ></textarea>
                    {touched.bio && errors.bio ? <div className="input-error-message">{errors.bio}</div> : null}
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

export default memo(EditModal);
