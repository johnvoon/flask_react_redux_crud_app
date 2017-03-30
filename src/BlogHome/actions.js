import {
  SHOW_ALL_POSTS,
  SORT_POSTS,
  FILTER_POSTS_BY_KEYWORD,
  FILTER_BY_AREA,
  FILTER_BY_AUTHOR,
  LOAD_MORE
} from 'constants/actionTypes';

export function showAllPosts() {
  return {
    type: SHOW_ALL_POSTS
  };
}

export function sortPosts(sortBy) {
  return {
    type: SORT_POSTS,
    sortBy
  };
}

export function filterPostsByKeyword(value) {
  return {
    type: FILTER_POSTS_BY_KEYWORD,
    value
  };
}

export function filterByArea(area) {
  return {
    type: FILTER_BY_AREA,
    area
  };
}

export function filterByAuthor(author) {
  return {
    type: FILTER_BY_AUTHOR,
    author
  }; 
}

export function loadMore(filteredPostIds) {
  return {
    type: LOAD_MORE,
    filteredPostIds
  };
}