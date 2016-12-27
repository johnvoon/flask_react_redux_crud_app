import { Schema, arrayOf } from 'normalizr';

const post = new Schema('posts')
const postAuthor = new Schema('postAuthors')
const comment = new Schema('comment')
const commentAuthor = new Schema('commentAuthors')

post.define({
  author: postAuthor,
  comments: arrayOf(comment)
})

comment.define({
  author: commentAuthor
})

export const postSchema = post;
export const postAuthorSchema = postAuthor;
export const commentSchema = comment;
export const commentAuthorSchema = commentAuthor;