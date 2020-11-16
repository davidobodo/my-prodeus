import { useState, useCallback, useEffect } from "react";

/*
Three states to take note of:
1.mainClasses
2.filteredVideos
3.displayedVideos
*/
const useSearchAndFilter = (mainVideos, videoObjectHasClassField) => {
    //----------------------------------------------------------------------------
    //State
    //----------------------------------------------------------------------------
    const [showFilterSidebar, setShowFilterSidebar] = useState(false);
    const [filteredVideos, setFilteredVideos] = useState([]); //Has classes from database but filtered using filter sidebar
    const [displayedVideos, setDisplayedVideos] = useState([]); // Has classes from database but filtered using filter sidebar yet also filtered using search input
    const [searchValue, setSearchValue] = useState("");

    const [sortBy, setSortBy] = useState("Newest");
    const [filters, setFilters] = useState({
        categories: [],
        topics: [],
        difficulties: []
    });

    //----------------------------------------------------------------------------
    //Helper Functions
    //----------------------------------------------------------------------------

    const handleSortBy = useCallback((e) => {
        setSortBy(e.target.dataset.name);
    }, []);

    const handleSetSearchValue = useCallback((e) => {
        setSearchValue(e.target.value);
    }, []);

    const handleShowFilterSidebar = useCallback(() => {
        setShowFilterSidebar(!showFilterSidebar);
    }, [showFilterSidebar]);

    const handleSetFilters = (value, category) => {
        setFilters((prevState) => {
            return {
                ...prevState,
                [category]: value
            };
        });
    };

    //----------------------------------------------------------------------------
    //Apply filters and sorting
    //This architecture is poor, ideally all these logic should go inside teh filter sidebar component
    //But unfortunately the discrepancy in the type of data being sent from the backend restricts us from doing so
    //Nevertheless this works
    //----------------------------------------------------------------------------
    const handleApplyFilters = useCallback(() => {
        //create a duplicate of all videos in this page
        //We use mainVideos instead of displayedVideos because we want to perform our filter on the entire videos on this page.
        //Whereas mainVideos contains all the videos on this page, displayedVideos varies in the videos it contains
        let filteredContent = [...mainVideos];

        if (filters.categories.length !== 0) {
            //Check each videos category and see if a videos category is present in our category list to be filtered
            filteredContent = filteredContent.filter((video) => {
                if (videoObjectHasClassField) {
                    return filters.categories.includes(video.class.category);
                } else {
                    return filters.categories.includes(video.category);
                }
            });
        }

        if (filters.topics.length !== 0) {
            //Check each videos category and see if a videos category is present in our category list to be filtered
            filteredContent = filteredContent.filter((video) => {
                //go through each topic in our topics array
                filters.topics.forEach((topic) => {
                    //Note: Topics is an array and not a single value, hence why we check its own array and not our queries array
                    if (videoObjectHasClassField) {
                        return video.class.topics.includes(topic);
                    } else {
                        return video.topics.includes(topic);
                    }
                });
            });
        }

        if (filters.difficulties.length !== 0) {
            //Check each videos category and see if a videos category is present in our category list to be filtered
            filteredContent = filteredContent.filter((video) => {
                if (videoObjectHasClassField) {
                    return filters.difficulties.includes(video.class.difficulty);
                } else {
                    return filters.difficulties.includes(video.difficulty);
                }
            });
        }

        if (sortBy) {
            if (sortBy === "Newest") {
                filteredContent = filteredContent.sort((a, b) => {
                    //convert the dates to milliseconds and compare
                    return new Date(`${b._updated_at}`).getTime() - new Date(`${a._updated_at}`).getTime();
                });
            }

            if (sortBy === "Oldest") {
                filteredContent = filteredContent.sort((a, b) => {
                    //convert the dates to milliseconds and compare
                    return new Date(`${a._updated_at}`).getTime() - new Date(`${b._updated_at}`).getTime();
                });
            }

            if (sortBy === "Most Popular") {
            }

            if (sortBy === "Highest Rated") {
            }
        }

        setFilteredVideos(filteredContent);
    }, [filters, sortBy, mainVideos]);

    //----------------------------------------------------------------------------
    //If watched classes changes for any reason update our displayed videos
    //----------------------------------------------------------------------------
    useEffect(() => {
        //set the videos to be displayed and the videos to apply our filter sidebar filtering to
        setFilteredVideos(mainVideos);
    }, [mainVideos]);

    useEffect(() => {
        //display these videos
        setDisplayedVideos(filteredVideos);
    }, [filteredVideos]);

    //----------------------------------------------------------------------------
    //Apply search on displayed videos
    //----------------------------------------------------------------------------
    useEffect(() => {
        const data = filteredVideos.filter((item) => {
            if (videoObjectHasClassField) {
                return (
                    //check instructor
                    //For efficiency convert both fields to lower case
                    item.class.instructor.toLowerCase().includes(searchValue.toLowerCase()) ||
                    //check topics
                    //loop through each topic associated with this video
                    //"some" method returns either true or false
                    item.class.topics.some((value) => {
                        return value.toLowerCase().includes(searchValue.toLowerCase());
                    })
                );
            } else if (item.topics && item.instructor) {
                //if we are looping through a course these fields do not exist
                //In essence search doesnt work on courses
                return (
                    //check instructor
                    //For efficiency convert both fields to lower case
                    item.instructor.toLowerCase().includes(searchValue.toLowerCase()) ||
                    //check topics
                    //loop through each topic associated with this video
                    //"some" method returns either true or false
                    item.topics.some((value) => {
                        return value.toLowerCase().includes(searchValue.toLowerCase());
                    })
                );
            } else {
                return item;
            }
        });

        setDisplayedVideos(data);
    }, [searchValue]);

    const handleClearFilters = () => {
        setFilters((prevState) => {
            return {
                // ...prevState,
                categories: [],
                topics: [],
                difficulties: []
            };
        });

        setSortBy("Newest");
    };

    return {
        showFilterSidebar,
        handleShowFilterSidebar,
        searchValue,
        handleSetSearchValue,
        displayedVideos,
        filters,
        sortBy,
        handleSetFilters,
        handleSortBy,
        handleApplyFilters,
        handleClearFilters
    };
};

export default useSearchAndFilter;
