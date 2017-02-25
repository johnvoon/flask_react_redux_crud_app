import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import entitiesReducer from 'Entities/reducer';
import blogHomeReducer from 'BlogHome/reducer';
import blogPostReducer from 'BlogPost/reducer';
import adminPagesReducer from 'Admin/reducer';
import practiceAreaReducer from 'PracticeArea/reducer';
import authenticationReducer from 'Authentication/reducer';


const rootReducer = combineReducers({
  entities: entitiesReducer,
  blogHome: blogHomeReducer,
  blogPost: blogPostReducer,
  adminPages: adminPagesReducer,
  practiceArea: practiceAreaReducer,
  authentication: authenticationReducer,
  form: formReducer
});

export default rootReducer;
