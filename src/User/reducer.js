import _ from 'lodash';

const initialState = {
  users: {}
};

export default function userEntitiesReducer(state = initialState, action) {
  if (action.entities) {
    return _.merge({}, state, action.entities);
  }
  if (action.remainingEntities) {
    return Object.assign({}, state, action.remainingEntities);
  }

  return state;
}
