import { Schema } from 'normalizr';

const practiceArea = new Schema('practiceAreas');
const post = new Schema('posts');
const postAuthor = new Schema('postAuthors');
const comment = new Schema('comments');
const commentAuthor = new Schema('commentAuthors');
const user = new Schema('users');
const addressComponent = new Schema('addressComponents');
const addressTypes = new Schema('addressTypes');
const addressShortForm = new Schema('addressShortForm');
const addressLongForm = new Schema('addressLongForm');

comment.define({
  author: commentAuthor,
});

addressComponent.define({
  types: addressTypes,
  short_name: addressShortForm,
  long_name: addressLongForm
});

export const practiceAreaSchema = practiceArea;
export const postSchema = post;
export const postAuthorSchema = postAuthor;
export const commentSchema = comment;
export const commentAuthorSchema = commentAuthor;
export const userSchema = user;
export const addressComponentSchema = addressComponent;