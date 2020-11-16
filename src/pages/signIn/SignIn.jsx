import React, { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import AuthInput from "@/components/conventional/input/AuthInput";
import Button from "@/components/conventional/button/Button";
import Spinner from "@/components/conventional/spinner/Spinner";

import logo from "@/assets/global/logo-name.svg";

import boyImg from "@/assets/pages/signIn/boy.png";
import key from "@/assets/pages/signIn/key.svg";
import mail from "@/assets/pages/signIn/mail.svg";
import googleIcon from "@/assets/pages/signIn/google.svg";

import { reqSignInStart, reqGoogleAuthStart, reqGetUserFromTokenStart } from "@/store/global/slice/AuthSlice";

import "./SignIn.scss";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SignIn = () => {
    const dispatch = useDispatch();

    const { isLoading } = useSelector((state) => state.auth);
    const { isGoogleLoading } = useSelector((state) => state.auth);
    const { googleLink } = useSelector((state) => state.auth);
    const { signInErr } = useSelector((state) => state.auth);

    const urlToken = useQuery().get("token");

    if (urlToken) {
        dispatch(reqGetUserFromTokenStart(urlToken));
    }
    //-----------------------------------------------------------------
    //Form state management with formik (START)
    //-----------------------------------------------------------------
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string()
                .required("Password provided.")
                .min(6, "Password is too short - should be 6 chars minimum.")
                .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
        }),
        onSubmit: (values) => {
            dispatch(reqSignInStart(values));
        }
    });

    const handleGoogleAuth = useCallback(() => {
        dispatch(reqGoogleAuthStart());
    }, [dispatch]);

    const SIGN_IN = [
        {
            key: 1,
            name: "email",
            id: "email",
            type: "email",
            placeholder: "Email",
            img: mail,
            value: formik.values.email
        },
        {
            key: 2,
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
        <div id="signin-page">
            <div className="left-column">
                <section>
                    <div className="logo-wrapper">
                        <img src={logo} alt="logo" />
                    </div>
                </section>
                <section>
                    <form className="form" onSubmit={formik.handleSubmit} noValidate>
                        {SIGN_IN.map((field) => {
                            const { key, name } = field;
                            return (
                                <div className="input-wrapper" key={key}>
                                    <AuthInput
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
                            <span>Sign In</span>
                        </Button>
                        {signInErr && <h5 className="response-error-message">{signInErr}</h5>}
                    </form>
                    <div className="divider">
                        <span className="text">or</span>
                        <span className="line"></span>
                    </div>
                    <div className="google-auth">
                        <Button type="button" handleOnClick={handleGoogleAuth} disabled={isGoogleLoading}>
                            {isGoogleLoading ? <Spinner /> : ""}
                            <span className="title">Sign In with Google</span>
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
                        Not a member? <Link to="/signup">Sign Up</Link>
                    </div>
                </section>
            </div>
            <div className="right-column">
                <h1>
                    Welcome <br /> back.
                </h1>

                <img src={boyImg} alt="welcome" />
            </div>
        </div>
    );
};

export default SignIn;
