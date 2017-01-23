import axios from 'axios';
import _ from 'lodash'
import { arrayOf, normalize } from 'normalizr';
import { userSchema } from '../constants/Schemas';
import { sortByDate } from '../utils';
import { recordAdded, 
         recordEdited, 
         recordDeleted } from '../AdminPages/actions';
import { USERS_LOADED,
         JWT_LOADED,
         REMOVE_JWT } from '../constants/actionTypes';

export function getJWT(data) {
  return dispatch => {
    return axios.post('http://localhost:8000/auth', data)
      .then(({data: {access_token}}) => dispatch(JWTLoaded(access_token)));
  };
}

export function fetchUsers(config) {
  return dispatch => {
    axios.get('http://localhost:8000/api/users', config)
      .then(({data: {users}}) => {
        const normalized = normalize(users, arrayOf(userSchema));
        dispatch(usersLoaded(
          normalized.entities,
          normalized
        ));
      });  
  };
}

export function addUser(config, content) {
  return (dispatch) => {
    return axios.post(
      'http://localhost:8000/api/users', content, config)
      .then(
      ({data: {user}}) => {
        const normalized = normalize(user, userSchema);
        dispatch(recordAdded(normalized.entities, normalized.entities.users, user.id));
      })
  };
}

export function editUser(config, content, id) {
  return (dispatch) => {
    return axios.put(`http://localhost:8000/api/users/${id}`, content, config)
      .then(({data: {user}}) => {
        const normalized = normalize(user, userSchema);
        dispatch(recordEdited(normalized.entities));
      });
  };
}

export function deleteUser(config, id) {
  return (dispatch) => {
    return axios.delete(`http://localhost:8000/api/users/${id}`, config)
      .then(({data: {user}}) => {
        const normalized = normalize(user, userSchema)
        dispatch(recordDeleted(
          normalized,
          user.id
        ));
      });
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
  }
}

export function usersLoaded(entities, users) {
  return {
    type: USERS_LOADED,
    entities,
    users
  };
}
