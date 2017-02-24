import { CHANGE_PRACTICE_AREA } from 'constants/actionTypes';

const initialState = { 
  currentPracticeArea: ''
};

export default function practiceAreasReducer(state = initialState, action) {
  switch(action.type) {
    case CHANGE_PRACTICE_AREA:
      return changePracticeArea(state, action);
  }

  return state;
}

function changePracticeArea(state, action) {
  const { practiceAreaId } = action;
  console.log(practiceAreaId);
  return {
    ...state,
    practiceAreaId
  };
}
