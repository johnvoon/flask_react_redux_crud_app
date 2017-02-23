import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import sr from 'components/ScrollReveal';

export default class PostCard extends Component {
  componentDidMount() {
    const config = {
      duration: 1000,
      scale: 1,
      distance: 0
    }

    sr.reveal(this.postCard, config)
    sr.reveal(this.postCardImage, config);
  }  

  render() {
    const { post } = this.props;
    const postCreated = moment(post.created, "ddd DD-MMM-YYYY HH:mm:ss").format('D MMMM YYYY');
    
    return (
      <div 
        className="post-card clearfix"
        ref={div => this.postCard = div}>
        <div className="post-card-img">
          <img
            className="img-responsive"
            src={post.thumbnailSrc} 
            alt="img" 
            ref={img => this.postCardImage = img}/>
        </div>
        <div className="post-card-content">
          <h2 className="no-margin-top">
            <Link to={`/blog/${post.id}`}>{post.title}</Link>
          </h2>
          <p className="post-details">
            <a href="#">{post.author}</a> | <a href="#">{post.practiceArea}</a> | {postCreated}
          </p>
          <p>{post.summary}</p>
          <Link 
            to={"/blog/" + post.id} 
            className="btn btn-primary text-uppercase">
            Read More
          </Link>
        </div>
      </div>
    );    
  }
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired
};