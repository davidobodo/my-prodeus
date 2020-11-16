import React, { memo, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import bcrypt from "bcryptjs";

import Button from "@/components/conventional/button/Button";
import Spinner from "@/components/conventional/spinner/Spinner";

import checkmarkIcon from "@/assets/global/dailySnapshot/checkmark.svg";
import cancelIcon from "@/assets/global/dailySnapshot/cancel-red.svg";

import "../../DailySnapshot.scss";

import { reqChangePasswordStart, clearChangePasswordStates } from "@/store/global/slice/AuthSlice";

const PasswordForm = () => {
    const dispatch = useDispatch();

    //Users Password(but hashed so its a secret)
    const hashedPassword = useSelector((state) => state.auth.user._hashed_password);

    //Network response messages
    const resError = useSelector((state) => state.auth.passwordChangeErr);
    const resSuccess = useSelector((state) => state.auth.passwordChangeSuc);

    //Loading state when request is being made
    const isLoading = useSelector((state) => state.auth.isPasswordChangeLoading);

    //See "handleCheckPassword" function
    const [passwordMatched, setPasswordMatched] = useState(false);
    const [displayIcon, setDisplayIcon] = useState(false);

    //Form state management and validations
    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: ""
        },
        validationSchema: Yup.object({
            newPassword: Yup.string()
                .required("New Password Required")
                .min(6, "Password is too short - should be 6 chars minimum.")
        }),
        onSubmit: (values) => {
            const details = {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword
            };
            dispatch(reqChangePasswordStart(details));
        }
    });

    //Check if password user types into "Old password" field matches users "hashed password"(i.e current password)
    const handleCheckPassword = useCallback(() => {
        bcrypt.compare(formik.values.oldPassword, hashedPassword, function (err, isMatch) {
            if (isMatch) {
                setPasswordMatched(true);
                setDisplayIcon(true);
                return;
            } else if (!isMatch) {
                setPasswordMatched(false);
                setDisplayIcon(true);
                return;
            }
        });
    }, [formik.values.oldPassword, hashedPassword]);

    //Clear all states after an async request
    useEffect(() => {
        if (resSuccess || resError) {
            setTimeout(() => {
                formik.setFieldValue("oldPassword", "", false);
                formik.setFieldValue("newPassword", "", false);
                dispatch(clearChangePasswordStates());
            }, 3000);
        }
    }, [resSuccess, resError, dispatch, formik]);

    //input tag was defined instead of using the input component because of the image to be displayed on this particular input
    return (
        <form className="reset-password" onSubmit={formik.handleSubmit} noValidate>
            <div className="input-wrapper">
                <div className="reset-password-input-component">
                    <label className="reset-password-input-component__label">OLD PASSWORD</label>
                    <div className="reset-password-input-component__input">
                        <input
                            type="password"
                            placeholder="old password"
                            name="oldPassword"
                            id="oldPassword"
                            value={formik.values.oldPassword}
                            onChange={formik.handleChange}
                            onBlur={handleCheckPassword}
                        />
                        {passwordMatched && displayIcon && <img src={checkmarkIcon} alt="" />}
                        {!passwordMatched && displayIcon && <img src={cancelIcon} alt="" />}
                    </div>
                </div>
                {formik.touched.oldPassword && formik.errors.oldPassword ? (
                    <div className="input-error-message">{formik.errors.oldPassword}</div>
                ) : null}
            </div>
            <div className="input-wrapper">
                <div className="reset-password-input-component">
                    <label className="reset-password-input-component__label">NEW PASSWORD</label>
                    <div className="reset-password-input-component__input">
                        <input
                            type="password"
                            placeholder="new password"
                            name="newPassword"
                            id="oldPassword"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                </div>
                {formik.touched.newPassword && formik.errors.newPassword ? (
                    <div className="input-error-message">{formik.errors.newPassword}</div>
                ) : null}
            </div>
            <Button type="submit" disabled={!passwordMatched || isLoading}>
                {isLoading ? <Spinner /> : ""}
                <span>Save</span>
            </Button>
            {resSuccess && <h5 className="response-success-message">{resSuccess}</h5>}
            {resError && <h5 className="response-error-message">{resError}</h5>}
        </form>
    );
};

export default memo(PasswordForm);
