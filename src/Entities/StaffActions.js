import axios from 'axios';
import { arrayOf, normalize } from 'normalizr';
import { staffSchema,
         staffUserSchema } from 'constants/Schemas';
import { STAFF_LOADED,
         STAFF_USERS_LOADED,
         STAFF_ADDED,
         STAFF_USER_ADDED,
         STAFF_EDITED,
         STAFF_USER_EDITED } from 'constants/actionTypes';

export function fetchStaff() {
  return dispatch => {
    return axios.get('http://localhost:8000/api/staff')
    .then(({data: {staff}}) => {
      const normalizedStaff = normalize(staff, arrayOf(staffSchema));
      const normalizedStaffUsers = normalize(staff, arrayOf(staffUserSchema));
      dispatch(staffLoaded(normalizedStaff.entities, normalizedStaff.result));
      dispatch(staffUsersLoaded(normalizedStaffUsers.entities, normalizedStaffUsers.result));
    });
  };
}

export function addStaff(config, content) {
  return (dispatch) => {
    return axios.post(
      'http://localhost:8000/api/staff', 
      content, 
      config
    )
    .then(
      ({data: {staff}}) => {
        const normalizedStaff = normalize(staff, staffSchema);
        const normalizedStaffUsers = normalize(staff, staffUserSchema);
        dispatch(staffAdded(normalizedStaff.entities));
        dispatch(staffUserAdded(normalizedStaffUsers.entities));
      }
    );
  };
}

export function editStaff(config, content) {
  return (dispatch) => {
    return axios.post(
      'http://localhost:8000/api/staff', 
      content, 
      config
    )
    .then(
      ({data: {staff}}) => {
        const normalizedStaff = normalize(staff, staffSchema);
        const normalizedStaffUsers = normalize(staff, staffUserSchema);
        dispatch(staffEdited(normalizedStaff.entities));
        dispatch(staffUserEdited(normalizedStaffUsers.entities));
      }
    );
  };
}

export function staffLoaded(entities) {
  return {
    type: STAFF_LOADED,
    entities
  };
}

export function staffUsersLoaded(entities) {
  return {
    type: STAFF_USERS_LOADED,
    entities
  };
}

export function staffAdded(entities) {
  return {
    type: STAFF_ADDED,
    entities
  };
}

export function staffUserAdded(entities) {
  return {
    type: STAFF_USER_ADDED,
    entities
  };
}

export function staffEdited(entities) {
  return {
    type: STAFF_EDITED,
    entities
  };
}

export function staffUserEdited(entities) {
  return {
    type: STAFF_USER_EDITED,
    entities
  };
}