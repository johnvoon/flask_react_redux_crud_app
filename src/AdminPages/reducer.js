import _ from 'lodash';
import { sort, sortByDate, filter } from '../utils';
import { POSTS_LOADED,
         USERS_LOADED,
         RECORD_ADDED,
         RECORD_EDITED,
         RECORD_DELETED,
         JWT_LOADED,
         REMOVE_JWT,
         CHANGE_PAGE_NUMBER, 
         CHANGE_PAGE_LENGTH,
         FILTER_ADMIN_DATA,
         SORT_DATA } from '../constants/actionTypes';

const initialState = {
  data: {},
  recordIds: [],
  filterValues: '',
  sortBy: { props: '', order: ''},
  currentPage: 0,
  pageLength: 5,
  JWT: '',
  JWTExpired: false,
  successMessage: ''
};

export default function adminPagesReducer(state = initialState, action) {
  switch (action.type) {
    case POSTS_LOADED:
      return postsLoaded(state, action);

    case USERS_LOADED:
      return usersLoaded(state, action);

    case JWT_LOADED:
      return JWTLoaded(state, action);

    case REMOVE_JWT:
      return removeJWT(state, action);

    case RECORD_ADDED:
      return recordAdded(state, action);

    case RECORD_EDITED:
      return recordEdited(state, action);

    case RECORD_DELETED:
      return recordDeleted(state, action);
    
    case CHANGE_PAGE_NUMBER:
      return changePageNumber(state, action);

    case CHANGE_PAGE_LENGTH:
      return changePageLength(state, action);

    case FILTER_ADMIN_DATA:
      return filterAdminData(state, action);

    case SORT_DATA:
      return sortData(state, action);
  }

  return state;
}

function JWTLoaded(state, { JWT }) {
  return {
    ...state,
    JWT
  };
}

function removeJWT(state, action) {
  return {
    ...state,
    JWT: '',
    JWTExpired: true
  };
}

function postsLoaded(state, { entities, posts }) {
  return {
    ...state,
    data: entities.posts,
    recordIds: posts
  };
}

function usersLoaded(state, { entities, users }) {
  return {
    ...state,
    data: entities.users,
    recordIds: users
  };  
}

function recordAdded(state, { entities, addedRecord, addedRecordId }) {
  const { data, recordIds } = state;

  return {
    ...state,
    data: _.merge({}, data, addedRecord),
    recordIds: [...recordIds, addedRecordId],
    successMessage: 'Record added successfully',
  }
}

function recordEdited(state, action) {
  return {
    ...state,
    successMessage: "Record edited successfully"
  }
}

function recordDeleted(state, { remainingEntities, deletedRecord }) {
  const { data, recordIds } = state;
  const newData = _.assign({}, data, remainingEntities);
  const newFilteredData = _.reject(recordIds, item => item === deletedRecord);

  return {
    ...state,
    data: newData,
    recordIds: newFilteredData,
    successMessage: "Record deleted successfully",
  }
}

function changePageNumber(state, {value: newPageNumber}) {
  return {
    ...state,
    currentPage: newPageNumber
  };
}

function changePageLength(state, {value: newPageLength}) {
  const {currentPage, pageLength} = state;
  newPageLength = Number(newPageLength);
  const newPageNumber = Math.floor((currentPage * pageLength) / newPageLength);

  return {
    ...state,
    pageLength: newPageLength,
    currentPage: newPageNumber
  };
}

function sortData(state, { sortBy }) {
  return {
    ...state,
    sortBy
  };
}

function filterAdminData(state, { value }) {
  return {
    ...state,
    filterValues: value,
    currentPage: 0,
  };
}