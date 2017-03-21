import { TOGGLE_SIDEBAR, HIDE_SIDEBAR } from 'constants/actionTypes';

export function toggleSidebar() {
  return {
    type: TOGGLE_SIDEBAR
  }
}

export function hideSidebar() {
  return {
    type: HIDE_SIDEBAR
  };
}