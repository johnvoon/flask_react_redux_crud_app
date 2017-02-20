import { createSelector } from 'reselect';
import _ from 'lodash';
import { sort, sortByDate, filter } from '../utils';

const selectBlogHome = (state) =>
  state.blogHome

const selectPosts = (state) => 
  state.entities.posts

const selectAllPostIds = createSelector(
  selectBlogHome,
  (blogHome) => blogHome.allPosts
)
      
const selectSortBy = createSelector(
  selectBlogHome,
  (blogHome) => blogHome.sortBy
)

const selectFilterValues = createSelector(
  selectBlogHome,
  (blogHome) => blogHome.filterValues
)

const selectFilteredPosts = createSelector(
  [selectPosts, selectFilterValues],
  (posts, filterValues) => {
    return filter(filterValues, posts);
  }
)

const selectSortedData = createSelector(
  [selectPosts, selectFilteredPosts, selectSortBy],
  (posts, filteredPosts, sortBy) => {
    if (sortBy === "created") {
      return sortByDate(posts, filteredPosts, "descending")
    } else {
      return sort(posts, filteredPosts, sortBy, "ascending")
    }
  }
)
