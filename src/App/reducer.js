import { HIDE_SIDEBAR, TOGGLE_SIDEBAR } from 'constants/actionTypes';

const initialState = {
  sidebarShowing: false,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return toggleSidebar(state, action);

    case HIDE_SIDEBAR:
      return hideSidebar(state, action);
  }

  return state;
}

function toggleSidebar(state, actions) { // eslint-disable-line no-unused-vars
  const { sidebarShowing } = state;

  return {
    ...state,
    sidebarShowing: (sidebarShowing ? false : true)
  };
}

function hideSidebar(state, actions) { // eslint-disable-line no-unused-vars
  return {
    ...state,
    sidebarShowing: false
  };
}