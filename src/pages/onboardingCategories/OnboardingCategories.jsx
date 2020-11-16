import React from "react";
import { useHistory } from "react-router-dom";

import CategoryCard from "@/pages/categoriesPage/components/SectionsCard";
import Button from "@/components/conventional/button/Button";

import { CATEGORIES } from "@/utils/Constants";
import "./OnboardingCategories.scss";
const OnboardingCategories = () => {
    const history = useHistory();
    return (
        <div id="onboarding-categories-page">
            <div className="onboarding-categories-page">
                <h1 className="title">
                    Let's follow some <br /> categories
                </h1>
                <h2 className="subtitle">Select at least five</h2>

                <div className="options">
                    {Object.entries(CATEGORIES).map((item, i) => {
                        return item[1].map((cat, i) => {
                            return (
                                <div key={i} className="section-card-wrapper">
                                    <CategoryCard title={cat} mainCategory={item[0]} />
                                </div>
                            );
                        });
                    })}
                </div>
                <div className="btn-wrapper">
                    <Button variant="double-blue" handleOnClick={() => history.push("/activity")}>
                        Get Started
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingCategories;
