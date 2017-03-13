import axios from 'axios';
import { ADMIN_COUNT_LOADED } from 'constants/actionTypes';

export function fetchAdminCount() {
  return dispatch => {
    return axios.get(`${API_URL}/api/admin`)
    .then(({data: {admin}}) => {
      dispatch(adminCountLoaded(admin));
    });
  };
}

export function adminCountLoaded(adminData) {
  return {
    type: ADMIN_COUNT_LOADED,
    adminData
  };
}