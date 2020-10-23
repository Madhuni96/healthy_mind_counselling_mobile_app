import {
    CAREA_FETCH_ALL,
    CAREA_FETCH_SINGLE,
    CAREA_FETCH_ERROR,
    CAREA_FETCH_LOADING,
    CAREA_FETCH_MESSAGE,
    CAREA_CLEAR_STATE
} from './carea_types';

const initial_state = {
    careaLoading: false,
    careaError: "",
    careas:[],
    careaMessage:'',
    singleCarea: {},
}

const carea_reducer = (state = initial_state, action) => {
    switch (action.type) {
        case CAREA_FETCH_LOADING: return {
            ...state,
            careaLoading: true
        }
        case CAREA_FETCH_ERROR: return {
            ...state,
            careaLoading: false,
            careaError: action.payload
        }
        case CAREA_FETCH_ALL: return {
            ...state,
            careaLoading: false,
            careaError: "",
            careas:action.payload
        }
        case CAREA_FETCH_SINGLE: return {
            ...state,
            careaLoading: false,
            singleCarea: action.payload,
            careaError: "",
        }
        case CAREA_FETCH_MESSAGE: return {
            ...state,
            careaLoading: false,
            careaMessage: action.payload,
            careaError: "",
        };
        case CAREA_CLEAR_STATE:
            return initial_state;
        default: return state
    }
}


export default carea_reducer;