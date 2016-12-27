import axios from 'axios';

import {
  DATA_LOADED,
  DATA_LOADING_ERROR
} from '../constants/actionTypes';

export function fetchData() {
  return (dispatch, getState) => {
    const { dataSet } = getState().posts;
    if (dataSet.length === 0) {
      const request = axios.get('http://localhost:8000/api/posts');
      request.then(
        // Promise has a data property
        ({data}) => dispatch(dataLoaded(data))
      );
    } else {
      dispatch(dataLoaded(dataSet));
    }
  }
}

export function dataLoaded(dataSet) {
  return {
    type: DATA_LOADED,
    dataSet
  };
}

export function dataLoadingError(error) {
  return {
    type: DATA_LOADING_ERROR,
    error
  };
}