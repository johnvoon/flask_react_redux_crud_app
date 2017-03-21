import axios from 'axios';
import { CURRENT_USER_LOADED,
         JWT_LOADED,
         REMOVE_JWT } from 'constants/actionTypes';

export function getJWT(data) {
  return dispatch => {
    return axios.post(
      `${API_URL}/auth`, 
      data
    )
    .then(({data: {access_token}}) => 
      dispatch(JWTLoaded(access_token)));
  };
}

export function fetchCurrentUser() {
  return dispatch => {
    return axios.get(`${API_URL}/api/current-user`)
    .then(({data: {currentUser}}) => {
      return dispatch(currentUserLoaded(
        currentUser
      ));
    });
  };
}

export function loginUser(content) {
  return (dispatch) => { //eslint-disable-line no-unused-vars
    return axios.post(
      `${API_URL}/api/login`, 
      content
    );
  };
}

export function logoutUser() {
  return (dispatch) => { //eslint-disable-line no-unused-vars
    return axios.get(`${API_URL}/api/logout`);
  };
}

export function currentUserLoaded(currentUser) {
  return {
    type: CURRENT_USER_LOADED,
    currentUser
  };
}

export function JWTLoaded(JWT) {
  return {
    type: JWT_LOADED,
    JWT
  };
}

export function removeJWT() {
  return {
    type: REMOVE_JWT
  };
}