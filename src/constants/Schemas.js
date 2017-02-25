import { Schema } from 'normalizr';

const practiceArea = new Schema('practiceAreas');
const post = new Schema('posts');
const comment = new Schema('comments');
const user = new Schema('users');
const staff = new Schema('staff');
const staffUser = new Schema('staffUsers', { idAttribute: 'userId'});
const client = new Schema('clients');
const clientUser = new Schema('clientUsers', { idAttribute: 'userId'});
const matter = new Schema('matters');
const currentUser = new Schema('currentUser');

export const practiceAreaSchema = practiceArea;
export const postSchema = post;
export const commentSchema = comment;
export const userSchema = user;
export const staffSchema = staff;
export const staffUserSchema = staffUser;
export const clientSchema = client;
export const clientUserSchema = clientUser;
export const matterSchema = matter;
export const currentUserSchema = currentUser;
