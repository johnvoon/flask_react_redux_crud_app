import axios from 'axios';
import { sortByDate } from '../utils';
import { arrayOf, normalize } from 'normalizr';
import { commentVisibilityChanged } from '../AdminPages/actions';
import { commentSchema } from '../constants/Schemas';
import { COMMENTS_LOADED,
         COMMENT_ADDED } from '../constants/actionTypes';

export function fetchComments(id) {
  return dispatch => {
    return axios.get(`http://localhost:8000/api/posts/${id}/comments`)
    .then(({data: {comments}}) => {
      const normalized = normalize(comments, arrayOf(commentSchema));
      const orderedComments = sortByDate(
        normalized.entities.comments,
        normalized.result,
        'descending'
      );
      dispatch(commentsLoaded(
        normalized.entities,
        orderedComments
      ));
    });  
  };  
}

export function changeCommentVisibility(id, formData, config) {
  return (dispatch) => {
    return axios.put(
      `http://localhost:8000/api/comments/${id}`, 
      formData, 
      config
    )
    .then(({data: {comment}}) => {
      const normalized = normalize(comment, commentSchema);
      dispatch(commentVisibilityChanged(
        normalized.entities,
        String(id)
      ));
    });
  };
}

export function addComment(content) {
  return (dispatch) => {
    return axios.post(
      'http://localhost:8000/api/comments', 
      content
    )
    .then(
    ({data: {comment}}) => {
      const normalized = normalize(comment, commentSchema);
      return dispatch(commentAdded(normalized.entities, comment.id));
    });
  };  
}

export function deleteComment(config, id) {
  return (dispatch) => {
    return axios.delete(
      `http://localhost:8000/api/comment/${id}`, 
      config
    )
    .then(({data: {comment}}) => {
      const normalized = normalize(comment, commentSchema)
      dispatch(recordDeleted(
        normalized,
        comment.id
      ));
    });    
  }
}

export function commentsLoaded(entities, comments) {
  return {
    type: COMMENTS_LOADED,
    entities,
    comments
  };
}

export function commentAdded(entities, commentId) {
  return {
    type: COMMENT_ADDED,
    entities,
    commentId
  };
}