import { createSelector } from 'reselect';
import { sortByDate } from '../utils';

const selectEntities = (state) =>
  state.entities

const selectBlogPost = (state) => 
  state.blogPost

const selectComments = createSelector(
  selectEntities,
  (entities) => entities.comments
)

const selectCommentIds = createSelector(
  selectBlogPost,
  (blogPost) => blogPost.currentPostComments
)

export const selectSortedComments = createSelector(
  [selectComments, selectCommentIds],
  (comments, commentIds) => {
    return sortByDate(comments, commentIds, "descending");
  }
)
