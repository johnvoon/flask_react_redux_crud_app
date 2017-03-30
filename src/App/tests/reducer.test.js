import appReducer from 'App/reducer';
import { toggleSidebar, hideSidebar } from 'App/actions';

describe('appReducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      sidebarShowing: false
    }
  });

  it('should return the initial state', () => {
    const stateAfter = initialState;
    expect(appReducer(undefined, {})).toEqual(stateAfter);
  });

  it('should handle the toggleSidebar action correctly', () => {
    const stateAfter = {
      sidebarShowing: true
    };
    expect(appReducer(initialState, toggleSidebar())).toEqual(stateAfter);
  });

  it ('should handle the hideSidebar action correctly', () => {
    const stateAfter = {
      sidebarShowing: false
    };
    expect(appReducer(initialState, hideSidebar())).toEqual(stateAfter);
  })
})