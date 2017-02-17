import { CURRENT_USER_LOADED } from '../constants/actionTypes';

const initialState = { 
  currentUser: {}
};

export default function authenticationReducer(state = initialState, action) {
  switch(action.type) {
    case CURRENT_USER_LOADED:
      return currentUserLoaded(state, action);
  }

  return state;
}

function currentUserLoaded(state, { currentUser }) {
  console.log(currentUser);
  return {
    ...state,
    currentUser
  };
}
