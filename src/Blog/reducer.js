import _ from 'lodash';

const initialState = {
  posts: {},
  postAuthors: {},
  comments: {},
  commentAuthors: {},
  practiceAreas: {}
};

export default function blogEntitiesReducer(state = initialState, action) {
  if (action.entities) {
    return _.merge({}, state, action.entities);
  }

  return state;
}
