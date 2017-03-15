import axios from 'axios';
import { arrayOf, normalize } from 'normalizr';
import { practiceAreaSchema } from 'constants/Schemas';
import { recordsLoaded,
         recordAdded,
         recordEdited } from 'Admin/actions';
import { PRACTICE_AREAS_LOADED,
         PRACTICE_AREA_LOADED } from 'constants/actionTypes';

export function fetchPracticeAreas(admin = false) {
  return dispatch => {
    return axios.get(`${API_URL}/api/practice-areas`)
    .then(({data: {practiceAreas}}) => {
      const normalized = normalize(
        practiceAreas, 
        arrayOf(practiceAreaSchema)
      );

      if (admin) {
        dispatch(recordsLoaded(
          normalized.entities.practiceAreas,
          normalized.result
        ));
      } else {
        dispatch(practiceAreasLoaded(
          normalized.entities,
          normalized.result
        ));
      }
    });
  };
}

export function fetchPracticeArea(slug) {
  return (dispatch) => {
    return axios.get(`${API_URL}/api/practice-areas/${slug}`)
    .then(({data: {practiceArea}}) => {
      const normalized = normalize(practiceArea, practiceAreaSchema);
      return dispatch(
        practiceAreaLoaded(
          normalized.entities.practiceAreas, 
          practiceArea.id
        ));
    });
  };
}

export function addPracticeArea(config, content) {
  return (dispatch) => {
    return axios.post(
      `${API_URL}/api/practice-areas`, 
      content, 
      config
    )
    .then(({data: {practiceArea}}) => {
        const normalized = normalize(practiceArea, practiceAreaSchema);
        dispatch(recordAdded(
          normalized.entities, 
          normalized.entities.practiceAreas, 
          practiceArea.id
        ));
      }
    );
  };
}

export function editPracticeArea(config, content, slug) {
  return (dispatch) => {
    return axios.put(
      `${API_URL}/api/practice-areas/${slug}`, 
      content,
      config
    )
    .then(({data: {practiceArea}}) => {
      const normalized = normalize(practiceArea, practiceAreaSchema);
      dispatch(recordEdited(
        normalized.entities,
        normalized.entities.practiceAreas,
        practiceArea.id));
    });
  };
}

export function practiceAreasLoaded(entities, practiceAreaIds) {
  return {
    type: PRACTICE_AREAS_LOADED,
    entities,
    practiceAreaIds
  };
}

export function practiceAreaLoaded(practiceArea, practiceAreaId) {
  return {
    type: PRACTICE_AREA_LOADED,
    practiceArea,
    practiceAreaId
  };
}