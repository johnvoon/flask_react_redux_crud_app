import _ from 'lodash';

const initialState = {
  posts: {},
  comments: {},
  commentAuthors: {},
  practiceAreas: {},
  users: {},
  matters: {},
  staff: {},
  staffUsers: {},
  clients: {},
  clientUsers: {}
};

export default function entitiesReducer(state = initialState, action) {
  if (action.entities) {
    return _.merge({}, state, action.entities);
  }

  return state;
}
