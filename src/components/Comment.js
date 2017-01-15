import React, { PropTypes } from 'react';
import moment from 'moment';

const Comment = ({comment, author}) => {
  const commentCreated = moment(comment.created, "ddd DD-MMM-YYYY HH:mm:ss").format('D MMMM YYYY');
  return (
    <div>
      <h3>{author.name} commented on {commentCreated}</h3>
      <p>{comment.content}</p>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired
};

export default Comment;
