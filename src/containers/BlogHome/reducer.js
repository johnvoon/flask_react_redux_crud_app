import _ from 'lodash';
import { filter } from '../../utils/filterSort';
import { DATA_LOADED,
         FILTER_BY_KEYWORD,
         FILTER_BY_AREA,
         LOAD_MORE } from '../../constants/actionTypes';

const initialState = { 
  // contains every single post
  allPosts: [],
  // contains posts filtered by keyword
  filteredPosts: [],
  // contains visible and hidden available posts (made visible by scrolling)
  allAvailablePosts: [],
  // contains up to 5 posts currently visible to the user
  visiblePosts: [],
  currentArea: "All Posts",
  filterValues: '',
  cursorStart: 0,
  cursorEnd: 5
};

export default function blogHomeReducer(state = initialState, action) {
  switch(action.type) {
    case DATA_LOADED:
      return dataLoaded(state, action);
    case FILTER_BY_KEYWORD:
      return filterByKeyword(state, action);
    case FILTER_BY_AREA:
      return filterByArea(state, action);
    case LOAD_MORE:
      return loadMore(state);
  }

  return state;
}

function dataLoaded(state, {dataSet: {posts}}) {
  const loadedState = { ...initialState, ...state };

  return {
    ...loadedState,
    allPosts: posts,
    filteredPosts: posts,
    allAvailablePosts: posts,
    visiblePosts: posts.slice(0, 5),
    cursorStart: 0,
    cursorEnd: 5
  };
}

function filterByKeyword(state, {value}) {
  let filteredPosts = filter(value, state.allPosts);
  
  return {
    ...state,
    filteredPosts,
    currentArea: "All Posts",
    allAvailablePosts: filteredPosts,
    filterValues: value,
    visiblePosts: filteredPosts.slice(0, 5),
    cursorStart: 0,
    cursorEnd: 5
  }
}

function filterByArea(state, { area }) {
  if (area === "All Posts") {
    const allPosts = state.filteredPosts;

    return {
      ...state,
      currentArea: area,
      allAvailablePosts: allPosts,
      visiblePosts: allPosts.slice(0, 5),
      cursorStart: 0,
      cursorEnd: 5
    }
  } else {
    const postsByArea = _.filter(
      state.filteredPosts, 
      post => post.practice_area === area
    );
    
    return {
      ...state,
      currentArea: area,
      allAvailablePosts: postsByArea,
      visiblePosts: postsByArea.slice(0, 5),
      cursorStart: 0,
      cursorEnd: 5
    }
  }
}

function loadMore(state) {
  const { allAvailablePosts, visiblePosts } = state;

  const newCursorStart = state.cursorStart + 5;
  const newCursorEnd = state.cursorEnd + 5;

  const morePosts = allAvailablePosts.slice(newCursorStart, newCursorEnd);
  const updatedVisiblePosts = visiblePosts.concat(morePosts);

  
  return {
    ...state,
    visiblePosts: updatedVisiblePosts,
    cursorStart: newCursorStart,
    cursorEnd: newCursorEnd
  }
}