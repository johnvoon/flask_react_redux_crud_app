import deepAssign from 'deep-assign';

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
    return deepAssign({}, state, action.entities);
  }

  return state;
}
