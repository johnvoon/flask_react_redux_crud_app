import _ from 'lodash';
import { POSTS_LOADED,
         USERS_LOADED,
         COMMENTS_LOADED,
         RECORD_ADDED,
         SECONDARY_RECORD_ADDED,
         RECORD_EDITED,
         RECORD_DELETED,
         COMMENT_VISIBILITY_CHANGED,
         JWT_LOADED,
         REMOVE_JWT,
         CHANGE_PAGE_NUMBER, 
         CHANGE_PAGE_LENGTH,
         FILTER_ADMIN_DATA,
         SORT_DATA,
         LOAD_FORM_DATA,
         RESET_ADDED_RECORD } from '../constants/actionTypes';

const initialState = {
  data: {},
  recordIds: [],
  filterValues: '',
  sortBy: { props: '', order: ''},
  currentPage: 0,
  pageLength: 5,
  JWT: '',
  JWTExpired: false,
  successMessage: '',
  formData: {},
  addedRecord: {}
};

export default function adminPagesReducer(state = initialState, action) {
  switch (action.type) {
    case POSTS_LOADED:
      return postsLoaded(state, action);

    case USERS_LOADED:
      return usersLoaded(state, action);

    case COMMENTS_LOADED:
      return commentsLoaded(state, action);

    case JWT_LOADED:
      return JWTLoaded(state, action);

    case REMOVE_JWT:
      return removeJWT(state, action);

    case RECORD_ADDED:
      return recordAdded(state, action);

    case SECONDARY_RECORD_ADDED:
      return secondaryRecordAdded(state, action);

    case RECORD_EDITED:
      return recordEdited(state, action);

    case RECORD_DELETED:
      return recordDeleted(state, action);

    case COMMENT_VISIBILITY_CHANGED:
      return commentVisibilityChanged(state, action);
    
    case CHANGE_PAGE_NUMBER:
      return changePageNumber(state, action);

    case CHANGE_PAGE_LENGTH:
      return changePageLength(state, action);

    case FILTER_ADMIN_DATA:
      return filterAdminData(state, action);

    case SORT_DATA:
      return sortData(state, action);

    case LOAD_FORM_DATA:
      return loadFormData(state, action);

    case RESET_ADDED_RECORD:
      return resetAddedRecord(state, action);
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

function commentsLoaded(state, { entities, comments }) {
  return {
    ...state,
    data: entities.comments || {},
    recordIds: comments
  }
}

function recordAdded(state, { entities, addedRecord, addedRecordId }) {
  const { data, recordIds } = state;
  console.log(entities, addedRecord, typeof addedRecordId);

  return {
    ...state,
    data: _.merge({}, data, addedRecord),
    recordIds: [...recordIds, addedRecordId],
    successMessage: 'Record added successfully',
    addedRecord: addedRecord[addedRecordId]
  }
}

function secondaryRecordAdded(state, action) {
  const { addedRecord } = state;
  console.log("hello")
  
  return {
    ...state,
    successMessage: `${addedRecord.role} added successfully`
  }
}

function recordEdited(state, action) {
  return {
    ...state,
    successMessage: "Record edited successfully"
  }
}

function commentVisibilityChanged(state, { entities, commentId }) {
  console.log(entities.comments[commentId], typeof commentId);
  const visibility = entities.comments[commentId].visible ? "visible" : "hidden" 

  return {
    ...state,
    successMessage: `Comment ${commentId} now ${visibility}`
  }
}

function recordDeleted(state, { deletedRecord, deletedRecordId }) {
  const { data, recordIds } = state;
  return {
    ...state,
    data: _.omit(data, deletedRecordId),
    recordIds: _.reject(recordIds, item => item === deletedRecordId),
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

function loadFormData(state, { formData }) {
  return _.merge({}, state, { formData: formData });
}

function resetAddedRecord(state, action) {
  return {
    ...state,
    addedRecord: {}
  }
}