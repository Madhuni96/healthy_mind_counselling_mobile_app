import {
    ANSWERSET_FETCH_ALL,
    ANSWERSET_FETCH_SINGLE,
    ANSWERSET_FETCH_ERROR,
    ANSWERSET_FETCH_LOADING,
    ANSWERSET_FETCH_MESSAGE,
    ANSWERSET_CLEAR_STATE
} from './answerset_types';

const initial_state = {
    answersetLoading: false,
    answersetError: "",
    answersets:[],
    answersetMessage:'',
    singleAnswerset: {},
}

const answerset_reducer = (state = initial_state, action) => {
    switch (action.type) {
        case ANSWERSET_FETCH_LOADING: return {
            ...state,
            answersetLoading: true
        }
        case ANSWERSET_FETCH_ERROR: return {
            ...state,
            answersetLoading: false,
            answersetError: action.payload
        }
        case ANSWERSET_FETCH_ALL: return {
            ...state,
            answersetLoading: false,
            answersetError: "",
            answersets:action.payload
        }
        case ANSWERSET_FETCH_SINGLE: return {
            ...state,
            answersetLoading: false,
            singleAnswerset: action.payload,
            answersetError: "",
        }
        case ANSWERSET_FETCH_MESSAGE: return {
            ...state,
            answersetLoading: false,
            answersetMessage: action.payload,
            answersetError: "",
        };
        case ANSWERSET_CLEAR_STATE:
            return initial_state;
        default: return state
    }
}


export default answerset_reducer;