import { TOGGLE_SIDEBAR, HIDE_SIDEBAR } from 'constants/actionTypes';
import { toggleSidebar, hideSidebar } from 'App/actions';

describe('App Actions', () => {
  describe('toggleSidebar', () => {
    it('should return correct type', () => {
      const expectedResult = {
        type: TOGGLE_SIDEBAR
      };

      expect(toggleSidebar()).toEqual(expectedResult);
    });
  });

  describe('hideSidebar', () => {
    it('should return correct type', () => {
      const expectedResult = {
        type: HIDE_SIDEBAR
      };

      expect(hideSidebar()).toEqual(expectedResult);
    });
  });
});