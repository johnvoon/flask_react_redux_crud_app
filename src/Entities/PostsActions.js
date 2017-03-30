import axios from 'axios';
import { normalizeResponseData } from 'utils';
import { postSchema } from 'constants/Schemas';
import { recordsLoaded,
         recordAdded,
         recordEdited, 
         recordDeleted } from 'Admin/actions';
import { POSTS_LOADED,
         POST_LOADED } from 'constants/actionTypes';

export function fetchPosts(admin = false) {
  return dispatch => {
    return axios.get(`${API_URL}/api/posts`)
    .then(({data: {posts}}) => {
      const normalized = normalizeResponseData(posts, postSchema);

      if (admin) {
        dispatch(recordsLoaded(
          normalized.entities.posts,
          normalized.result
        ));
      } else {
        dispatch(postsLoaded(
          normalized.entities,
          normalized.result
        ));        
      }
    });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    return axios.get(`${API_URL}/api/posts/${id}`)
    .then(({data: {post}}) => {
      const normalized = normalizeResponseData(post, postSchema);
      
      return dispatch(postLoaded(
        normalized.entities.posts, 
        post.id
      ));
    });
  };
}

export function addPost(config, content) {
  return (dispatch) => {
    return axios.post(
      `${API_URL}/api/posts`, 
      content, 
      config
    )
    .then(({data: {post}}) => {
      const normalized = normalizeResponseData(post, postSchema);

      dispatch(recordAdded(
        normalized.entities, 
        normalized.entities.posts, 
        post.id));
    });
  };
}

export function editPost(config, content, id) {
  return (dispatch) => {
    return axios.put(
      `${API_URL}/api/posts/${id}`, 
      content, 
      config
    )
    .then(({data: {post}}) => {
      const normalized = normalizeResponseData(post, postSchema);
      dispatch(recordEdited(
        normalized.entities,
        normalized.entities.posts,
        post.id
      ));
    });
  };
}

export function deletePost(config, id) {
  return (dispatch) => {
    return axios.delete(
      `${API_URL}/api/posts/${id}`, 
      config
    )
    .then(({data: {posts}}) => {
      const normalized = normalizeResponseData(posts, postSchema);

      dispatch(recordDeleted(
        normalized.entities,
        normalized.entities.posts,
        normalized.result
      ));
    });
  };
}

export function fetchRelatedPosts(id, practiceArea) {
  return dispatch => {
    id = Number(id);
    return axios.get(`${API_URL}/api/posts`)
    .then(({data: {posts}}) => {
      const relatedPosts = posts.filter(post => {
        return (post.practiceArea === practiceArea) && (post.id !== id);
      });
      const normalized = normalizeResponseData(relatedPosts, postSchema);
      dispatch(postsLoaded(
        normalized.entities,
        normalized.result
      ));
    });  
  };
}

export function postsLoaded(entities, postIds) {
  return {
    type: POSTS_LOADED,
    entities,
    postIds
  };
}

export function postLoaded(post, postId) {
  return {
    type: POST_LOADED,
    post,
    postId
  };
}