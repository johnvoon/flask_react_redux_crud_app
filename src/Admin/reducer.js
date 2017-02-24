import _ from 'lodash';
import { POSTS_LOADED,
         USERS_LOADED,
         COMMENTS_LOADED,
         RECORD_ADDED,
         RECORD_EDITED,
         RECORD_DELETED,
         COMMENT_VISIBILITY_CHANGED,
         CHANGE_PAGE_NUMBER, 
         CHANGE_PAGE_LENGTH,
         FILTER_ADMIN_DATA,
         SORT_DATA,
         LOAD_FORM_DATA,
         SHOW_MODAL,
         HIDE_MODAL,
         CHANGE_SELECTED_RECORD,
         CHANGE_ADMIN_OPERATION } from 'constants/actionTypes';

const initialState = {
  data: {},
  recordIds: [],
  filterValues: '',
  sortBy: { props: '', order: ''},
  currentPage: 0,
  pageLength: 5,
  successMessage: '',
  formData: {},
  selectedRecord: {},
  adminOperation: '',
  modalShowing: false
};

export default function adminPagesReducer(state = initialState, action) {
  switch (action.type) {
    case POSTS_LOADED:
      return postsLoaded(state, action);

    case USERS_LOADED:
      return usersLoaded(state, action);

    case COMMENTS_LOADED:
      return commentsLoaded(state, action);

    case RECORD_ADDED:
      return recordAdded(state, action);

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

    case CHANGE_SELECTED_RECORD:
      return changeSelectedRecord(state, action);

    case CHANGE_ADMIN_OPERATION:
      return changeAdminOperation(state, action);

    case FILTER_ADMIN_DATA:
      return filterAdminData(state, action);

    case SORT_DATA:
      return sortData(state, action);

    case LOAD_FORM_DATA:
      return loadFormData(state, action);

    case SHOW_MODAL:
      return showModal(state, action);

    case HIDE_MODAL:
      return hideModal(state, action);
  }

  return state;
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
  };
}

function recordAdded(state, { entities, addedRecord, addedRecordId }) { // eslint-disable-line no-unused-vars
  const { data, recordIds } = state;

  return {
    ...state,
    data: _.merge({}, data, addedRecord),
    recordIds: [...recordIds, addedRecordId],
    successMessage: 'Record added successfully',
    addedRecord: addedRecord[addedRecordId]
  };
}

function recordEdited(state, action) { // eslint-disable-line no-unused-vars
  return {
    ...state,
    successMessage: "Record edited successfully"
  };
}

function commentVisibilityChanged(state, { entities, commentId }) {
  const visibility = entities.comments[commentId].visible ? "visible" : "hidden" 

  return {
    ...state,
    successMessage: `Comment ${commentId} now ${visibility}`
  };
}

function recordDeleted(state, { deletedRecordId }) {
  const { data, recordIds } = state;
  return {
    ...state,
    data: _.omit(data, deletedRecordId),
    recordIds: _.reject(recordIds, item => item === deletedRecordId),
    successMessage: "Record deleted successfully",
  };
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

function changeSelectedRecord(state, { value }) {
  return {
    ...state,
    selectedRecord: value
  };
}

function changeAdminOperation(state, { value }) {
  return {
    ...state,
    adminOperation: value
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

function showModal(state, action) { // eslint-disable-line no-unused-vars
  return {
    ...state,
    modalShowing: true
  };
}

function hideModal(state, action) { // eslint-disable-line no-unused-vars
  return {
    ...state,
    modalShowing: false
  };
}