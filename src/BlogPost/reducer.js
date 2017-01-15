import { POSTS_LOADED,
         POST_LOADED,
         COMMENTS_LOADED } from '../constants/actionTypes';

const initialState = { 
  currentPost: {},
  relatedPosts: [],
  currentPostComments: [] 
};

export default function blogPostReducer(state = initialState, action) {
  switch(action.type) {
    case POSTS_LOADED:
      return postsLoaded(state, action);
    case POST_LOADED:
      return postLoaded(state, action);
    case COMMENTS_LOADED:
      return commentsLoaded(state, action);
  }

  return state;
}

function postsLoaded(state, action) {
  const { posts } = action;

  return {
    ...state,
    relatedPosts: posts.slice(0, 3)
  };
}

function postLoaded(state, { entities, post }) {
  return {
    ...state,
    currentPost: entities.posts[post]
  };
}

function commentsLoaded(state, { comments }) {
  return {
    ...state,
    currentPostComments: comments
  };
}