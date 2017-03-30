import { createSelector } from 'reselect';
import _ from 'lodash';
import { sortPosts, filter } from 'utils';

export const selectBlogHome = (state) =>
  state.blogHome;

export const selectPosts = (state) => 
  state.entities.posts;

export const selectPostIds = createSelector(
  selectBlogHome,
  (blogHome) => blogHome.postIds
);
      
export const selectSortBy = createSelector(
  selectBlogHome,
  (blogHome) => blogHome.sortBy
);

export const selectCurrentFilter =createSelector(
  selectBlogHome,
  (blogHome) => blogHome.currentFilter
);

export const selectFilterValues = createSelector(
  selectBlogHome,
  (blogHome) => blogHome.filterValues
);

export const selectCursorEnd = createSelector(
  selectBlogHome,
  (blogHome) => blogHome.cursorEnd
);

export const selectFilteredPostIds = createSelector(
  [selectPosts, selectPostIds, selectCurrentFilter, selectFilterValues, selectSortBy],
  (posts, postIds, currentFilter, filterValues, sortBy) => {
    if (!currentFilter) {
      return sortPosts(posts, postIds, sortBy); 
    } else if (currentFilter === "keyword") {
      return sortPosts(
        posts, 
        filter(filterValues, posts), 
        sortBy
      );
    } else if (currentFilter === "author") {
      return sortPosts(posts, _.filter(
        postIds,
        id => posts[id].author === filterValues
      ), sortBy);
    } else if (currentFilter === "area") {
      return sortPosts(posts, _.filter(
        postIds,
        id => posts[id].practiceArea === filterValues
      ), sortBy);
    }
  }
);

export const selectVisiblePostIds = createSelector(
  [selectFilteredPostIds, selectCursorEnd, selectSortBy],
  (filteredPostIds, cursorEnd) => 
    filteredPostIds.slice(0, cursorEnd)
);