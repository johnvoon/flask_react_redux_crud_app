import { normalizeResponseData } from 'utils';
import blogHomeReducer from 'BlogHome/reducer';
import { postsLoaded } from 'Entities/PostsActions';
import { 
  showAllPosts, 
  sortPosts,
  filterPostsByKeyword,
  filterByArea,
  filterByAuthor,
  loadMore
} from 'BlogHome/actions';
import { posts } from 'testData/posts';
import { postSchema } from 'constants/Schemas';

describe('blogHomeReducer', () => {
  let initialState;
  let postIds;
  let normalized;

  describe('Before post data loaded', () => {
    beforeEach(() => {
      initialState = {
        postIds: [],
        sortBy: '',
        currentFilter: '',
        filterValues: '',
        cursorEnd: 5,
        hasMore: true
      };

      normalized = normalizeResponseData(posts, postSchema);
    });

    it('should return the initial state', () => {
      const stateAfter = initialState;
      expect(blogHomeReducer(undefined, {})).toEqual(stateAfter);
    });

    it('should handle the postsLoaded action correctly', () => {
      const stateAfter = {
        postIds: normalized.result,
        sortBy: '',
        currentFilter: '',
        filterValues: '',
        cursorEnd: 5,
        hasMore: true
      };

      expect(blogHomeReducer(initialState, postsLoaded(normalized.entities, normalized.result))).toEqual(stateAfter);
    });    
  });

  describe('After post data loaded', () => {
    beforeEach(() => {
      normalized = normalizeResponseData(posts, postSchema);
      initialState = {
        postIds: normalized.result,
        sortBy: '',
        currentFilter: '',
        filterValues: '',
        cursorEnd: 5,
        hasMore: true
      };
    });

    it('should handle the showAllPosts action correctly', () => {
      const stateAfter = {
        postIds: normalized.result,
        sortBy: '',
        currentFilter: '',
        filterValues: '',
        cursorEnd: 5,
        hasMore: true
      };

      expect(blogHomeReducer(initialState, showAllPosts())).toEqual(stateAfter);
    });

    it('should handle the sortPosts action correctly', () => {
      const sortBy = "created";
      const stateAfter = {
        postIds: normalized.result,
        sortBy,
        currentFilter: '',
        filterValues: '',
        cursorEnd: 5,
        hasMore: true
      };

      expect(blogHomeReducer(initialState, sortPosts(sortBy))).toEqual(stateAfter);
    });

    it('should handle the filterPostsByKeyword action correctly', () => {    
      const value = "Keyword";
      const stateAfter = {
        postIds: normalized.result,
        sortBy: '',
        currentFilter: 'keyword',
        filterValues: value,
        cursorEnd: 5,
        hasMore: true
      };

      expect(blogHomeReducer(initialState, filterPostsByKeyword(value))).toEqual(stateAfter);
    }); 

    it('should handle the filterByArea action correctly', () => {
      const area = "Dispute Resolution"
      const stateAfter = {
        postIds: normalized.result,
        sortBy: '',
        currentFilter: 'area',
        filterValues: area,
        cursorEnd: 5,
        hasMore: true
      };

      expect(blogHomeReducer(initialState, filterByArea(area))).toEqual(stateAfter);
    });

    it('should handle the filterByAuthor action correctly', () => {
      const author = "Blake Quigley";
      const stateAfter = {
        postIds: normalized.result,
        sortBy: '',
        currentFilter: 'author',
        filterValues: author,
        cursorEnd: 5,
        hasMore: true
      };
      expect(blogHomeReducer(initialState, filterByAuthor(author))).toEqual(stateAfter);
    });

    it('should handle the loadMore action correctly if filteredPostIds.length > cursorEnd', () => {
      const filteredPostIds = normalized.result;
      const stateAfter = {
        postIds: normalized.result,
        sortBy: '',
        currentFilter: '',
        filterValues: '',
        cursorEnd: 10,
        hasMore: true
      };

      expect(blogHomeReducer(initialState, loadMore(filteredPostIds))).toEqual(stateAfter);
    });

    it('should handle the loadMore action correctly if filteredPostIds.length < cursorEnd', () => {
      const filteredPostIds = normalized.result.slice(0, 5);
      const stateAfter = {
        postIds: normalized.result,
        sortBy: '',
        currentFilter: '',
        filterValues: '',
        cursorEnd: 5,
        hasMore: false
      };

      expect(blogHomeReducer(initialState, loadMore(filteredPostIds))).toEqual(stateAfter);
    });
  });
});
