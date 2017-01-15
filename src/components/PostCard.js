import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

const PostCard = ({post}) => {
  const postCreated = moment(post.created, "ddd DD-MMM-YYYY HH:mm:ss").format('D MMMM YYYY');

  return (
    <div className="post-container clearfix">
      <div className="img-fixed-width">
        <img className="img-fixed" src={post.thumbnailSrc} alt="img" />
      </div>
      <div className="container-fluid text-fluid">
        <h2>
          <Link to={`/blog/${post.id}`}>{post.title}</Link>
        </h2>
        <p>
          By <a href="#">{post.author}</a> in <a href="#">{post.practiceArea}</a> on {postCreated}
        </p>
        <p>{post.summary}</p>
        <Link 
          to={"/blog/" + post.id} 
          className="btn btn-primary btn-lg border-square">
          Read More
        </Link>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostCard;