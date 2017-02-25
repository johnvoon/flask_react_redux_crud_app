import axios from 'axios';
import { arrayOf, normalize } from 'normalizr';
import { matterSchema } from 'constants/Schemas';
import { MATTERS_LOADED,
         MATTER_ADDED } from 'constants/actionTypes';
import { recordAdded,
         recordEdited } from 'Admin/actions';

export function fetchMatters(config) {
  return dispatch => {
    axios.get(
      'http://localhost:8000/api/matters', 
      config
    )
    .then(({data: {matters}}) => {
      const normalized = normalize(matters, arrayOf(matterSchema));
      dispatch(mattersLoaded(
        normalized.entities,
        normalized.result
      ));
    });      
  };
}

export function mattersLoaded(entities, matters) {
  return {
    type: MATTERS_LOADED,
    entities,
    matters
  };
}

export function addMatter(config, content) {
  return (dispatch) => {
    return axios.post(
      'http://localhost:8000/api/matters', 
      content, 
      config
    )
    .then(({data: {matter}}) => {
      const normalized = normalize(matter, matterSchema);
      dispatch(recordAdded(normalized.entities, normalized.entities.matters, matter.id));
    });
  };
}

export function addMatterInsideForm(config, content) {
  return (dispatch) => {
    return axios.post(
      'http://localhost:8000/api/matters', 
      content, 
      config
    )
    .then(({data: {matter}}) => {
        const normalized = normalize(matter, matterSchema);
        return dispatch(matterAdded(normalized.entities, matter.id));
      }
    );
  };
}

export function editMatter(config, content, id) {
  return (dispatch) => {
    return axios.put(
      `http://localhost:8000/api/matters/${id}`, 
      content,
      config
    )
    .then(({data: {matter}}) => {
      const normalized = normalize(matter, matterSchema);
      dispatch(recordEdited(normalized.entities));
    });
  };
}

export function matterAdded(entities, matterId) {
  return {
    type: MATTER_ADDED,
    entities,
    matterId
  };
}