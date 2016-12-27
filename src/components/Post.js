import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

const Post = ({ post }) => {
  const postCreated = moment(post.created, "ddd DD-MMM-YYYY HH:mm:ss").format('D MMMM YYYY');

  return (
    <div className="post-container clearfix">
      <div className="img-fixed-width">
        <img className="img-fixed" src={post.img_src} alt="img" />
      </div>
      <div className="container-fluid text-fluid">
        <h2><Link>{post.title}</Link></h2>
        <p>
          By <a href="#">{post.author.name}</a> in <a href="#">{post.practice_area}</a> on {postCreated}
        </p>
        <p>{post.summary}</p>
        <a href="#" className="btn btn-primary btn-lg border-square">Read More</a>
      </div>
    </div>
  );
};

export default Post;