import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { updateWatchedClasses } from "@/store/global/slice/ClassSlice";

import { BASE_URL } from "@/utils/Url";
import { CATEGORIES } from "@/utils/Constants";
import { secondsToHms, secondsToHours, chooseDegreeType, videoDurationToSeconds } from "@/utils/Utils";

const useGetProdegreeInfo = () => {
    const dispatch = useDispatch();

    const { userToken } = useSelector((state) => state.auth);
    const { watchedClasses } = useSelector((state) => state.class);

    const [proDegrees, setProDegrees] = useState([]);

    const categorizeVideosIntoProdegrees = useCallback(() => {
        //Has all the information for all prodegrees;
        let detailedProdegrees = [];

        //Used to categorize videos
        let proDegrees = {
            "Art & Design": [],
            "Computer Science": [],
            Business: [],
            Academics: [],
            Lifestyle: []
        };

        //Assign all watched videos into their respective prodegrees
        //Go through each video watched by user
        watchedClasses.forEach((item) => {
            //Loop through all categories(i.e videos) in database
            for (let mainCategory in CATEGORIES) {
                // for in, allows me to loop through the object, hence i can easily get both the key and value
                for (let subCategory of CATEGORIES[mainCategory]) {
                    //use "CATEGORIES[mainCategory]" to get the value corresponding to key "mainCategpry" (note: "CATEGORIES[mainCategory]" is an array )
                    if (subCategory === item.class.category) {
                        proDegrees[mainCategory].push(item);
                    }
                }
            }
        });

        //For each prodegree
        for (let proDegree in proDegrees) {
            const totalSecondsAvailable = proDegrees[proDegree].reduce((total, video) => {
                return total + videoDurationToSeconds(video.videoDuration);
            }, 0);
            //Time
            const totalSecondsWatched = proDegrees[proDegree].reduce((total, video) => {
                return total + video.totalWatched;
            }, 0);
            const totalHoursWatched = secondsToHours(totalSecondsWatched);
            const totalTimeWatched = secondsToHms(totalSecondsWatched);

            //Credits
            const obtainedCredits = Math.floor(totalSecondsWatched / 1800) * 5;
            const availableCredits = Math.floor(totalSecondsAvailable / 1800) * 5;

            //Degree Type
            const degreeType = chooseDegreeType(totalHoursWatched.toFixed(5));

            //Main object
            let proDegreeInfo = {
                title: proDegree,
                degreeType,
                totalTimeWatched, //in Hms
                totalSecondsWatched, //in s
                totalHoursWatched: totalHoursWatched, //in h
                categories: proDegrees[proDegree], //Contains the videos watched in this prodegree
                obtainedCredits,
                availableCredits
            };
            detailedProdegrees.push(proDegreeInfo);
        }

        setProDegrees(detailedProdegrees);
    }, [watchedClasses]);

    useEffect(() => {
        if (watchedClasses) {
            categorizeVideosIntoProdegrees();
        }
    }, [watchedClasses]);

    //----------------------------------------------------------------
    //Network requests
    //----------------------------------------------------------------
    useEffect(() => {
        // const alexToken =
        // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNodWFpYnVhbGV4YW5kZXJAZ21haWwuY29tIiwibmFtZSI6InNodWFpYnUiLCJpZCI6Ilg5V3IzNEtYUDgiLCJpYXQiOjE2MDI5Nzc3NzAsImV4cCI6MTYzNDUxMzc3MH0.j8MtHC7Do5Au9b47NiczK1SkVtOfezO1hT9NdFDmlbs";
        axios
            .get(`${BASE_URL}/watch/allwithclass`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then((res) => {
                dispatch(updateWatchedClasses(res.data));
            })
            .catch((err) => {
                console.log(err);
                alert(err);
            });
    }, []);

    // console.log(proDegrees, "HELPER HOOK FIRED");

    return { proDegrees, watchedClasses };
};

export default useGetProdegreeInfo;
