import {
    QUESTIONSET_FETCH_ALL,
    QUESTIONSET_FETCH_SINGLE,
    QUESTIONSET_FETCH_ERROR,
    QUESTIONSET_FETCH_LOADING,
    QUESTIONSET_FETCH_MESSAGE,
    QUESTIONSET_CLEAR_STATE
} from './questionset_types';

const initial_state = {
    questionsetLoading: false,
    questionsetError: "",
    questionsets:[],
    questionsetMessage:'',
    singleQuestionset: {},
}

const questionset_reducer = (state = initial_state, action) => {
    switch (action.type) {
        case QUESTIONSET_FETCH_LOADING: return {
            ...state,
            questionsetLoading: true
        }
        case QUESTIONSET_FETCH_ERROR: return {
            ...state,
            questionsetLoading: false,
            questionsetError: action.payload
        }
        case QUESTIONSET_FETCH_ALL: return {
            ...state,
            questionsetLoading: false,
            questionsetError: "",
            questionsets:action.payload
        }
        case QUESTIONSET_FETCH_SINGLE: return {
            ...state,
            questionsetLoading: false,
            singleQuestionset: action.payload,
            questionsetError: "",
        }
        case QUESTIONSET_FETCH_MESSAGE: return {
            ...state,
            questionsetLoading: false,
            questionsetMessage: action.payload,
            questionsetError: "",
        };
        case QUESTIONSET_CLEAR_STATE:
            return initial_state;
        default: return state
    }
}


export default questionset_reducer;