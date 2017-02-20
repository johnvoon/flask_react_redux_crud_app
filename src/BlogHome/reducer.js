import _ from 'lodash';
import { filter, sort, sortByDate } from '../utils';
import { POSTS_LOADED,
         SHOW_ALL_POSTS,
         SORT_POSTS,
         FILTER_POSTS_BY_KEYWORD,
         FILTER_BY_AREA,
         FILTER_BY_AUTHOR,
         LOAD_MORE } from '../constants/actionTypes';

const initialState = { 
  data: {},
  // all posts from database
  allPosts: [],
  // visible and hidden posts (visible on scroll)
  allAvailablePosts: [],
  // visible posts only
  visiblePosts: [],
  sortBy: '',
  currentFilter: '',
  filterValues: '',
  cursorStart: 0,
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
      return loadMore(state);
  }

  return state;
}

function postsLoaded(state, { entities, posts }) {
  return {
    ...state,
    data: entities.posts,
    allPosts: posts,
    allAvailablePosts: posts,
    visiblePosts: posts.slice(0, 5),
    cursorStart: 0,
    cursorEnd: 5
  };
}

function sortPosts(state, { posts, sortBy }) {
  const { data } = state;
  let sortedPosts;
  if (sortBy === "created") {
    sortedPosts = sortByDate(data, posts, "descending")
  } else {
    sortedPosts = sort(data, posts, sortBy, "ascending")  
  }

  return {
    ...state,
    sortBy,
    allAvailablePosts: sortedPosts,
    visiblePosts: sortedPosts.slice(0, 5),
  }
}

function filterPostsByKeyword(state, {value, posts}) {
  let filteredPosts = filter(value, posts);
  
  return {
    ...state,
    currentFilter: "keyword",
    allAvailablePosts: filteredPosts,
    filterValues: value,
    visiblePosts: filteredPosts.slice(0, 5),
    cursorStart: 0,
    cursorEnd: 5,
    hasMore: true
  };
}

function showAllPosts(state, action) {
  const allPosts = state.allPosts;

  return {
    ...state,
    currentFilter: '',
    filterValues: '',
    allAvailablePosts: allPosts,
    visiblePosts: allPosts.slice(0, 5),
    cursorStart: 0,
    cursorEnd: 5,
    hasMore: true
  };
}

function filterByArea(state, { posts, area }) {
  const postsByArea = _.filter(
    state.allPosts,
    id => posts[id].practiceArea === area
  );
    
  return {
    ...state,
    currentFilter: "area",
    filterValues: area,
    allAvailablePosts: postsByArea,
    visiblePosts: postsByArea.slice(0, 5),
    cursorStart: 0,
    cursorEnd: 5,
    currentPost: '',
    hasMore: true
  };
}

function filterByAuthor(state, { posts, author }) {
  const postsByAuthor = _.filter(
    state.allPosts,
    id => posts[id].author === author
  );
    
  return {
    ...state,
    currentFilter: "author",
    filterValues: author,
    allAvailablePosts: postsByAuthor,
    visiblePosts: postsByAuthor.slice(0, 5),
    cursorStart: 0,
    cursorEnd: 5,
    hasMore: true
  };
}

function loadMore(state) {
  const { allAvailablePosts, visiblePosts, cursorStart, cursorEnd } = state;
  if (cursorEnd < allAvailablePosts.length) {
    const newCursorStart = cursorStart + 5;
    const newCursorEnd = cursorEnd + 5;
    const morePosts = allAvailablePosts.slice(newCursorStart, newCursorEnd);
    const updatedVisiblePosts = visiblePosts.concat(morePosts);
    
    return {
      ...state,
      visiblePosts: updatedVisiblePosts,
      cursorStart: newCursorStart,
      cursorEnd: newCursorEnd,
      hasMore: true
    }
  }

  return {
    ...state,
    hasMore: false
  };
}