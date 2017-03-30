import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

export default function configureStore(state) {
  return configureMockStore([thunk])(state);
}