import axios from 'axios';
import { CURRENT_USER_LOADED } from '../constants/actionTypes';

export function fetchCurrentUser() {
  return dispatch => {
    return axios.get('http://localhost:8000/api/current-user')
    .then(({data: {currentUser}}) => {
      return dispatch(currentUserLoaded(
        currentUser
      ));
    });
  };
}

export function loginUser(content) {
  return (dispatch) => {
    return axios.post(
      'http://localhost:8000/api/login', 
      content
    );
  };
}

export function logoutUser() {
  return (dispatch) => {
    return axios.get('http://localhost:8000/api/logout');
  }
}

export function currentUserLoaded(currentUser) {
  console.log(currentUser);
  return {
    type: CURRENT_USER_LOADED,
    currentUser
  }
}

