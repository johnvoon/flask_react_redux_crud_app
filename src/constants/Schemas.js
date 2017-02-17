import { Schema } from 'normalizr';

const practiceArea = new Schema('practiceAreas');
const post = new Schema('posts');
const postAuthor = new Schema('postAuthors');
const comment = new Schema('comments');
const commentAuthor = new Schema('commentAuthors');
const user = new Schema('users');
const staff = new Schema('staff');
const client = new Schema('clients');
const matter = new Schema('matters');
const currentUser = new Schema('currentUser');

comment.define({
  author: commentAuthor,
});

export const practiceAreaSchema = practiceArea;
export const postSchema = post;
export const postAuthorSchema = postAuthor;
export const commentSchema = comment;
export const commentAuthorSchema = commentAuthor;
export const userSchema = user;
export const staffSchema = staff;
export const clientSchema = client;
export const matterSchema = matter;
export const currentUserSchema = currentUser;