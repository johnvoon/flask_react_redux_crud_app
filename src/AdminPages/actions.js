import {
  CHANGE_PAGE_LENGTH,
  CHANGE_PAGE_NUMBER,
  SORT_DATA,
  FILTER_ADMIN_DATA
} from '../constants/actionTypes';

export function changePageLength(value) {
  return {
    type: CHANGE_PAGE_LENGTH,
    value
  };
}

export function changePageNumber(value) {
  return {
    type: CHANGE_PAGE_NUMBER,
    value
  };
}

export function sortData(sortBy) {
  return {
    type: SORT_DATA,
    sortBy
  };
}

export function filterAdminData(value, data) {
  return {
    type: FILTER_ADMIN_DATA,
    value,
    data
  };
}
