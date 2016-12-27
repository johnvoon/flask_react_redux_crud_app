import { sort, sortByDate, filter } from '../../utils/filterSort';
import { DATA_LOADED,
         CHANGE_PAGE_NUMBER, 
         CHANGE_PAGE_LENGTH,
         FILTER_BY_KEYWORD,
         SORT_DATA } from '../../constants/actionTypes';

const initialState = {
  dataSet: [],
  filteredData: [],
  pageData: [],
  filterValues: '',
  totalPages: 0,
  sortBy: null,
  currentPage: 0,
  pageLength: 5
};

export default function adminPostsReducer(state = initialState, action) {
  switch (action.type) {
    case DATA_LOADED:
      return dataLoaded(state, action);
    
    case CHANGE_PAGE_NUMBER:
      return changePageNumber(state, action);

    case CHANGE_PAGE_LENGTH:
      return changepageLength(state, action);

    case FILTER_BY_KEYWORD:
      return filterByKeyword(state, action);

    case SORT_DATA:
      return sortData(state, action);
  }

  return state;
}

function dataLoaded(state, {dataSet: {posts}}) {
  const loadedState = { ...initialState, ...state };
  const { pageLength, currentPage } = loadedState;

  return {
    ...loadedState,
    ...visibleDataSlice(posts, pageLength, currentPage),
    ...recalculateTotalPages(posts, pageLength),
    filteredData: posts,
    dataSet: posts
  };
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
  }
}

function sortData(state, {value: sortBy}) {
  const { prop, order } = sortBy;
  let sortedData;
  if (prop === 'created') {
    sortedData = sortByDate(state.filteredData, order)
  } else {
    sortedData = sort(sortBy, state.filteredData);  
  }

  return {
    ...state,
    ...visibleDataSlice(sortedData, state.pageLength, state.currentPage),
    ...recalculateTotalPages(sortedData, state.pageLength),
    sortBy,
    filteredData: sortedData
  };
}

function filterByKeyword(state, {value}) {
  let filteredPosts = filter(value, state.dataSet);

  return {
    ...state,
    ...visibleDataSlice(filteredPosts, state.pageLength, 0),
    ...recalculateTotalPages(filteredPosts, state.pageLength),
    filteredData: filteredPosts,
    filterValues: value,
    currentPage: 0,
  };
}
