import React from "react";

import SimpleDropdown from "@/components/conventional/dropdown/SimpleDropdown";
import { languageOptions, showSuccessToast } from "@/utils/Utils";

const LanguageDropdown = () => {
    const OPTIONS = languageOptions();
    return (
        <div className="language-dropdown-wrapper">
            <SimpleDropdown
                placeholder="Choose Language"
                value={[]}
                options={OPTIONS}
                handleChange={() => showSuccessToast(":) Language wont be applied cause endpoint is not ready ")}
            />
        </div>
    );
};

export default LanguageDropdown;
