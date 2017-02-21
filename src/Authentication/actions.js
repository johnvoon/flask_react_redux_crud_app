import axios from 'axios';
import { CURRENT_USER_LOADED,
         JWT_LOADED,
         REMOVE_JWT } from '../constants/actionTypes';

export function getJWT(data) {
  return dispatch => {
    return axios.post(
      'http://localhost:8000/auth', 
      data
    )
    .then(({data: {access_token}}) => 
      dispatch(JWTLoaded(access_token)));
  };
}

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

export function JWTLoaded(JWT) {
  console.log(JWT);
  return {
    type: JWT_LOADED,
    JWT
  };
}

export function removeJWT() {
  return {
    type: REMOVE_JWT
  }
}