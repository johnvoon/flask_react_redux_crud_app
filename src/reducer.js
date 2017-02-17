import { combineReducers } from 'redux';
import entitiesReducer from './Entities/reducer';
import blogHomeReducer from './BlogHome/reducer';
import blogPostReducer from './BlogPost/reducer';
import adminPagesReducer from './AdminPages/reducer';
import practiceAreasReducer from './PracticeAreas/reducer';
import authenticationReducer from './Authentication/reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  entities: entitiesReducer,
  blogHome: blogHomeReducer,
  blogPost: blogPostReducer,
  adminPages: adminPagesReducer,
  practiceAreas: practiceAreasReducer,
  authentication: authenticationReducer,
  form: formReducer
});

export default rootReducer;
