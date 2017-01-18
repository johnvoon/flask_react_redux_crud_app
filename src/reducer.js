import { combineReducers } from 'redux';
import blogEntitiesReducer from './Blog/reducer';
import userEntitiesReducer from './User/reducer';
import blogHomeReducer from './BlogHome/reducer';
import blogPostReducer from './BlogPost/reducer';
import adminPagesReducer from './AdminPages/reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  blogEntities: blogEntitiesReducer,
  userEntities: userEntitiesReducer,
  blogHome: blogHomeReducer,
  blogPost: blogPostReducer,
  adminPages: adminPagesReducer,
  form: formReducer
});

export default rootReducer;
