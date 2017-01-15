import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class RelatedPost extends Component {
  onClick() {
    const { dispatchEvent } = this.props;
    dispatchEvent();
  }
  
  render() {
    const { post } = this.props;
    const clickEvent = this.onClick.bind(this);

    return (
      <div className="col-md-4">
        <img src={post.imgSrc} alt="img" className="img-responsive" />
        <h3>
          <Link to={`/blog/${post.id}`} onClick={clickEvent}>{post.title}</Link>
        </h3>
        <p>{post.author}</p>
      </div>
    );
  }
}

RelatedPost.propTypes = {
  dispatchEvent: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};