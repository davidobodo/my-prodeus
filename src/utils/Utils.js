import { CATEGORIES, COLORS, ALL_LANGUAGES } from "./Constants";
import { toast } from "react-toastify";
const {
    choiceBlue,
    choiceGreen,
    choicePurple,
    choiceLightBlue,
    choiceLightGreen,
    choiceLightPurple,
    choiceRed,
    choiceLightRed,
    choiceYellow,
    choiceLightYellow,
    choiceAsh,
    choiceLightAsh
} = COLORS;

export const setLocalStorage = (identifier, payload) => {
    localStorage.setItem(identifier, JSON.stringify(payload));
};

export const clearLocalStorage = (identifier) => {
    localStorage.removeItem(identifier);
};

export const getLocalStorage = (identifier) => {
    const info = localStorage.getItem(identifier);
    if (!!info) {
        return JSON.parse(info);
    } else {
        return null;
    }
};

export const convertToUrlString = (string) => {
    return string.toLowerCase().split(" ").join("-").split("/").join("-");
};

export const capitalizeFirstLetter = (word) => {
    //Check how many words
    const words = word.split("-").length;

    if (words === 1) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
        return word.split("-").reduce((a, b) => {
            const _a = a.charAt(0).toUpperCase() + a.slice(1); //change first letter to uppercase
            const _b = b.charAt(0).toUpperCase() + b.slice(1); //change first letter to uppercase
            return _a + " " + _b;
        });
    }
};

export const imageUrlBuilder = (userId, image) => {
    return `${process.env.REACT_APP_S3LINK}/users/${userId}/${image}`;
};

export const secondsToHms = (d) => {
    d = Number(d);
    let h = Math.floor(d / 3600);
    let m = Math.floor((d % 3600) / 60);
    let s = Math.floor((d % 3600) % 60);

    let hDisplay = h > 0 ? h + "h " : "";
    let mDisplay = m > 0 ? m + "m " : "";
    let sDisplay = s > 0 ? s + "s" : "";
    return hDisplay + mDisplay + sDisplay;
};

export const secondsToHours = (sec) => {
    return sec / 3600;
};

export const chooseDegreeType = (hours) => {
    if (hours < 5) {
        return "No Credits";
    } else if (5 <= hours < 20) {
        return "Interested";
    } else if (20 <= hours < 100) {
        return "Pursuing";
    } else if (100 <= hours < 200) {
        return "Apprentice";
    } else if (200 <= hours < 350) {
        return "Proficient";
    } else if (350 <= hours < 500) {
        return "Proficient I";
    } else if (500 <= hours < 650) {
        return "Advanced";
    } else if (650 <= hours < 800) {
        return "Advanced I";
    } else if (800 <= hours < 1000) {
        return "Advanced II";
    } else if (1000 <= hours < 2000) {
        return "Expert";
    } else if (2000 <= hours < 5000) {
        return "Master";
    } else if (5000 <= hours) {
        return "Grandmaster";
    }
};

//Takes in an array of video objects
//Gives out an array of unique categories and their respective total time watched
export const getUniqueCategoriesAndTheirTotalTimeWatched = (categories) => {
    //Get categories and the time watched
    let uniqueCategoriesAndTimeWatched = [];
    let allCategoriesAndTimeWatched = [];

    //Select all categories user has watched
    //but since User may watch more than one video that belongs to a particular category
    //Make sure you do not duplicate a category, hence the use of "Set"
    let uniqueCategories = new Set();

    //categories is an array of all videos watched
    categories.forEach((item) => {
        uniqueCategories.add(item.class.category);
        allCategoriesAndTimeWatched.push([item.class.category, item.totalWatched]);
    });
    let transformedUniqueCategories = [...uniqueCategories]; //Change Set to array

    //Loop through each unique category
    for (let category of transformedUniqueCategories) {
        //Group videos that belong to the same category from all categories
        const data = allCategoriesAndTimeWatched.filter((item) => {
            return item[0] === category;
        });

        const totalTimeInSeconds = data.reduce((total, item) => {
            return total + item[1];
        }, 0);

        uniqueCategoriesAndTimeWatched.push({
            title: category,
            hms: secondsToHms(totalTimeInSeconds),
            sec: totalTimeInSeconds
        });
    }

    return uniqueCategoriesAndTimeWatched;
};

//Takes in an array of prodegrees
export const getTotalVideoSecondsWatched = (proDegrees) => {
    const data = proDegrees.reduce((total, item) => {
        return total + item.totalSecondsWatched;
    }, 0);

    return data;
};

export const videoDurationToSeconds = (duration) => {
    //has duration in hours, minutes and seconds
    const timeArray = duration.split(" ");

    //has duration in seconds i.e, hours and minutes have been converted, but not yet summed. hence you have something like [7200,874, 98]
    const timeArrayToSeconds = timeArray.map((time) => {
        //check if value is in hours, minutes, or second
        if (time.slice(-3) === "hrs") {
            return parseInt(time) * 3600;
        } else if (time.slice(-1) === "m") {
            return parseInt(time) * 60;
        } else if (time.slice(-1) === "s") {
            return parseInt(time);
        }
    });

    //has total duration in seconds for one video
    const totalSeconds = timeArrayToSeconds.reduce((sum, b) => {
        return sum + b;
    }, 0);

    return totalSeconds;
};

