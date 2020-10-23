import Axios from 'axios';
import {
    QUESTIONSET_FETCH_ALL,
    QUESTIONSET_FETCH_SINGLE,
    QUESTIONSET_FETCH_ERROR,
    QUESTIONSET_FETCH_LOADING,
    QUESTIONSET_FETCH_MESSAGE,
    QUESTIONSET_CLEAR_STATE
} from './questionset_types';
import * as RootNavigation from '../../RootNavigation'

const fetchLoading = () =>{
    return {
        type: QUESTIONSET_FETCH_LOADING
    }
}

const fetchMessage = (message) =>{
    return {
        type: QUESTIONSET_FETCH_MESSAGE,
        payload: message
    }
}

const fetchAll = (questionsets) =>{
    return {
        type: QUESTIONSET_FETCH_ALL,
        payload: questionsets
    }
}

const fetchSingle = (questionset) => {
  return {
    type: QUESTIONSET_FETCH_SINGLE,
    payload: questionset,
  };
};

const fetchError = (error) =>{
    return {
        type: QUESTIONSET_FETCH_ERROR,
        payload: error
    }
}

const clearState = () =>{
    return {
        type: QUESTIONSET_CLEAR_STATE
    }
}

export const get_all_questions = () =>{
  return (dispatch)=>{
    dispatch(fetchLoading())
    Axios({
      method: "GET",
      url: "https://ecounselling-app-healthy-mind-server.azurewebsites.net/questionset" ,
      headers: { api_key: '123' },
    })
      .then((res) => {
        const result = res.data;
        dispatch(fetchAll(result));
      })
      .catch((err) => {
        const error = err.response;
        dispatch(fetchError(error));
      });
  }
}

export const get_questionset_by_id_action = (questionsetId) => {
  return (dispatch) => {
    dispatch(fetchLoading());
    Axios({
      method: "GET",
      url: "https://ecounselling-app-healthy-mind-server.azurewebsites.net/questionset/" + questionsetId,
      headers: { api_key: '123' },
    })
      .then((res) => {
        const result = res.data;
        dispatch(fetchSingle(result));
      })
      .catch((err) => {
        const error = err.response;
        dispatch(fetchError(error));
      });
  };
};