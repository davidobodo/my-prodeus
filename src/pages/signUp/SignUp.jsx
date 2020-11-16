import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import AuthInput from "@/components/conventional/input/AuthInput";
import Button from "@/components/conventional/button/Button";
import Spinner from "@/components/conventional/spinner/Spinner";

import logo from "@/assets/global/logo-name.svg";

import girlImg from "@/assets/pages/signIn/girl.png";
import key from "@/assets/pages/signIn/key.svg";
import mail from "@/assets/pages/signIn/mail.svg";
import user from "@/assets/pages/signIn/user.svg";
import googleIcon from "@/assets/pages/signIn/google.svg";

import "./SignUp.scss";

import { reqSignUpStart, reqGoogleAuthStart } from "@/store/global/slice/AuthSlice";

const SignUp = () => {
    const dispatch = useDispatch();

    const { isLoading } = useSelector((state) => state.auth);
    const { isGoogleLoading } = useSelector((state) => state.auth);
    const { googleLink } = useSelector((state) => state.auth);
    const { signUpErr } = useSelector((state) => state.auth);

    //-----------------------------------------------------------------
    //Form state management with formik (START)
    //-----------------------------------------------------------------
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required").matches(/\s/, "Name must contain firstname and lastname"),
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string()
                .required("No password provided.")
                .min(6, "Password is too short - should be 6 chars minimum.")
                .matches(/[a-zA-Z]/, "Password can only contain letters.")
        }),
        onSubmit: (values) => {
            dispatch(reqSignUpStart(values));
        }
    });
    //-----------------------------------------------------------------
    //Form state management with formik (END)
    //-----------------------------------------------------------------

    const handleGoogleAuth = useCallback(() => {
        dispatch(reqGoogleAuthStart());
    }, [dispatch]);

    const SIGN_UP = [
        {
            key: 1,
            name: "name",
            id: "name",
            type: "text",
            placeholder: "Name",
            img: user,
            value: formik.values.name
        },
        {
            key: 2,
            name: "email",
            id: "email",
            type: "email",
            placeholder: "Email",
            img: mail,
            value: formik.values.email
        },
        {
            key: 3,
            name: "password",
            id: "password",
            type: "password",
            placeholder: "Password",
            img: key,
            value: formik.values.password
        }
    ];

    if (googleLink) {
        window.location.href = `${googleLink}`;
        return null;
    }

    return (
        <div id="signup-page">
            <div className="left-column">
                <section>
                    <div className="logo-wrapper">
                        <img src={logo} alt="logo" />
                    </div>
                </section>
                <section>
                    <form className="form" onSubmit={formik.handleSubmit} noValidate>
                        {SIGN_UP.map((field) => {
                            const { key, name } = field;
                            return (
                                <div className="input-wrapper">
                                    <AuthInput
                                        key={key}
                                        {...field}
                                        handleChange={formik.handleChange}
                                        handleBlur={formik.handleBlur}
                                    />
                                    {formik.touched[name] && formik.errors[name] ? (
                                        <div className="error-message">{formik.errors[name]}</div>
                                    ) : null}
                                </div>
                            );
                        })}
                        <Button type="submit" variant="" disabled={isLoading}>
                            {isLoading ? <Spinner /> : ""}
                            <span>Sign Up</span>
                        </Button>
                        {signUpErr && <h5 className="response-error-message">{signUpErr}</h5>}
                    </form>
                    <div className="divider">
                        <span className="text">or</span>
                        <span className="line"></span>
                    </div>
                    <div className="google-auth">
                        <Button type="text" handleOnClick={handleGoogleAuth} disabled={isGoogleLoading}>
                            {isGoogleLoading ? <Spinner /> : ""}
                            <span className="title">Sign Up with Google</span>
                            <span className="google-icon-wrapper">
                                <img src={googleIcon} alt="google" />
                            </span>
                        </Button>
                    </div>
                    <p className="terms-conditions">
                        By registering you agree to our{" "}
                        <a href="https://www.prodeus.co/terms-conditions" target="_blank">
                            Terms &amp; Conditions
                        </a>
                    </p>
                    <div className="enquiry">
                        Already a member? <Link to="/">Login</Link>
                    </div>
                </section>
            </div>
            <div className="right-column">
                <h1>
                    Create an <br /> account
                </h1>

                <img src={girlImg} alt="welcome" />
            </div>
        </div>
    );
};

export default SignUp;
