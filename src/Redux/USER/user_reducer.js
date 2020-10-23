import {
    USER_FETCH_ALL,
    USER_FETCH_SINGLE,
    USER_FETCH_ERROR,
    USER_FETCH_LOADING,
    USER_FETCH_MESSAGE,
    USER_CLEAR_STATE
} from './user_types';

const initial_state = {
    userLoading: false,
    userError: "",
    users:[],
    userMessage:'',
    singleUser: {},
}

const user_reducer = (state = initial_state, action) => {
    switch (action.type) {
        case USER_FETCH_LOADING: return {
            ...state,
            userLoading: true
        }
        case USER_FETCH_ERROR: return {
            ...state,
            userLoading: false,
            userError: action.payload
        }
        case USER_FETCH_ALL: return {
            ...state,
            userLoading: false,
            userError: "",
            users:action.payload
        }
        case USER_FETCH_SINGLE: return {
            ...state,
            userLoading: false,
            singleUser: action.payload,
            userError: "",
        }
        case USER_FETCH_MESSAGE: return {
            ...state,
            userLoading: false,
            userMessage: action.payload,
            userError: "",
        };
        case USER_CLEAR_STATE:
            return initial_state;
        default: return state
    }
}


export default user_reducer;