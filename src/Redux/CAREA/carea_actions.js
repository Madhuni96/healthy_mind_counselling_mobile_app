import Axios from 'axios';
import {
    CAREA_FETCH_ALL,
    CAREA_FETCH_SINGLE,
    CAREA_FETCH_ERROR,
    CAREA_FETCH_LOADING,
    CAREA_FETCH_MESSAGE,
    CAREA_CLEAR_STATE
} from './carea_types';
import * as RootNavigation from '../../RootNavigation'

const fetchLoading = () =>{
    return {
        type: CAREA_FETCH_LOADING
    }
}

const fetchMessage = (message) =>{
    return {
        type: CAREA_FETCH_MESSAGE,
        payload: message
    }
}

const fetchAll = (careas) =>{
    return {
        type: CAREA_FETCH_ALL,
        payload: careas
    }
}

const fetchSingle = (carea) => {
  return {
    type: CAREA_FETCH_SINGLE,
    payload: carea,
  };
};

const fetchError = (error) =>{
    return {
        type: CAREA_FETCH_ERROR,
        payload: error
    }
}

const clearState = () =>{
    return {
        type: CAREA_CLEAR_STATE
    }
}

export const get_all_careas_action = () => {
  return (dispatch) => {
    dispatch(fetchLoading());
    Axios({
      method: "GET",
      url: "https://ecounselling-app-healthy-mind-server.azurewebsites.net/carea",
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
  };
};

export const get_carea_by_id_action = (careaId) => {
  return (dispatch) => {
    dispatch(fetchLoading());
    Axios({
      method: "GET",
      url: "https://ecounselling-app-healthy-mind-server.azurewebsites.net/carea/" + careaId,
      headers: { api_key: '123' },
    })
      .then((res) => {
        const result = res.data;
        console.log("Single Carea: ",result)
        dispatch(fetchSingle(result));
      })
      .catch((err) => {
        const error = err.response;
        console.log("Single Error: ",err)
        dispatch(fetchError(error));
      });
  };
};