import axios from 'axios';
import _ from 'lodash'
import { arrayOf, normalize } from 'normalizr';
import { userSchema } from '../constants/Schemas';
import { sortByDate } from '../utils';
import { USERS_LOADED,
         JWT_LOADED,
         REMOVE_JWT,
         USER_ADDED,
         USER_EDITED,
         USER_DELETED } from '../constants/actionTypes';

export function getJWT(data) {
  return dispatch => {
    return axios.post('http://localhost:8000/auth', data)
      .then(({data: {access_token}}) => dispatch(JWTLoaded(access_token)));
  };
}

export function fetchUsers() {
  return dispatch => {
    axios.get('http://localhost:8000/api/users')
      .then(({data: {users}}) => {
        const normalized = normalize(users, arrayOf(userSchema));
        const allUsers = sortByDate(
          normalized.entities.users, 
          normalized.result, 
          'descending'
        );
        dispatch(usersLoaded(
          normalized.entities,
          allUsers
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
        dispatch(userAdded(normalized.entities, user.id));
      })
  };
}

export function editUser(config, content, id) {
  return (dispatch) => {
    return axios.put(`http://localhost:8000/api/users/${id}`, content, config)
      .then(({data: {user}}) => {
        const normalized = normalize(user, userSchema);
        dispatch(user(normalized.entities));
      });
  };
}

export function deleteUser(config, id) {
  return (dispatch, getState) => {
    return axios.delete(`http://localhost:8000/api/users/${id}`, config)
      .then(({data: {user}}) => {
        const { users } = getState().blogEntities;
        const remainingUsers = _.omit(users, user.id);
        const remainingUserIds = sortByDate(
          remainingUsers, 
          Object.keys(remainingUsers), 
          'descending'
        );
        dispatch(userDeleted(
          remainingUsers, 
          remainingUserIds,
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

export function userAdded(entities, addedUser) {
  return {
    type: USER_ADDED,
    entities,
    addedUser
  };
}

export function userEdited(entities) {
  return {
    type: USER_EDITED,
    entities
  };
}

export function userDeleted(remainingEntities, users, deletedUser) {
  return {
    type: USER_DELETED,
    remainingEntities,
    users,
    deletedUser
  };
}