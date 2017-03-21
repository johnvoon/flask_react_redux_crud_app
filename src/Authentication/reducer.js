import { CURRENT_USER_LOADED,
         JWT_LOADED,
         REMOVE_JWT } from 'constants/actionTypes';

const initialState = { 
  currentUser: {},
  JWT: '',
  JWTExpired: false,
};

export default function authenticationReducer(state = initialState, action) {
  switch(action.type) {
    case CURRENT_USER_LOADED:
      return currentUserLoaded(state, action);

    case JWT_LOADED:
      return JWTLoaded(state, action);

    case REMOVE_JWT:
      return removeJWT(state, action);
  }

  return state;
}

function currentUserLoaded(state, { currentUser }) {
  return {
    ...state,
    currentUser
  };
}

function JWTLoaded(state, { JWT }) {
  return {
    ...state,
    JWT
  };
}

function removeJWT(state, action) { // eslint-disable-line no-unused-vars
  return {
    ...state,
    JWT: '',
    JWTExpired: true
  };
}
