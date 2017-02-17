import _ from 'lodash';

const initialState = {
  posts: {},
  postAuthors: {},
  comments: {},
  commentAuthors: {},
  practiceAreas: {},
  users: {},
  matters: {},
  staff: {},
  clients: {},
  currentUser: {}
};

export default function entitiesReducer(state = initialState, action) {
  if (action.entities) {
    return _.merge({}, state, action.entities);
  }

  return state;
}
