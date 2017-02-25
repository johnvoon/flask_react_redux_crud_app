import axios from 'axios';
import { arrayOf, normalize } from 'normalizr';
import { userSchema } from 'constants/Schemas';
import { recordAdded,
         recordEdited } from 'Admin/actions';
import { USERS_LOADED } from 'constants/actionTypes';

export function fetchUsers(config) {
  return dispatch => {
    axios.get(
      'http://localhost:8000/api/users', 
      config
    )
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
      'http://localhost:8000/api/users', 
      content, 
      config
    )
    .then(
    ({data: {user}}) => {
      const normalized = normalize(user, userSchema);
      return dispatch(recordAdded(normalized.entities, normalized.entities.users, user.id));
    });
  };
}

export function editUser(config, content, id) {
  return (dispatch) => {
    return axios.put(
      `http://localhost:8000/api/users/${id}`, 
      content, 
      config
    )
    .then(({data: {user}}) => {
      const normalized = normalize(user, userSchema);
      dispatch(recordEdited(normalized.entities));
    });
  };
}

export function usersLoaded(entities, users) {
  return {
    type: USERS_LOADED,
    entities,
    users
  };
}