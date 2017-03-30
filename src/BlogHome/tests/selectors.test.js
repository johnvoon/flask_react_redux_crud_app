import _ from 'lodash';
import { 
  selectBlogHome,
  selectPosts,
  selectPostIds,
  selectSortBy,
  selectCurrentFilter,
  selectFilterValues,
  selectCursorEnd,
  selectFilteredPostIds,
  selectVisiblePostIds
} from 'BlogHome/selectors';
import { sortPosts, filter, normalizeResponseData } from 'utils';
import { posts } from 'testData/posts';
import { postSchema } from 'constants/Schemas';

describe('BlogHome selectors', () => {
  const normalized = normalizeResponseData(posts, postSchema);
  let blogHomeState;
  let rootState; 

  beforeEach(() => {
    blogHomeState = {
      postIds: [],
      sortBy: '',
      currentFilter: '',
      filterValues: '',
      cursorEnd: 5,
      hasMore: true
    };
    rootState = {
      blogHome: blogHomeState,
      entities: normalized.entities
    };    
  });

  describe('selectBlogHome', () => {
    it('should select the BlogHome state', () => {
      expect(selectBlogHome(rootState)).toEqual(blogHomeState);
    });
  });

  describe('selectPosts', () => {
    it('should select the Posts state', () => {
      const postState = normalized.entities.posts;

      expect(selectPosts(rootState)).toEqual(postState);
    });
  });

  describe('selectPostIds', () => {
    it('should select the postIds state', () => {
      const postIdState = blogHomeState.postIds;

      expect(selectPostIds(rootState)).toEqual(postIdState);
    });
  });

  describe('selectSortBy', () => {
    it('should select the sortBy state', () => {
      const sortByState = blogHomeState.sortBy;

      expect(selectSortBy(rootState)).toEqual(sortByState);
    });
  });

  describe('selectCurrentFilter', () => {
    it('should select the currentFilter state', () => {
      const currentFilterState = blogHomeState.currentFilter;

      expect(selectCurrentFilter(rootState)).toEqual(currentFilterState);
    });
  });

  describe('selectFilterValues', () => {
    it('should select the filterValues state', () => {
      const filterValuesState = blogHomeState.filterValues;
      
      expect(selectFilterValues(rootState)).toEqual(filterValuesState);
    });
  });

  describe('selectCursorEnd', () => {
    it('should select the cursorEnd state', () => {
      const cursorEndState = blogHomeState.cursorEnd;
      
      expect(selectCursorEnd(rootState)).toEqual(cursorEndState);
    });
  });

  describe('selectFilteredPostIds', () => {
    beforeEach(() => {
      blogHomeState.postIds = Object.keys(normalized.entities.posts);
    });

    it('should select the correct filteredPostIds state if no filters applied', () => {
      blogHomeState.currentFilter = ''
      blogHomeState.sortBy = 'created';

      rootState = {
        blogHome: blogHomeState,
        entities: normalized.entities
      };

      const filteredPostIdsState = sortPosts(
        normalized.entities.posts,
        blogHomeState.postIds,
        "created"
      );

      expect(selectFilteredPostIds(rootState)).toEqual(filteredPostIdsState);
    });

    it('should select the correct filteredPostIds state if keyword filter applied', () => {
      blogHomeState.currentFilter = 'keyword';
      blogHomeState.filterValues = 'Blake';
      blogHomeState.filterValues = 'created';

      rootState = {
        blogHome: blogHomeState,
        entities: normalized.entities
      };

      const filteredPostIdsState = sortPosts(
        normalized.entities.posts,
        filter('Blake', normalized.entities), 
        'created'
      );

      expect(selectFilteredPostIds(rootState)).toEqual(filteredPostIdsState);
    });

    it('should select the correct filteredPostIds state if author filter applied', () => {
      blogHomeState.currentFilter = 'author';
      blogHomeState.filterValues = 'Baker Quigley';
      blogHomeState.sortBy = "created"

      rootState = {
        blogHome: blogHomeState,
        entities: normalized.entities
      };
      
      const filteredPostIdsState = sortPosts(
        normalized.entities.posts, 
        _.filter(
          blogHomeState.postIds, 
          id => normalized.entities.posts[id].author === 'Baker Quigley'
        ),
        'created'
      );

      expect(selectFilteredPostIds(rootState)).toEqual(filteredPostIdsState);
    });

    it('should select the correct filteredPostIds state if area filter applied', () => {
      blogHomeState.currentFilter = 'area';
      blogHomeState.filterValues = 'Dispute Resolution';
      blogHomeState.sortBy = 'created';

      rootState = {
        blogHome: blogHomeState,
        entities: normalized.entities
      };
      
      const filteredPostIdsState = sortPosts(
        normalized.entities.posts,
        _.filter(
          blogHomeState.postIds, 
          id => normalized.entities.posts[id].practiceArea === 'Dispute Resolution'
        ),
        "created"
      );

      expect(selectFilteredPostIds(rootState)).toEqual(filteredPostIdsState);
    });
  });

  describe('selectVisiblePostIds', () => {
    it('should select the visiblePostIds state', () => {
      blogHomeState.postIds = Object.keys(normalized.entities.posts);
      blogHomeState.cursorEnd = 5;
      rootState = {
        blogHome: blogHomeState,
        entities: normalized.entities
      };
      const filteredPostIds = blogHomeState.postIds;
      const cursorEnd = 5;
      const visiblePostIdsState = filteredPostIds.slice(0, cursorEnd);

      expect(selectVisiblePostIds(rootState)).toEqual(visiblePostIdsState);
    });
  })
})



