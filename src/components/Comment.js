import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import classNames from 'classnames';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCollapsedComment: false
    }
  }

  handleClick() {
    this.setState({
      showCollapsedComment: true
    })
  }

  render() {
    this.handleClick = this.handleClick.bind(this);
    const { comment } = this.props;
    const { showCollapsedComment } = this.state;
    const commentCreated = moment(
      comment.created, 
      "ddd DD-MMM-YYYY HH:mm:ss"
    ).fromNow();
    
    return (
      <ul className="media-list">
        <li className={classNames(
          "comment-collapsed",
          {hidden: comment.visible || showCollapsedComment})}>
          <a 
            role="button"
            onClick={this.handleClick}>
            Show collapsed comment
          </a>
        </li>
        <li className={classNames(
          "media",
          {hidden: !comment.visible && !showCollapsedComment})}>
          <div className="media-left media-middle">
            <Link to="#">
              <img className="media-object" src={comment.userPhoto} alt="User thumbnail photo"/>
            </Link>
          </div>
          <div className="media-body">
            <h4 className="media-heading">
              {comment.authorName}
              <span>{commentCreated}</span>
            </h4>
            {comment.content}
          </div>
        </li>
      </ul>
    );    
  }
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired
};
