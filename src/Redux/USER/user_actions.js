import Axios from 'axios';
import { USER_FETCH_LOADING, USER_FETCH_ALL, USER_FETCH_SINGLE, USER_FETCH_MESSAGE, USER_FETCH_ERROR, USER_CLEAR_STATE } from './user_types';
import * as RootNavigation from '../../RootNavigation'

const fetchLoading = () =>{
    return {
        type: USER_FETCH_LOADING
    }
}

const fetchMessage = (message) =>{
    return {
        type: USER_FETCH_MESSAGE,
        payload: message
    }
}

const fetchAll = (users) =>{
    return {
        type: USER_FETCH_ALL,
        payload: users
    }
}

const fetchSingle = (user) => {
  return {
    type: USER_FETCH_SINGLE,
    payload: user,
  };
};

const fetchError = (error) =>{
    return {
        type: USER_FETCH_ERROR,
        payload: error
    }
}

const clearState = () =>{
    return {
        type: USER_CLEAR_STATE
    }
}

export const save_user_action = (payload) =>{
    return (dispatch) => {
        dispatch(fetchLoading())
        Axios({
            method: 'POST',
            url: "https://ecounselling-app-healthy-mind-server.azurewebsites.net/user",
            data: {
                age: payload.age,
                email: payload.email,
                gender: payload.gender,
                nic: payload.nic,
                password: payload.password,
                phone: payload.phone,
                state: payload.state,
                type: payload.type,
                username: payload.username
            },
            headers: { api_key: '123' },
        }).then((res) => {
            RootNavigation.navigate('SignIn')
            dispatch(fetchMessage("Saved successfully"));
            console.log("User Save :", res.data)
        })
        .catch((err) => {
            const error = err.response;
            console.log("Error Save :",error.data)
            dispatch(fetchError(error));
        });
    }
}

export const signin_action = payload => {
  
  return dispatch => {
    dispatch(fetchLoading());
    Axios({
      method: "POST",
      url: "https://ecounselling-app-healthy-mind-server.azurewebsites.net/user/signin",
      data: {
        username: payload.username,
        password: payload.password
      },
      headers: { api_key: '123' }
    })
      .then(res => {
        const result = res.data;
        dispatch(fetchMessage(result));
        console.log("User SignIn:", result)
        RootNavigation.navigate('Home',{userId:result._id});
      })
      .catch(err => {
        const error = err.response;
        console.log("Error SignIn:",error.data)
        dispatch(fetchError(error));
      });
  };
};

export const get_user_action = (userId) => {
  return (dispatch) => {
    dispatch(fetchLoading());
    Axios({
      method: "GET",
      url: "https://ecounselling-app-healthy-mind-server.azurewebsites.net/user/" + userId,
      headers: { api_key: '123' },
    })
      .then((res) => {
        const result = res.data;
        console.log("Single User: ",result)
        dispatch(fetchSingle(result));
      })
      .catch((err) => {
        const error = err.response;
        console.log("Single Error: ",err)
        dispatch(fetchError(error));
      });
  };
};

export const user_profile_update_action = (userId, payload) => {
    return dispatch => {
        dispatch(fetchLoading())
        Axios({
            method:'PUT',
            url: "https://ecounselling-app-healthy-mind-server.azurewebsites.net/user/profile/" + userId,
            data: {
                nic: payload.nic,
                phone: payload.phone,
                state: payload.state,
                email: payload.email,
            },
            headers: { api_key: '123' }
        })
        .then(() => {
            dispatch(fetchMessage("Updated successfully"));
            RootNavigation.navigate('Home',{userId:userId})
        })
        .catch((err) => {
            const error = err.response;
            dispatch(fetchError(error));
        });
    }
}

export const change_password_action = (userId, payload) => {
  console.log("object:",userId, " ", payload)
  return dispatch => {
    dispatch(fetchLoading());
    Axios({
      method: "PATCH",
      url: "https://ecounselling-app-healthy-mind-server.azurewebsites.net/user/" + userId,
      data: {
        password: payload.password,
        newPassword: payload.newPassword
      },
      headers: { api_key: '123' }
    })
      .then(res => {
        const result = res.data;
        console.log("User Change Pw: ", result)
        dispatch(fetchMessage(result));
      })
      .catch(err => {
        const error = err.response;
        console.log("User Change Pw Error: ",error)
        dispatch(fetchError(error));
      });
  };
};

export const get_verification_code_action = (email) => {
  console.log("EMail:",email)
  return dispatch => {
    dispatch(fetchLoading());
    Axios({
      method: "GET",
      url: "https://ecounselling-app-healthy-mind-server.azurewebsites.net/user/verification",
      data:{
        email:email
      },
      headers: { api_key: '123' }
    })
      .then(res => {
        const result = res.data;
        console.log("User Email: ",result)
        dispatch(fetchALL(result));
      })
      .catch(err => {
        const error = err.response;
        console.log("User Email Error: ",error)
        dispatch(fetchError(error));
      });
  };
};

export const forgot_password_action = payload => {
  return dispatch => {
    dispatch(fetchLoading());
    Axios({
      method: "PATCH",
      url: "https://ecounselling-app-healthy-mind-server.azurewebsites.net/user/forgot",
      data: {
        username: payload.username,
        verificationCode: payload.verificationCode,
        newPassword: payload.newPassword,
        confirmPassword: payload.confirmPassword
      },
      headers: { api_key: '123' }
    })
      .then(res => {
        const result = res.data;
        dispatch(fetchMessage(result));
      })
      .catch(err => {
        const error = err.response;
        dispatch(fetchError(error));
      });
  };
};