import { CHANGE_PRACTICE_AREA } from 'constants/actionTypes';

export function changePracticeArea(practiceAreaId) {
  return {
    type: CHANGE_PRACTICE_AREA,
    practiceAreaId
  };
}
