import {
  CHANGE_PAGE_LENGTH,
  CHANGE_PAGE_NUMBER,
  SORT_DATA,
  FILTER_BY_KEYWORD
} from '../../constants/actionTypes';

export function changePageLength(value) {
  return {
    type: CHANGE_PAGE_LENGTH,
    value
  }
}

export function changePageNumber(value) {
  return {
    type: CHANGE_PAGE_NUMBER,
    value
  };
}

export function sortData(value) {
  return {
    type: SORT_DATA,
    value
  }
}

export function filterByKeyword(value) {
  return {
    type: FILTER_BY_KEYWORD,
    value
  }
}