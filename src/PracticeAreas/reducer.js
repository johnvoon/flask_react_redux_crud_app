import { PRACTICE_AREAS_LOADED } from 'constants/actionTypes';

const initialState = { 
  practiceAreaIds: []
};

export default function practiceAreasReducer(state = initialState, action) {
  switch(action.type) {
    case PRACTICE_AREAS_LOADED:
      return practiceAreasLoaded(state, action);
  }

  return state;
}

function practiceAreasLoaded(state, { practiceAreaIds }) {
  return {
    ...state,
    practiceAreaIds
  };
}
