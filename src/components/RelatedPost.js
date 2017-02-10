import React, { Component, PropTypes } from 'react';
import Avatar from './Avatar';
import { Link } from 'react-router';

export default class RelatedPost extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { dispatchEvent } = this.props;
    dispatchEvent();
  }
  
  render() {
    const { post } = this.props;

    return (
      <div className="col-sm-4">
        <div className="thumbnail">
          <div 
            className="thumbnail-image"
            style={{
              backgroundImage: `url('${post.imgSrc}')`
            }}/>
          <div className="caption">
            <p>More on {post.practiceArea}</p>
            <h4>
              <Link 
                to={`/blog/${post.id}`}
                onClick={this.handleClick}>
                {post.title}
              </Link>
            </h4>
            <Avatar
              avatarPhoto={post.authorPhoto}
              avatarName={post.author}/>
          </div>
        </div>
      </div>
    );
  }
}

RelatedPost.propTypes = {
  dispatchEvent: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};