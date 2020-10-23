import Axios from 'axios';
import {
    ANSWERSET_FETCH_ALL,
    ANSWERSET_FETCH_SINGLE,
    ANSWERSET_FETCH_ERROR,
    ANSWERSET_FETCH_LOADING,
    ANSWERSET_FETCH_MESSAGE,
    ANSWERSET_CLEAR_STATE
} from './answerset_types';
import * as RootNavigation from '../../RootNavigation'

const fetchLoading = () =>{
    return {
        type: ANSWERSET_FETCH_LOADING
    }
}

const fetchMessage = (message) =>{
    return {
        type: ANSWERSET_FETCH_MESSAGE,
        payload: message
    }
}

const fetchAll = (answersets) =>{
    return {
        type: ANSWERSET_FETCH_ALL,
        payload: answersets
    }
}

const fetchSingle = (answerset) => {
  return {
    type: ANSWERSET_FETCH_SINGLE,
    payload: answerset,
  };
};

const fetchError = (error) =>{
    return {
        type: ANSWERSET_FETCH_ERROR,
        payload: error
    }
}

const clearState = () =>{
    return {
        type: ANSWERSET_CLEAR_STATE
    }
}

export const get_answerset_by_id_action = (answersetId) => {
  return (dispatch) => {
    dispatch(fetchLoading());
    Axios({
      method: "GET",
      url: "https://ecounselling-app-healthy-mind-server.azurewebsites.net/answerset/" + answersetId,
      headers: { api_key: '123' },
    })
      .then((res) => {
        const result = res.data;
        console.log("Single Answerset: ",result)
        dispatch(fetchSingle(result));
      })
      .catch((err) => {
        const error = err.response;
        console.log("Single Error: ",err)
        dispatch(fetchError(error));
      });
  };
};