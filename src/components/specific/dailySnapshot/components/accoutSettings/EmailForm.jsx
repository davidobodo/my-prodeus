import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import AccSettingsInput from "@/components/conventional/input/AccSettingsInput";
import Button from "@/components/conventional/button/Button";
import Spinner from "@/components/conventional/spinner/Spinner";

import { BASE_URL } from "@/utils/Url";

import "../../DailySnapshot.scss";
import { reqUpdateUser } from "@/store/global/slice/AuthSlice";
import { getLocalStorage, setLocalStorage } from "@/utils/Utils";
const EmailForm = () => {
    //---------------------------------------------------------------------
    //Helpers
    //---------------------------------------------------------------------
    const dispatch = useDispatch();
    const { userToken } = useSelector((state) => state.auth);

    //---------------------------------------------------------------------
    //States
    //---------------------------------------------------------------------
    const [isLoading, setIsLoading] = useState(false); //To show loading spinner

    //Response messages to display after async request
    const [resMessages, setResMessages] = useState({
        success: "",
        error: ""
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            confirmEmail: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
            confirmEmail: Yup.string()
                .oneOf([Yup.ref("email"), null], "Must match email field")
                .required("Required")
        }),
        onSubmit: (values) => {
            const details = {
                email: values.email
            };
            handleUpdateUserDetails(details);
        }
    });
    const { handleBlur, handleChange, handleSubmit, values, touched, errors, setFieldValue } = formik;

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
                setResMessages({ ...resMessages, success: "Email Updated Successfully" });
            })
            .catch((err) => {
                setIsLoading(false);
                alert(err);
                setResMessages({ ...resMessages, success: "Sorry update failed" });
            });
    };

    //---------------------------------------------------------------------
    //Use Effects
    //---------------------------------------------------------------------
    //Reset all states after an async request
    useEffect(() => {
        if (resMessages.success || resMessages.error) {
            setTimeout(() => {
                setFieldValue("email", "", false);
                setFieldValue("confirmEmail", "", false);
                setResMessages({
                    success: "",
                    error: ""
                });
            }, 3000);
        }
    }, [resMessages, setFieldValue]);

    return (
        <form className="update-email" noValidate onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <AccSettingsInput
                    type="email"
                    placeholder="Email"
                    name="email"
                    id="email"
                    label="EMAIL ADDRESS"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.email}
                />
                {touched.email && errors.email ? <div className="input-error-message">{errors.email}</div> : null}
            </div>
            <div className="input-wrapper">
                <AccSettingsInput
                    type="email"
                    placeholder="Confirm Email"
                    name="confirmEmail"
                    id="confirmEmail"
                    label="CONFIRM EMAIL ADDRESS"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.confirmEmail}
                />
                {touched.confirmEmail && errors.confirmEmail ? (
                    <div className="input-error-message">{errors.confirmEmail}</div>
                ) : null}
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
            {resMessages.success && <h5 className="response-success-message">{resMessages.success}</h5>}
            {resMessages.error && <h5 className="response-error-message">{resMessages.error}</h5>}
        </form>
    );
};

export default EmailForm;
