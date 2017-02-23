import axios from 'axios';
import { sortByDate } from '../utils';
import { arrayOf, normalize } from 'normalizr';
import { postSchema } from '../constants/Schemas';
import { recordAdded,
         recordEdited, 
         recordDeleted } from '../AdminPages/actions';
import { fetchComments } from './CommentsActions';
import { POSTS_LOADED,
         POST_LOADED } from '../constants/actionTypes';

export function fetchPosts() {
  return dispatch => {
    return axios.get('http://localhost:8000/api/posts')
    .then(({data: {posts}}) => {
      const normalized = normalize(posts, arrayOf(postSchema));
      const allPosts = sortByDate(
        normalized.entities.posts, 
        normalized.result, 
        'descending'
      );
      dispatch(postsLoaded(
        normalized.entities,
        allPosts
      ));
    });
  };
}

export function fetchPostData(id) {
  return (dispatch, getState) => {
    dispatch(fetchPosts())
    .then(() => dispatch(fetchPost(id)))
    .then(() => {
      const post = getState().entities.posts[id];
      const practiceArea = post.practiceArea;
      dispatch(fetchRelatedPosts(id, practiceArea));
      dispatch(fetchComments(id));
    });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    return axios.get(`http://localhost:8000/api/posts/${id}`)
    .then(({data: {post}}) => {
      const normalized = normalize(post, postSchema);
      return dispatch(postLoaded(normalized.entities, normalized.entities.posts, post.id));
    });
  };
}

export function addPost(config, content) {
  return (dispatch) => {
    return axios.post(
      'http://localhost:8000/api/posts', 
      content, 
      config
    )
    .then(({data: {post}}) => {
      const normalized = normalize(post, postSchema);
      dispatch(recordAdded(normalized.entities, normalized.entities.posts, post.id));
    })
  };
}

export function editPost(config, content, id) {
  return (dispatch) => {
    return axios.put(
      `http://localhost:8000/api/posts/${id}`, 
      content, 
      config
    )
    .then(({data: {post}}) => {
      const normalized = normalize(post, postSchema);
      dispatch(recordEdited(normalized.entities));
    });
  };
}

export function deletePost(config, id) {
  return (dispatch) => {
    return axios.delete(
      `http://localhost:8000/api/posts/${id}`, 
      config
    )
    .then(({data: {post}}) => {
      dispatch(recordDeleted(
        post,
        post.id
      ));
    });
  };
}

export function fetchRelatedPosts(id, practiceArea) {
  return dispatch => {
    id = Number(id);
    return axios.get('http://localhost:8000/api/posts')
    .then(({data: {posts}}) => {
      const relatedPosts = posts.filter(post => {
        return (post.practiceArea === practiceArea) && (post.id !== id);
      });
      const normalized = normalize(relatedPosts, arrayOf(postSchema));
      const orderedPosts = sortByDate(
        normalized.entities.posts,
        normalized.result,
        'descending'
      );
      dispatch(postsLoaded(
        normalized.entities,
        orderedPosts
      ));
    });  
  };
}

export function postsLoaded(entities, posts) {
  return {
    type: POSTS_LOADED,
    entities,
    posts
  };
}

export function postLoaded(entities, post, postId) {
  return {
    type: POST_LOADED,
    entities,
    post,
    postId
  };
}