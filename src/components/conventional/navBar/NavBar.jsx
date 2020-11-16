import React, { memo, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CircularProgress from "@/components/specific/progressBars/CircularProgress";

import logo from "@/assets/global/logo-full.svg";
import ActivityIcon from "@/assets/global/Activity.jsx";
import PortfolioIcon from "@/assets/global/Portfolio.jsx";
import LibraryIcon from "@/assets/global/Library.jsx";
import userImg from "@/assets/global/user.svg";

import { COLORS } from "@/utils/Constants";

import "./NavBar.scss";
import { useEffect } from "react";
import { reqShowFilterModal } from "@/store/global/slice/UtilSlice";

const { blue } = COLORS;
const Navbar = ({ handleShowDailySnapshot, profilePic }) => {
    const dispatch = useDispatch();
    const { showFilterModal } = useSelector((state) => state.utils);
    const [imgSize, setImgSize] = useState("65");

    const handleResizeScreen = useCallback(() => {
        if (window.innerWidth <= 992) {
            setImgSize("50");
        } else {
            setImgSize("65");
        }
    }, []);

    const handleClickNavbar = useCallback(() => {
        if (showFilterModal) {
            dispatch(reqShowFilterModal());
        }
    }, [showFilterModal, dispatch]);

    useEffect(() => {
        window.addEventListener("resize", handleResizeScreen);

        return () => window.removeEventListener("resize", handleResizeScreen);
    });
    return (
        <div className="navbar-component" onClick={handleClickNavbar}>
            <div className="left-column">
                <div className="logo-wrapper">
                    <img
                        src={logo}
                        alt="logo"
                        onClick={() =>
                            alert(
                                "Im feeling lucky video should pop up, 😁😁 we havent talked about this, in details yet"
                            )
                        }
                    />
                </div>
            </div>
            <div className="right-column">
                <NavLink to="/activity">
                    <ActivityIcon />
                    Activity
                </NavLink>
                <NavLink to="/library/discover" exact>
                    <LibraryIcon />
                    Library
                </NavLink>
                <NavLink to="/portfolio">
                    <PortfolioIcon />
                    Portfolio
                </NavLink>
                <div className="user" onClick={handleShowDailySnapshot}>
                    <CircularProgress
                        percent="30"
                        color={blue}
                        trailColor="rgba(180, 180, 201, 0.4)"
                        size={imgSize}
                        strokeWidth="7"
                    >
                        <div className="img-wrapper">
                            <img src={profilePic || userImg} alt="" />
                        </div>
                    </CircularProgress>
                </div>
            </div>
        </div>
    );
};

export default memo(Navbar);
