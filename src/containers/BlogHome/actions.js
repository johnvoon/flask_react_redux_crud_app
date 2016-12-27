import {
  CREATE_ENTITY,
  FETCH_ENTITY,
  DELETE_ENTITY,
  FILTER_BY_KEYWORD,
  FILTER_BY_AREA,
  LOAD_MORE
} from '../../constants/actionTypes';

export function filterByArea(area) {
  return {
    type: FILTER_BY_AREA,
    area
  };
}

export function filterByKeyword(value) {
  return {
    type: FILTER_BY_KEYWORD,
    value
  };
}

export function loadMore() {
  return {
    type: LOAD_MORE
  };
}

export function createPost(props) {
  const request = $.post(`${ROOT_URL}`, props);

  return {
    type: CREATE_POST,
    payload: request
  };
}

export function fetchPost(id) {
  const request = $.get(`${ROOT_URL}/${id}`);

  return {
    type: FETCH_POST,
    payload: request
  };
}

export function deletePost(id) {
  const request = axios.delete(`${ROOT_URL}/${id}`);

  return {
    type: DELETE_POST,
    payload: request
  };
}
