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

export function sortPosts(posts, sortBy) {
  return {
    type: SORT_POSTS,
    posts,
    sortBy
  };
}

export function filterPostsByKeyword(value, posts) {
  return {
    type: FILTER_POSTS_BY_KEYWORD,
    value,
    posts
  };
}

export function filterByArea(posts, area) {
  return {
    type: FILTER_BY_AREA,
    posts,
    area
  };
}

export function filterByAuthor(posts, author) {
  return {
    type: FILTER_BY_AUTHOR,
    posts,
    author
  }; 
}

export function loadMore() {
  return {
    type: LOAD_MORE
  };
}