import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { VelocityComponent } from 'velocity-react';
import Waypoint from 'react-waypoint';
import moment from 'moment';

export default class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false
    };

    this.handleEnter = this.handleEnter.bind(this);
  }

  handleEnter() {
    this.setState({
      showComponent: true
    });
  }

  render() {
    const { post } = this.props;
    const postCreated = moment(post.created, "ddd DD-MMM-YYYY HH:mm:ss").format('D MMMM YYYY');
    
    return (
      <VelocityComponent
        animation={{opacity: this.state.showComponent ? 1 : 0}}
        duration={700}>
        <Waypoint 
          onEnter={this.handleEnter}>
          <div
            className="post-card clearfix">
            <div className="post-card-img">
              <img
                className="img-responsive"
                src={post.thumbnailSrc} 
                alt="img"/>
            </div>
            <div className="post-card-content">
              <h2 className="no-margin-top">
                <Link to={`/blog/${post.id}/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="post-details">
                <a href="#">{post.author}</a> | <a href="#">{post.practiceArea}</a> | {postCreated}
              </p>
              <p>{post.summary}</p>
              <Link 
                to={`/blog/${post.id}/${post.slug}`} 
                className="btn btn-primary text-uppercase">
                Read More
              </Link>
            </div>
          </div>
        </Waypoint>
      </VelocityComponent>
    );    
  }
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired
};