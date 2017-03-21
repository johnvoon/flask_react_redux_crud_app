import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

export default function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
  
  return store;
}