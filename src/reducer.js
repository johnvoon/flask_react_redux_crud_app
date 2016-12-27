import { combineReducers } from 'redux';
import globalPostsReducer from './Blog/reducer';
import blogHomeReducer from './containers/BlogHome/reducer';
import adminPostsReducer from './containers/AdminPosts/reducer';

const rootReducer = combineReducers({
  posts: globalPostsReducer,
  blog: blogHomeReducer,
  adminPosts: adminPostsReducer
});

export default rootReducer;
