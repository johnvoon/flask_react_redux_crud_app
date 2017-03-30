jest.mock("Authentication/actions");
import { mapDispatchToProps } from 'App/index';
import { toggleSidebar, hideSidebar } from 'App/actions';
import { fetchCurrentUser } from 'Authentication/actions';

describe('<App />', () => {
  describe('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const thunk = jest.fn();

    describe('onFetchCurrentUser', () => {
      it('should be injected', () => {
        const { onFetchCurrentUser } = mapDispatchToProps(dispatch);
        
        expect(onFetchCurrentUser).toBeDefined();
      });

      it('should dispatch fetchCurrentUser when called', () => {
        fetchCurrentUser.mockImplementation(() => thunk);
        mapDispatchToProps(dispatch).onFetchCurrentUser();

        expect(dispatch).toHaveBeenCalledWith(fetchCurrentUser());
      });
    });

    describe('onToggleSidebar', () => {
      it('should be injected', () => {
        const { onToggleSidebar } = mapDispatchToProps(dispatch);
        
        expect(onToggleSidebar).toBeDefined();
      });

      it('should dispatch toggleSidebar when called', () => {
        mapDispatchToProps(dispatch).onToggleSidebar();

        expect(dispatch).toHaveBeenCalledWith(toggleSidebar());
      });
    });

    describe('onHideSidebar', () => {
      it('should be injected', () => {
        const { onHideSidebar } = mapDispatchToProps(dispatch);
        
        expect(onHideSidebar).toBeDefined();
      });

      it('should dispatch hideSidebar when called', () => {
        mapDispatchToProps(dispatch).onHideSidebar();
        
        expect(dispatch).toHaveBeenCalledWith(hideSidebar());
      });
    });
  })
})