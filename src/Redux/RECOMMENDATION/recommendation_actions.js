import Axios from 'axios';
import {
    RECOMMENDATION_FETCH_ALL,
    RECOMMENDATION_FETCH_SINGLE,
    RECOMMENDATION_FETCH_ERROR,
    RECOMMENDATION_FETCH_LOADING,
    RECOMMENDATION_FETCH_MESSAGE,
    RECOMMENDATION_CLEAR_STATE
} from './recommendation_types';
import * as RootNavigation from '../../RootNavigation'

const fetchLoading = () =>{
    return {
        type: RECOMMENDATION_FETCH_LOADING
    }
}

const fetchMessage = (message) =>{
    return {
        type: RECOMMENDATION_FETCH_MESSAGE,
        payload: message
    }
}

const fetchAll = (recommendations) =>{
    return {
        type: RECOMMENDATION_FETCH_ALL,
        payload: recommendations
    }
}

const fetchSingle = (recommendation) => {
  return {
    type: RECOMMENDATION_FETCH_SINGLE,
    payload: recommendation,
  };
};

const fetchError = (error) =>{
    return {
        type: RECOMMENDATION_FETCH_ERROR,
        payload: error
    }
}

const clearState = () =>{
    return {
        type: RECOMMENDATION_CLEAR_STATE
    }
}

export const get_all_recommendations = () =>{
  return (dispatch)=>{
    dispatch(fetchLoading())
    Axios({
      method: "GET",
      url: "https://ecounselling-app-healthy-mind-server.azurewebsites.net/recommendation" ,
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

export const get_recommendation_by_id_action = (recommendationId) => {
  return (dispatch) => {
    dispatch(fetchLoading());
    Axios({
      method: "GET",
      url: "https://ecounselling-app-healthy-mind-server.azurewebsites.net/recommendation/" + recommendationId,
      headers: { api_key: '123' },
    })
      .then((res) => {
        const result = res.data;
        console.log("Single Recommendation: ",result)
        dispatch(fetchSingle(result));
      })
      .catch((err) => {
        const error = err.response;
        console.log("Single Error: ",err)
        dispatch(fetchError(error));
      });
  };
};