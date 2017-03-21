import axios from 'axios';
import { arrayOf, normalize } from 'normalizr';
import { userSchema } from 'constants/Schemas';
import { recordsLoaded,
         recordAdded,
         recordEdited } from 'Admin/actions';
import { USERS_LOADED } from 'constants/actionTypes';

export function fetchUsers(config, admin = false) {
  return dispatch => {
    axios.get(
      `${API_URL}/api/users`, 
      config
    )
    .then(({data: {users}}) => {
      const normalized = normalize(users, arrayOf(userSchema));
      
      if (admin) {
        dispatch(recordsLoaded(
          normalized.entities.users,
          normalized.result
        ));
      } else {
        dispatch(usersLoaded(
          normalized.entities,
          normalized.result
        ));  
      }
    });  
  };
}

export function addUser(config, content) {
  return (dispatch) => {
    return axios.post(
      `${API_URL}/api/users`, 
      content, 
      config
    )
    .then(
    ({data: {user}}) => {
      const normalized = normalize(user, userSchema);
      return dispatch(recordAdded(
        normalized.entities, 
        normalized.entities.users, 
        user.id));
    });
  };
}

export function editUser(config, content, id) {
  return (dispatch) => {
    return axios.put(
      `${API_URL}/api/users/${id}`, 
      content, 
      config
    )
    .then(({data: {user}}) => {
      const normalized = normalize(user, userSchema);
      return dispatch(recordEdited(
        normalized.entities,
        normalized.entities.users,
        user.id));
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