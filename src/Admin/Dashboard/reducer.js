import _ from 'lodash';
import { sort, sortByDate, filter } from '../utils';
import { POSTS_LOADED,
         POST_ADDED,
         POST_DELETED,
         JWT_LOADED,
         CHANGE_PAGE_NUMBER, 
         CHANGE_PAGE_LENGTH,
         FILTER_ADMIN_DATA,
         SORT_DATA } from '../constants/actionTypes';

const initialState = {
  data: {},
  allPosts: [],
  filteredData: [],
  pageData: [],
  filterValues: '',
  totalPages: 0,
  sortBy: {},
  currentPage: 0,
  pageLength: 5,
  token: '',
  error: '',
};

export default function adminPostsReducer(state = initialState, action) {
  switch (action.type) {
    case POSTS_LOADED:
      return postsLoaded(state, action);

    case JWT_LOADED:
      return JWTLoaded(state, action);

    case POST_ADDED:
      return postAdded(state, action);

    case POST_DELETED:
      return postDeleted(state, action);
    
    case CHANGE_PAGE_NUMBER:
      return changePageNumber(state, action);

    case CHANGE_PAGE_LENGTH:
      return changepageLength(state, action);

    case FILTER_ADMIN_DATA:
      return filterAdminData(state, action);

    case SORT_DATA:
      return sortData(state, action);
  }

  return state;
}

function JWTLoaded(state, { token }) {
  return {
    ...state,
    token
  }
}

function postsLoaded(state, { entities, posts }) {
  const { pageLength, currentPage } = state;

  return {
    ...state,
    ...visibleDataSlice(posts, pageLength, currentPage),
    ...recalculateTotalPages(posts, pageLength),
    data: entities.posts,
    allPosts: posts,
    filteredData: posts
  };
}

function postAdded(state, { entities, addedPost }) {
  const { data, pageLength, currentPage, allPosts, filteredData, sortBy } = state;
  const { prop, order } = sortBy;
  const newData = _.merge({}, data, entities.posts);
  let allPostsSorted, filteredPosts;

  if (prop === 'created') {
    allPostsSorted = sortByDate(newData, [...allPosts, addedPost], order);
    filteredPosts = sortByDate(newData, [...filteredData, addedPost], order);
  } else {
    allPostsSorted = sort(newData, [...allPosts, addedPost], prop, order);
    filteredPosts = sort(newData, [...filteredData, addedPost], prop, order);  
  }


  return {
    ...state,
    data: newData,
    allPosts: allPostsSorted,
    filteredData: filteredPosts,
    ...visibleDataSlice(filteredPosts, pageLength, currentPage),
    ...recalculateTotalPages(filteredPosts, pageLength),
  }
}

function postDeleted(state, { remainingEntities, posts, deletedPost }) {
  const { data, pageLength, currentPage, filteredData, sortBy } = state;
  const { prop, order } = sortBy;
  const newData = _.assign({}, data, remainingEntities.posts);
  const newFilteredData = _.reject(filteredData, item => item === deletedPost);

  let allPostsSorted, filteredPosts;
  if (prop === 'created') {
    allPostsSorted = sortByDate(newData, posts, order);
    filteredPosts = sortByDate(newData, newFilteredData, order);
  } else {
    allPostsSorted = sort(newData, posts, prop, order);
    filteredPosts = sort(newData, newFilteredData, prop, order);  
  }

  return {
    ...state,
    data: newData,
    allPosts: allPostsSorted,
    filteredData: filteredPosts,
    ...visibleDataSlice(filteredPosts, pageLength, currentPage),
    ...recalculateTotalPages(filteredPosts, pageLength),
  }
}

function visibleDataSlice(filteredData, pageLength, currentPage) {
  if (pageLength === 0) {
    return { pageData: filteredData};
  }

  const start = pageLength * currentPage; 

  return {
    pageData: filteredData.slice(start, start + pageLength),
  };
}

function recalculateTotalPages(filteredData, pageLength) {
  if (pageLength === 0) {
    return { totalPages: 0 };
  }

  return {
    totalPages: Math.ceil(filteredData.length / pageLength)
  };
}

function changePageNumber(state, {value: newPageNumber}) {
  return {
    ...state,
    ...visibleDataSlice(state.filteredData, state.pageLength, newPageNumber),
    ...recalculateTotalPages(state.filteredData, state.pageLength),
    currentPage: newPageNumber
  };
}

function changepageLength(state, {value: newPageLength}) {
  newPageLength = Number(newPageLength);
  const {currentPage, pageLength} = state;
  const newPageNumber = newPageLength ? 
    Math.floor((currentPage * pageLength) / newPageLength) : 0;

  return {
    ...state,
    ...visibleDataSlice(state.filteredData, newPageLength, newPageNumber),
    ...recalculateTotalPages(state.filteredData, newPageLength),
    pageLength: newPageLength,
    currentPage: newPageNumber
  };
}

function sortData(state, { sortBy }) {
  const { prop, order } = sortBy;
  let sortedData;
  if (prop === 'created') {
    sortedData = sortByDate(state.data, state.filteredData, order);
  } else {
    sortedData = sort(state.data, state.filteredData, prop, order);  
  }

  return {
    ...state,
    ...visibleDataSlice(sortedData, state.pageLength, state.currentPage),
    ...recalculateTotalPages(sortedData, state.pageLength),
    sortBy,
    filteredData: sortedData
  };
}

function filterAdminData(state, {value, data}) {
  let filteredPosts = filter(value, data);

  return {
    ...state,
    ...visibleDataSlice(filteredPosts, state.pageLength, 0),
    ...recalculateTotalPages(filteredPosts, state.pageLength),
    filteredData: filteredPosts,
    filterValues: value,
    currentPage: 0,
  };
}