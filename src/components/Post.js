import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class Post extends Component {
  render() {
    const { post } = this.props;
    const postCreated = moment(post.created, "ddd DD-MMM-YYYY HH:mm:ss").format('D MMMM YYYY');
    const postUpdated = moment(post.updated, "ddd DD-MMM-YYYY HH:mm:ss").format('D MMMM YYYY');
    const postBody = (post.body || []).map((paragraph, idx) => {
      return (
        <p key={idx}>{paragraph}</p>
      );
    });

    return (
      <div>
        <img className="img-responsive center-block" src={post.imgSrc} alt="img" />  
        <h1>{post.title}</h1>
        <p><a href="#">{post.author}</a> in <a href="#">{post.practiceArea}</a> on {postCreated}</p>
        <p>Last updated on {postUpdated}</p>
        {postBody}
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired
};