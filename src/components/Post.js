import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class Post extends Component {
  render() {
    const { post } = this.props;
    const postCreated = moment(post.created, "ddd DD-MMM-YYYY HH:mm:ss").format('D MMMM YYYY');
    const postUpdated = moment(post.updated, "ddd DD-MMM-YYYY HH:mm:ss").format('D MMMM YYYY');
    const postBody = (post.body || []).map((paragraph, idx) => {
      if (post.body.length > 1) {
        return (
          <p key={idx}>{paragraph}</p>
        );
      } else {
        return (
          <div key={idx} dangerouslySetInnerHTML={{__html: paragraph}}/>
        );
      }
    });

    return (
      <div className="post">
        <h1>{post.title}</h1>
        <p className="post-details"><a href="#">{post.author}</a> | <a href="#">{post.practiceArea}</a> | {postCreated}</p>
        <p>Last updated on {postUpdated}</p>
        {postBody}
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired
};