import { combineReducers } from 'redux';
import entitiesReducer from './Entities/reducer';
import blogHomeReducer from './BlogHome/reducer';
import blogPostReducer from './BlogPost/reducer';
import adminPagesReducer from './AdminPages/reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  entities: entitiesReducer,
  blogHome: blogHomeReducer,
  blogPost: blogPostReducer,
  adminPages: adminPagesReducer,
  form: formReducer
});

export default rootReducer;
