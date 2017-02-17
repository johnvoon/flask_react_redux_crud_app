import { COMMENT_ADDED } from '../constants/actionTypes';

export function commentAdded(entities, commentId) {
  return {
    type: COMMENT_ADDED,
    entities,
    commentId
  };
}