import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import appReducer from 'App/reducer';
import entitiesReducer from 'Entities/reducer';
import blogHomeReducer from 'BlogHome/reducer';
import blogPostReducer from 'BlogPost/reducer';
import adminReducer from 'AdminDashboard/reducer';
import adminPagesReducer from 'Admin/reducer';
import practiceAreaReducer from 'PracticeArea/reducer';
import practiceAreasReducer from 'PracticeAreas/reducer';
import authenticationReducer from 'Authentication/reducer';

const rootReducer = combineReducers({
  app: appReducer,
  entities: entitiesReducer,
  blogHome: blogHomeReducer,
  blogPost: blogPostReducer,
  admin: adminReducer,
  adminPages: adminPagesReducer,
  practiceArea: practiceAreaReducer,
  practiceAreas: practiceAreasReducer,
  authentication: authenticationReducer,
  form: formReducer
});

export default rootReducer;