export const renderEmoji = (category) => {
    switch (category) {
        case "3D Design":
            return `📐`;
        case "Animation":
            return `💥`;
        case "Architecture":
            return `🏛️`;
        case "Fashion Design":
            return `👚`;
        case "Fine Art":
            return `🎨`;
        case "Game Design":
            return `🕹️`;
        case "Graphic Design":
            return `🖼️`;
        case "Identity Design":
            return `💫`;
        case "Illustration":
            return `🖊️`;
        case "Music":
            return `🎹`;
        case "Music Production":
            return `🎛️`;
        case "Photography":
            return `📷`;
        case "Product Design":
            return `🖱️`;
        case "Typography":
            return `⌨️`;
        case "UI/UX Design":
            return `🤖`;
        case "Videography":
            return `🎥`;
        case "Web Design":
            return `💻`;
        case "Writing":
            return `👩‍💻`;
        case "Blockchain":
            return `🔗`;
        case "Cybersecurity":
            return `🔐`;
        case "Data Science":
            return `🗄️`;
        case "Databases":
            return `💾`;
        case "E-Commerce":
            return `🛍️`;
        case "Game Development":
            return `🕹️`;
        case "Mobile App Development":
            return `📱`;
        case "Web Development":
            return `🖥️`;
        case "Artificial Intelligence":
            return `🤖`;
        case "Advertising":
            return `🌠`;
        case "Accounting":
            return `🗃️`;
        case "Branding":
            return `⚜️`;
        case "Business Law":
            return `💼`;
        case "Cryptocurrency":
            return `💱`;
        case "Data & Analytics":
            return `📊`;
        case "Entrepreneurship":
            return `👔`;
        case "Finance":
            return `💸`;
        case "Growth Hacking":
            return `🦄`;
        case "Human Resources":
            return `👩🏽‍💼`;
        case "Management":
            return `🧑🏾‍💼`;
        case "Marketing":
            return `🎯`;
        case "Productivity":
            return `⌚`;
        case "Public Relations":
            return `👀`;
        case "Search Engine Optimization":
            return `✨`;
        case "Social Media":
            return `#️⃣`;
        case "Anthropology":
            return `🧿`;
        case "Archaeology":
            return `⛏️`;
        case "Arts":
            return `🎭`;
        case "Astronomy":
            return `🪐`;
        case "Biology":
            return `🧬`;
        case "Chemistry":
            return `🧪`;
        case "Earth Science":
            return `🌎`;
        case "Economics":
            return `📊`;
        case "Engineering":
            return `⚙️`;
        case "Geography":
            return `🌐`;
        case "History":
            return `📖`;
        case "Languages":
            return `🧏`;
        case "Law":
            return `⚖️`;
        case "Mathematics":
            return `🧮`;
        case "Political Science":
            return `🗳️`;
        case "Philosophy":
            return `📜`;
        case "Physics":
            return `🚄`;
        case "Psychology":
            return `🧠`;
        case "Sociology":
            return `🏙️`;
        case "Theology":
            return `✝️`;
        case "Cooking":
            return `🍳`;
        case "Wellness":
            return `😊`;
        case "Personal Development":
            return `💪`;
        default:
            return null;
    }
};

export const categoryDropdownOptions = () => {
    let allCategories = [];
    let finalOptions = [];

    //Put all categories into one array
    Object.values(CATEGORIES).forEach((item) => {
        item.forEach((category) => {
            allCategories.push(category);
        });
    });

    allCategories.forEach((item, index) => {
        let data = {
            key: index + 1,
            text: `${renderEmoji(item)} ${item}`,
            value: item
        };
        finalOptions.push(data);
    });

    return finalOptions;
};

export const languageOptions = () => {
    let languages = [];
    ALL_LANGUAGES.forEach((item, index) => {
        let data = {
            key: index + 1,
            text: item,
            value: item
        };

        languages.push(data);
    });

    return languages;
};

export const replaceNanWithZero = (value) => {
    if (Number.isNaN(value)) {
        return 0;
    } else if ((value = "NaN")) {
        return 0;
    } else {
        return value;
    }
};

export const getLoopCount = (dayOfTheWeek) => {
    switch (dayOfTheWeek) {
        case 0:
            return 13;
        case 6:
            return 12;
        case 5:
            return 11;
        case 4:
            return 10;
        case 3:
            return 9;
        case 2:
            return 8;
        case 1:
            return 7;
    }
};

export const getDayPrefix = (dayOfTheWeek) => {
    switch (dayOfTheWeek) {
        case 0:
            return "S";
        case 6:
            return "S";
        case 5:
            return "F";
        case 4:
            return "T";
        case 3:
            return "W";
        case 2:
            return "T";
        case 1:
            return "M";
    }
};

export const assignColor = (i) => {
    switch (i) {
        case 0:
            return choiceBlue;
        case 1:
            return choiceYellow;
        case 2:
            return choiceGreen;
        case 3:
            return choiceRed;
        case 4:
            return choicePurple;
        case 5:
            return choiceAsh;
    }
};

export const showSuccessToast = (message) => {
    return toast.success(`${message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    });
};

export const showErrorToast = (message) => {
    return toast.error(`${message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    });
};
