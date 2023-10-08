// Action creators are defined

// this will allow you to use Axios to make HTTP requests to external APIs easily
import axios from "axios";
import {
    ALL_RESTAURANTS_REQUEST, 
    ALL_RESTAURANTS_SUCCESS,
    ALL_RESTAURANTS_FAIL, 
    CLEAR_ERRORS,
    SORT_BY_RATINGS,
    SORT_BY_REVIEWS,
    TOGGLE_VEG_ONLY, 
} from "../constants/restaurantConstant";

// action creator to get all the restaurants which dispatches an action if succesful dispatches suceess and if not dispatches an error
export const getRestaurants = (keyword=" ") => async(dispatch) => {
    try {
        dispatch({ type: ALL_RESTAURANTS_REQUEST });
        let link =`/api/v1/eats/stores?keyword=${keyword}`;
        const {data} = await axios.get(link);
        const {restaurants, count} = data;
        
        dispatch({
            type: ALL_RESTAURANTS_SUCCESS, 
            payload: {restaurants, count}, // it will contain actual data retrieved from the server on success
        });

    } catch(error){
        dispatch({
            type: ALL_RESTAURANTS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const sortByRatings = () => {
    return {
        type: SORT_BY_RATINGS
    };
};

export const sortByReviews = () => {
    return {
        type: SORT_BY_REVIEWS
    };
};

export const toggleVegOnly = () => (dispatch) => {
    dispatch ({
        type: TOGGLE_VEG_ONLY
    });
};

export const clearErrors = () => async(dispatch) => {
     dispatch({
        type: CLEAR_ERRORS, 
     });
}





