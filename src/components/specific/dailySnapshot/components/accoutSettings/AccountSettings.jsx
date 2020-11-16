import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import back2Icon from "@/assets/global/back2.svg";

import mailIcon from "@/assets/global/dailySnapshot/mail.svg";
import keyIcon from "@/assets/global/dailySnapshot/key.svg";
import languageIcon from "@/assets/global/dailySnapshot/language.svg";
import logoutIcon from "@/assets/global/dailySnapshot/logout.svg";

import EmailForm from "./EmailForm";
import PasswordForm from "./PasswordForm";
import LanguageDropdown from "./LanguageDropdown";

import { reqLogout } from "@/store/global/slice/AuthSlice";
import { clearLocalStorage } from "@/utils/Utils";

import "../../DailySnapshot.scss";

const AccountSettings = ({ handleShowAccountSettings, handleShowDailySnapshot }) => {
    const dispatch = useDispatch();

    const [showEmailForm, setShowEmailForm] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

    const handleShowEmailForm = useCallback(() => {
        setShowEmailForm(!showEmailForm);
    }, [showEmailForm]);

    const handleShowPasswordForm = useCallback(() => {
        setShowPasswordForm(!showPasswordForm);
    }, [showPasswordForm]);

    const handleShowLanguageDropdown = useCallback(() => {
        setShowLanguageDropdown(!showLanguageDropdown);
    }, [showLanguageDropdown]);

    const handleLogout = useCallback(() => {
        handleShowDailySnapshot();
        clearLocalStorage("prodeus");
        dispatch(reqLogout());
    }, [dispatch, handleShowDailySnapshot]);

    return (
        <div className="account-settings">
            <div className="icon-wrapper">
                <img src={back2Icon} alt="cancel" onClick={handleShowAccountSettings} />
            </div>
            <h2>Account Settings</h2>
            <div className="form-wrapper">
                <h3 className="form-wrapper__title" onClick={handleShowLanguageDropdown}>
                    <img src={languageIcon} alt="" />
                    Language
                </h3>

                {showLanguageDropdown && <LanguageDropdown />}
            </div>
            <div className="form-wrapper">
                <h3 className="form-wrapper__title" onClick={handleShowEmailForm}>
                    <img src={mailIcon} alt="" />
                    Update Email
                </h3>
                {showEmailForm && <EmailForm />}
            </div>
            <div className="form-wrapper">
                <h3 className="form-wrapper__title" onClick={handleShowPasswordForm}>
                    <img src={keyIcon} alt="" />
                    Reset password
                </h3>
                {showPasswordForm && <PasswordForm />}
            </div>
            <button className="btn-logout" onClick={handleLogout}>
                {" "}
                <img src={logoutIcon} alt="" />
                Logout
            </button>
        </div>
    );
};

export default AccountSettings;
