import { DATA_LOADED } from '../constants/actionTypes';
import { sortByDate } from '../utils/filterSort';

const initialState = {
  dataSet: []
};

export default function globalPostsReducer(state = initialState, action) {
  switch (action.type) {
    case DATA_LOADED:
      return dataLoaded(state, action);
  }

  return state;
}

function dataLoaded(state, {dataSet: {posts}}) {
  const loadedState = { ...initialState, ...state };
  const sortedPosts = sortByDate(posts, 'descending');

  return {
    ...loadedState,
    dataSet: sortedPosts
  };
}