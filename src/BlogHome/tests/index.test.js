import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import _ from 'lodash';
import configureStore from 'mockStore';
import { normalizeResponseData } from 'utils';
import ConnectedBlogHome, { BlogHome, mapDispatchToProps } from 'BlogHome/index';
import { showAllPosts,
         sortPosts,
         filterPostsByKeyword,
         filterByArea,
         filterByAuthor,
         loadMore } from 'BlogHome/actions';
import { posts } from 'testData/posts';
import { practiceAreas } from 'testData/practiceAreas';
import { staff } from 'testData/staff';
import { postSchema, practiceAreaSchema, staffSchema } from 'constants/Schemas';
import DropdownMenu from 'components/DropdownMenu';

jest.mock('Entities/PostsActions');
jest.mock('Entities/PracticeAreasActions');
jest.mock('Entities/StaffActions');
import { fetchPosts } from 'Entities/PostsActions';
import { fetchPracticeAreas } from 'Entities/PracticeAreasActions';
import { fetchStaff } from 'Entities/StaffActions';


describe('<BlogHome />', () => {
  const onFetchPosts = jest.fn();
  const onFetchPracticeAreas= jest.fn();
  const onFetchStaff = jest.fn();
  const onShowAllPosts = jest.fn();
  const onFilterPostsByKeyword = jest.fn();
  const onFilterByArea = jest.fn();
  const onFilterByAuthor = jest.fn();
  const onLoadMore = jest.fn();
  const onSortPosts = jest.fn();
  const normalizedPosts = normalizeResponseData(posts, postSchema).entities.posts;
  const normalizedPracticeAreas = normalizeResponseData(practiceAreas, practiceAreaSchema).entities.practiceAreas;
  const normalizedStaff = normalizeResponseData(staff, staffSchema).entities.staff
  const store = configureStore({
    entities: {
      posts: normalizedPosts,
      practiceAreas: normalizedPracticeAreas,
      staff: normalizedStaff
    },
    blogHome: {
      postIds: Object.keys(normalizedPosts),
      filteredPostIds: Object.keys(normalizedPosts),
      visiblePostIds: Object.keys(normalizedPosts).slice(0, 5),
      sortBy: '',
      currentFilter: '',
      filterValues: '',
      cursorEnd: 5,
      hasMore: true
    },
  });

  describe('Mounted component before data fetched', () => {
    const renderedComponent = mount(
      <BlogHome
        onFetchPosts={onFetchPosts}
        onFetchPracticeAreas={onFetchPracticeAreas}
        onFetchStaff={onFetchStaff}
        onShowAllPosts={onShowAllPosts}
        onFilterPostsByKeyword={onFilterPostsByKeyword}
        onFilterByArea={onFilterByArea}
        onFilterByAuthor={onFilterByAuthor}
        onLoadMore={onLoadMore}
        onSortPosts={onSortPosts}
        posts={{}}
        practiceAreas={{}}
        staff={{}}
        filteredPostIds={[]}
        visiblePostIds={[]}
        filterValues=""
        currentFilter=""
        hasMore={true}/>
    );

    it('should fetch posts, practice areas and staff on mount', () => {
      expect(onFetchPosts).toHaveBeenCalled();
      expect(onFetchPracticeAreas).toHaveBeenCalled();
      expect(onFetchStaff).toHaveBeenCalled();
    });
  });

  describe('Mounted component after data fetched', () => {
    let renderedComponent;
    beforeEach(() => {
      renderedComponent = mount(
        <BlogHome
          onFetchPosts={onFetchPosts}
          onFetchPracticeAreas={onFetchPracticeAreas}
          onFetchStaff={onFetchStaff}
          onShowAllPosts={onShowAllPosts}
          onFilterPostsByKeyword={onFilterPostsByKeyword}
          onFilterByArea={onFilterByArea}
          onFilterByAuthor={onFilterByAuthor}
          onLoadMore={onLoadMore}
          onSortPosts={onSortPosts}
          posts={normalizedPosts}
          practiceAreas={normalizedPracticeAreas}
          staff={normalizedStaff}
          filteredPostIds={Object.keys(normalizedPosts)}
          visiblePostIds={Object.keys(normalizedPosts).slice(0, 5)}
          filterValues=""
          currentFilter=""
          hasMore={true}/>
      );
    });

    it('should contain a Footer component', () => {
      expect(renderedComponent.find('Footer').length).toBe(1);
    })

    it('should contain 5 PostCard components', () => {
      expect(renderedComponent.find('.post-card').length).toBe(5);
    });

    it('should contain 3 sorting categories when sort menu toggled', () => {
      renderedComponent.setState({
        showSortMenu: true
      });

      expect(renderedComponent.find('.list-group-item').length).toBe(3);
      expect(renderedComponent).toMatchSnapshot();
    });

    it('should contain more than 0 practice areas to filter by when filter by area menu toggled', () => {
      renderedComponent.setState({
        showAreaMenu: true
      });

      expect(renderedComponent.find('.list-group-item').length).toBeGreaterThan(0);
      expect(renderedComponent).toMatchSnapshot();
    });

    it('should contain more than 0 authors to filter by when filter by author menu toggled', () => {
      renderedComponent.setState({
        showAuthorMenu: true
      });

      expect(renderedComponent.find('.list-group-item').length).toBeGreaterThan(0);
      expect(renderedComponent).toMatchSnapshot();
    });

    describe('Sort by button', () => {
      it('should set this.state.showSortMenu to true if clicked', () => {
        const sortByButton = renderedComponent.findWhere(n => n.prop("heading") === "Sort by").find('button');
        sortByButton.simulate('click');
        
        expect(renderedComponent.state('showSortMenu')).toEqual(true);
      });      
    });

    describe('Filter By Practice Area button', () => {
      it('should set this.state.showAreaMenu to true if clicked', () => {
        const filterByAreaButton = renderedComponent.findWhere(n => n.prop("heading") === "Filter by Practice Area").find('button');
        filterByAreaButton.simulate('click');
        
        expect(renderedComponent.state('showAreaMenu')).toEqual(true);
      });      
    });

    describe('Filter By Author button', () => {
      it('should set this.state.showAuthorMenu to true if clicked', () => {
        const filterByAuthorButton = renderedComponent.findWhere(n => n.prop("heading") === "Filter by Author").find('button');
        filterByAuthorButton.simulate('click');
        
        expect(renderedComponent.state('showAuthorMenu')).toEqual(true);
      });      
    });

    describe('Created link', () => {
      it('should call onSortPosts if clicked', () => {
        renderedComponent.setState({
          showSortMenu: true
        });

        const sortLink = renderedComponent.findWhere(n => n.prop("linkText") === "Created");
        sortLink.simulate('click');
        
        expect(onSortPosts).toHaveBeenCalledWith("created");  
      });      
    });

    describe('All Posts link under filter by area dropdown', () => {
      it('should call onShowAllPosts if clicked', () => {
        renderedComponent.setState({
          showAreaMenu: true
        });

        renderedComponent.find('.list-group-item').first().simulate('click');
        
        expect(onShowAllPosts).toHaveBeenCalled();       
      });      
    });

    describe('All Posts link under filter by author dropdown', () => {
      it('should call onShowAllPosts if clicked', () => {
        renderedComponent.setState({
          showAuthorMenu: true
        });

        renderedComponent.find('.list-group-item').first().simulate('click');
        
        expect(onShowAllPosts).toHaveBeenCalled();       
      });      
    });

    describe('Dispute Resolution (Practice Area) link', () => {
      it('should call onFilterByArea if clicked', () => {
        renderedComponent.setState({
          showAreaMenu: true
        });
        const practiceAreaLink = renderedComponent.findWhere(n => n.prop("linkText") === "Dispute Resolution");
        practiceAreaLink.simulate('click');

        expect(onFilterByArea).toHaveBeenCalledWith("Dispute Resolution");
      });
    });

    describe('Baker Quigley (Author) link', () => {
      it('should call onFilterByAuthor if clicked', () => {
        renderedComponent.setState({
          showAuthorMenu: true
        });
        const authorLink = renderedComponent.findWhere(n => n.prop("linkText") === "Baker Quigley");
        authorLink.simulate('click');

        expect(onFilterByAuthor).toHaveBeenCalledWith("Baker Quigley");
      });
    });

    describe('Search input field', () => {
      it('should call onFilterPostsByKeyword if a value is entered', () => {
        renderedComponent.find('input').simulate('change', { target: {value: 'A'}});
        
        expect(onFilterPostsByKeyword).toHaveBeenCalled();
      });
    });
  });

  describe('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const thunk = jest.fn();

    describe('onFetchPosts', () => {
      it('should be injected', () => {
        const { onFetchPosts } = mapDispatchToProps(dispatch);
        
        expect(onFetchPosts).toBeDefined();
      });

      it('should dispatch fetchPosts when called', () => {
        fetchPosts.mockImplementation(() => thunk);
        mapDispatchToProps(dispatch).onFetchPosts();

        expect(dispatch).toHaveBeenCalledWith(fetchPosts());
      });
    });

    describe('onFetchPracticeAreas', () => {
      it('should be injected', () => {
        const { onFetchPracticeAreas } = mapDispatchToProps(dispatch);
        
        expect(onFetchPracticeAreas).toBeDefined();
      });

      it('should dispatch fetchPracticeAreas when called', () => {
        fetchPracticeAreas.mockImplementation(() => thunk);
        mapDispatchToProps(dispatch).onFetchPracticeAreas();

        expect(dispatch).toHaveBeenCalledWith(fetchPracticeAreas());
      });
    });

    describe('onFetchStaff', () => {
      it('should be injected', () => {
        const { onFetchStaff } = mapDispatchToProps(dispatch);
        
        expect(onFetchStaff).toBeDefined();
      });

      it('should dispatch fetchStaff when called', () => {
        fetchStaff.mockImplementation(() => thunk);
        mapDispatchToProps(dispatch).onFetchStaff();

        expect(dispatch).toHaveBeenCalledWith(fetchStaff());
      });
    });

    describe('onFilterPostsByKeyword', () => {
      it('should be injected', () => {
        const { onFilterPostsByKeyword } = mapDispatchToProps(dispatch);
        
        expect(onFilterPostsByKeyword).toBeDefined();
      });

      it('should dispatch filterPostsByKeyword when called', () => {
        const posts = [1, 2, 3, 4, 5];
        const keywords = "Family Law";
        const event = { target: { value: keywords }};
        mapDispatchToProps(dispatch).onFilterPostsByKeyword(event);

        expect(dispatch).toHaveBeenCalledWith(filterPostsByKeyword(keywords));
      });
    });

    describe('onShowAllPosts', () => {
      it('should be injected', () => {
        const { onShowAllPosts } = mapDispatchToProps(dispatch);
        
        expect(onShowAllPosts).toBeDefined();
      });

      it('should dispatch showAllPosts when called', () => {
        mapDispatchToProps(dispatch).onShowAllPosts();

        expect(dispatch).toHaveBeenCalledWith(showAllPosts());
      });
    });

    describe('onSortPosts', () => {
      it('should be injected', () => {
        const { onSortPosts } = mapDispatchToProps(dispatch);
        
        expect(onSortPosts).toBeDefined();
      });

      it('should dispatch showAllPosts when called', () => {
        const posts = [1, 2, 3, 4, 5];
        const sortBy = "created";

        mapDispatchToProps(dispatch).onSortPosts(posts, sortBy);

        expect(dispatch).toHaveBeenCalledWith(sortPosts(posts, sortBy));
      });
    });

    describe('onFilterByArea', () => {
      it('should be injected', () => {
        const { onFilterByArea } = mapDispatchToProps(dispatch);
        
        expect(onFilterByArea).toBeDefined();
      });

      it('should dispatch filterByArea when called', () => {
        const posts = [1, 2, 3, 4, 5];
        const linkText = "Family Law";

        mapDispatchToProps(dispatch).onFilterByArea(posts, linkText);

        expect(dispatch).toHaveBeenCalledWith(filterByArea(posts, linkText));
      });
    });

    describe('onFilterByAuthor', () => {
      it('should be injected', () => {
        const { onFilterByAuthor } = mapDispatchToProps(dispatch);
        
        expect(onFilterByAuthor).toBeDefined();
      });

      it('should dispatch filterByAuthor when called', () => {
        const posts = [1, 2, 3, 4, 5];
        const linkText = "Author Name";

        mapDispatchToProps(dispatch).onFilterByAuthor(posts, linkText);

        expect(dispatch).toHaveBeenCalledWith(filterByAuthor(posts, linkText));
      });
    });

    describe('onLoafcordMore', () => {
      it('should be injected', () => {
        const { onLoadMore } = mapDispatchToProps(dispatch);
        
        expect(onLoadMore).toBeDefined();
      });

      it('should dispatch loadMore when called', () => {
        mapDispatchToProps(dispatch).onLoadMore();

        expect(dispatch).toHaveBeenCalledWith(loadMore());
      });
    });
  });
});