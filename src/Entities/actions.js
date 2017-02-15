import axios from 'axios';
import { arrayOf, normalize } from 'normalizr';
import { postSchema, 
         practiceAreaSchema, 
         postAuthorSchema,
         commentSchema,
         userSchema,
         mattersSchema,
         staffSchema,
         clientSchema } from '../constants/Schemas';
import { sortByDate } from '../utils';
import { recordAdded,
         secondaryRecordAdded, 
         recordEdited, 
         recordDeleted,
         commentVisibilityChanged } from '../AdminPages/actions';
import { POSTS_LOADED,
         POST_LOADED,
         PRACTICE_AREAS_LOADED,
         MATTERS_LOADED,
         POST_AUTHORS_LOADED,
         COMMENTS_LOADED,
         USERS_LOADED,
         JWT_LOADED,
         REMOVE_JWT } from '../constants/actionTypes';


export function fetchBlogData() {
  return dispatch => {
    dispatch(fetchPosts());
    dispatch(fetchPracticeAreas());
    dispatch(fetchPostAuthors());
  };
}

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

export function fetchPracticeAreas() {
  return dispatch => {
    return axios.get('http://localhost:8000/api/practice_areas')
    .then(({data: {practiceAreas}}) => {
      const normalized = normalize(
        practiceAreas, 
        arrayOf(practiceAreaSchema)
      );
      dispatch(practiceAreasLoaded(normalized.entities, normalized.result));
    });
  };
}

export function fetchMatters(config) {
  return dispatch => {
    axios.get(
      'http://localhost:8000/api/matters', 
      config
    )
    .then(({data: {matters}}) => {
      console.log(matters);
      const normalized = normalize(matters, arrayOf(mattersSchema));
      dispatch(mattersLoaded(
        normalized.entities,
        normalized
      ));
    });      
  }
}

export function fetchPostAuthors() {
  return dispatch => {
    return axios.get('http://localhost:8000/api/staff')
    .then(({data: {staff}}) => {
      const normalized = normalize(
        staff, 
        arrayOf(postAuthorSchema)
      );
      dispatch(postAuthorsLoaded(normalized.entities));
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
  console.log(id);
  return (dispatch) => {
    return axios.get(`http://localhost:8000/api/posts/${id}`)
    .then(({data: {post}}) => {
      const normalized = normalize(post, postSchema);
      dispatch(postLoaded(normalized.entities, post.id));
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

export function getJWT(data) {
  return dispatch => {
    return axios.post(
      'http://localhost:8000/auth', 
      data
    )
    .then(({data: {access_token}}) => dispatch(JWTLoaded(access_token)));
  };
}

export function fetchUsers(config) {
  return dispatch => {
    axios.get(
      'http://localhost:8000/api/users', 
      config
    )
    .then(({data: {users}}) => {
      const normalized = normalize(users, arrayOf(userSchema));
      dispatch(usersLoaded(
        normalized.entities,
        normalized
      ));
    });  
  };
}

export function addUser(config, content) {
  return (dispatch) => {
    return axios.post(
      'http://localhost:8000/api/users', 
      content, 
      config
    )
    .then(
    ({data: {user}}) => {
      const normalized = normalize(user, userSchema);
      return dispatch(recordAdded(normalized.entities, normalized.entities.users, user.id));
    });
  };
}

export function addStaff(config, content) {
  return (dispatch) => {
    return axios.post(
      'http://localhost:8000/api/staff', 
      content, 
      config
    )
    .then(
      ({data: {staff}}) => {
        const normalized = normalize(user, userSchema);
        dispatch(recordAdded(normalized.entities, normalized.entities.users, user.id))
      }
    );
  }
}

export function addMatter(config, content) {
  return (dispatch) => {
    return axios.post(
      'http://localhost:8000/api/matters', 
      content, 
      config
    )
    .then(({data: {matters}}) => {
        const normalized = normalize(matters, mattersSchema);
        dispatch(recordAdded(normalized.entities, normalized.entities.matters, matters.id))
      }
    );
  }
}

export function addClient(config, content) {
  return (dispatch) => {
    return axios.post(
      'http://localhost:8000/api/client', 
      content, 
      config
    )
    .then(
      ({data: {client}}) => {
        const normalized = normalize(client, clientSchema);
        dispatch(recordAdded(normalized.entities, normalized.entities.client, client.id))
      }
    );
  }
}

export function editUser(config, content, id) {
  return (dispatch) => {
    return axios.put(
      `http://localhost:8000/api/users/${id}`, 
      content, 
      config
    )
    .then(({data: {user}}) => {
      const normalized = normalize(user, userSchema);
      dispatch(recordEdited(normalized.entities));
    });
  };
}

export function deleteUser(config, id) {
  return (dispatch) => {
    return axios.delete(
      `http://localhost:8000/api/users/${id}`, 
      config
    )
    .then(({data: {user}}) => {
      const normalized = normalize(user, userSchema)
      dispatch(recordDeleted(
        normalized,
        user.id
      ));
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

export function postsLoaded(entities, posts) {
  return {
    type: POSTS_LOADED,
    entities,
    posts
  };
}

export function postLoaded(entities, postId) {
  return {
    type: POST_LOADED,
    entities,
    postId
  };
}

export function commentsLoaded(entities, comments) {
  return {
    type: COMMENTS_LOADED,
    entities,
    comments
  };
}

export function practiceAreasLoaded(entities, practiceAreas) {
  return {
    type: PRACTICE_AREAS_LOADED,
    entities,
    practiceAreas
  };
}

export function postAuthorsLoaded(entities) {
  return {
    type: POST_AUTHORS_LOADED,
    entities
  };
}

export function JWTLoaded(JWT) {
  return {
    type: JWT_LOADED,
    JWT
  };
}

export function removeJWT() {
  return {
    type: REMOVE_JWT
  }
}

export function usersLoaded(entities, users) {
  return {
    type: USERS_LOADED,
    entities,
    users
  };
}

export function mattersLoaded(entities, matters) {
  return {
    type: MATTERS_LOADED,
    entities,
    matters
  }
}