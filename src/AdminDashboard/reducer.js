import { ADMIN_COUNT_LOADED } from 'constants/actionTypes';

const initialState = {
  adminData: {},
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_COUNT_LOADED:
      return adminCountLoaded(state, action);
  }

  return state;
}

function adminCountLoaded(state, { adminData }) {
  return {
    ...state,
    adminData
  };
}