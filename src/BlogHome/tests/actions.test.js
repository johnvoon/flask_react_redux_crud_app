import {
  SHOW_ALL_POSTS,
  SORT_POSTS,
  FILTER_POSTS_BY_KEYWORD,
  FILTER_BY_AREA,
  FILTER_BY_AUTHOR,
  LOAD_MORE
} from 'constants/actionTypes';
import { 
  showAllPosts, 
  sortPosts,
  filterPostsByKeyword,
  filterByArea,
  filterByAuthor,
  loadMore } from 'BlogHome/actions';

describe('BlogHome Actions', () => {
  describe('showAllPosts', () => {
    it('should return correct type', () => {
      const expectedResult = {
        type: SHOW_ALL_POSTS
      };

      expect(showAllPosts()).toEqual(expectedResult);
    });
  });

  describe('sortPosts', () => {
    it('should return correct type and prop to sort by', () => {
      const sortBy = "created";
      const expectedResult = {
        type: SORT_POSTS,
        sortBy
      };

      expect(sortPosts(sortBy)).toEqual(expectedResult);
    });
  });

  describe('filterPostsByKeyword', () => {
    it('should return correct type and keywords to filter by', () => {
      const value = "A";
      const expectedResult = {
        type: FILTER_POSTS_BY_KEYWORD,
        value
      };

      expect(filterPostsByKeyword(value)).toEqual(expectedResult);      
    });
  });

  describe('filterByArea', () => {
    it('should return correct type and area to filter by', () => {
      const area = "Dispute Resolution";
      const expectedResult = {
        type: FILTER_BY_AREA,
        area
      };

      expect(filterByArea(area)).toEqual(expectedResult);      
    });
  });

  describe('filterByAuthor', () => {
    it('should return correct type and author to filter by', () => {
      const author = "A";
      const expectedResult = {
        type: FILTER_BY_AUTHOR,
        author
      };

      expect(filterByAuthor(author)).toEqual(expectedResult);      
    });
  });

  describe('loadMore', () => {
    it('should return correct type and author to filter by', () => {
      const filteredPostIds = [1, 2, 3, 4, 5];
      const expectedResult = {
        type: LOAD_MORE,
        filteredPostIds
      };

      expect(loadMore(filteredPostIds)).toEqual(expectedResult);      
    });
  });
});