import {
    RECOMMENDATION_FETCH_ALL,
    RECOMMENDATION_FETCH_SINGLE,
    RECOMMENDATION_FETCH_ERROR,
    RECOMMENDATION_FETCH_LOADING,
    RECOMMENDATION_FETCH_MESSAGE,
    RECOMMENDATION_CLEAR_STATE
} from './recommendation_types';

const initial_state = {
    recommendationLoading: false,
    recommendationError: "",
    recommendations:[],
    recommendationMessage:'',
    singleRecommendation: {},
}

const recommendation_reducer = (state = initial_state, action) => {
    switch (action.type) {
        case RECOMMENDATION_FETCH_LOADING: return {
            ...state,
            recommendationLoading: true
        }
        case RECOMMENDATION_FETCH_ERROR: return {
            ...state,
            recommendationLoading: false,
            recommendationError: action.payload
        }
        case RECOMMENDATION_FETCH_ALL: return {
            ...state,
            recommendationLoading: false,
            recommendationError: "",
            recommendations:action.payload
        }
        case RECOMMENDATION_FETCH_SINGLE: return {
            ...state,
            recommendationLoading: false,
            singleRecommendation: action.payload,
            recommendationError: "",
        }
        case RECOMMENDATION_FETCH_MESSAGE: return {
            ...state,
            recommendationLoading: false,
            recommendationMessage: action.payload,
            recommendationError: "",
        };
        case RECOMMENDATION_CLEAR_STATE:
            return initial_state;
        default: return state
    }
}


export default recommendation_reducer;