import _ from 'lodash';
import deepAssign from 'deep-assign';
import { RECORDS_LOADED,
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
         CHANGE_ADMIN_OPERATION,
         RESET_STATE } from 'constants/actionTypes';

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
    case RECORDS_LOADED:
      return recordsLoaded(state, action);

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

    case RESET_STATE:
      return resetState(state, action);
  }

  return state;
}

function recordsLoaded(state, { records, recordIds }) {
  return {
    ...state,
    data: records || {},
    recordIds
  };
}

function recordAdded(state, { addedRecord, addedRecordId }) { // eslint-disable-line no-unused-vars
  const { data, recordIds } = state;

  return {
    ...state,
    data: _.merge({}, data, addedRecord),
    recordIds: [...recordIds, addedRecordId],
    successMessage: 'Record added successfully',
    addedRecord: addedRecord[addedRecordId]
  };
}

function recordEdited(state, { editedRecord }) { 
  const { data } = state;

  return {
    ...state,
    data: _.merge({}, data, editedRecord),
    successMessage: "Record edited successfully"
  };
}

function commentVisibilityChanged(state, { entities, commentId }) {
  const visibility = entities.comments[commentId].visible ? "visible" : "hidden";

  return {
    ...state,
    successMessage: `Comment ${commentId} now ${visibility}`
  };
}

function recordDeleted(state, { records, recordIds }) {
  return {
    ...state,
    data: records,
    recordIds,
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
  return deepAssign({}, state, { formData });
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

function resetState(state, action) { // eslint-disable-line no-unused-vars
  return {
    ...state,
    data: {},
    recordIds: []
  };
}