import axios from "axios";

const headers = {
    "Content-Type": "application/json"
};

//-------------------------------------------------------------------------
//Used for making request that dont change general store state
//-------------------------------------------------------------------------
export const postReq = async (path, obj, token = false) => {
    try {
        const response = await axios.post(path, obj, {
            headers: headers
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const getReq = async (path, token = false) => {
    try {
        const response = await axios.get(path, {
            headers: headers
        });
        return response;
    } catch (error) {
        throw error;
    }
};
