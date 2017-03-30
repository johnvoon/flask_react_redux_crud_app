import { POSTS_LOADED,
         SHOW_ALL_POSTS,
         SORT_POSTS,
         FILTER_POSTS_BY_KEYWORD,
         FILTER_BY_AREA,
         FILTER_BY_AUTHOR,
         LOAD_MORE } from 'constants/actionTypes';

const initialState = {
  postIds: [],
  sortBy: '',
  currentFilter: '',
  filterValues: '',
  cursorEnd: 5,
  hasMore: true
};

export default function blogHomeReducer(state = initialState, action) {
  switch(action.type) {
    case POSTS_LOADED:
      return postsLoaded(state, action);
    case SHOW_ALL_POSTS:
      return showAllPosts(state, action);
    case SORT_POSTS:
      return sortPosts(state, action);
    case FILTER_POSTS_BY_KEYWORD:
      return filterPostsByKeyword(state, action);
    case FILTER_BY_AREA:
      return filterByArea(state, action);
    case FILTER_BY_AUTHOR:
      return filterByAuthor(state, action);
    case LOAD_MORE:
      return loadMore(state, action);
  }

  return state;
}

function postsLoaded(state, { postIds }) {
  return {
    ...state,
    postIds,
    cursorEnd: 5
  };
}

function sortPosts(state, { sortBy }) {
  return {
    ...state,
    sortBy,
  };
}

function filterPostsByKeyword(state, {value }) {
  return {
    ...state,
    currentFilter: "keyword",
    filterValues: value,
    cursorEnd: 5,
    hasMore: true
  };
}

function showAllPosts(state, action) { // eslint-disable-line no-unused-vars
  return {
    ...state,
    currentFilter: '',
    filterValues: '',
    cursorEnd: 5,
    hasMore: true
  };
}

function filterByArea(state, { area }) {
  return {
    ...state,
    currentFilter: "area",
    filterValues: area,
    cursorEnd: 5,
    hasMore: true
  };
}

function filterByAuthor(state, { author }) {
  return {
    ...state,
    currentFilter: "author",
    filterValues: author,
    cursorEnd: 5,
    hasMore: true
  };
}

function loadMore(state, { filteredPostIds }) {
  const { cursorEnd } = state;
  if (cursorEnd < filteredPostIds.length) {
    return {
      ...state,
      cursorEnd: cursorEnd + 5,
      hasMore: true
    };
  }

  return {
    ...state,
    hasMore: false
  };
}