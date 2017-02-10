import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Post from '../components/Post';
import RelatedPost from '../components/RelatedPost';
import Comment from '../components/Comment';
import { fetchPostData } from '../Entities/actions';

const mapStateToProps = (state) => {
  const { entities, blogPost } = state;

  return {
    ...entities,
    ...blogPost
  };
};

const mapDispatchToProps = (dispatch) => ({
  onFetchPost: (postId) => {
    dispatch(fetchPostData(postId));
  },
  onChangeCurrentPost: (postId) => {
    dispatch(fetchPostData(postId));
  }
});

class BlogPost extends Component {
  componentDidMount() {
    this.props.onFetchPost(this.props.params.id);
  }

  render() {
    const { posts, relatedPosts, comments, commentAuthors, currentPost,
            onChangeCurrentPost, currentPostComments } = this.props;

    const relatedPostsList = relatedPosts.map((id) => {
      return (
        <RelatedPost 
          key={id}
          post={posts[id]}
          dispatchEvent={onChangeCurrentPost.bind(null, id)}
        /> 
      );
    });

    const post = () => {
      if (currentPost) {
        return (
          <Post 
            post={currentPost}
          />
        );
      } else return null;
    };

    const commentsList = (currentPostComments || []).map(id => {
      return (
        <Comment
          key={id}
          comment={comments[id]}
        />
      );
    });

    return (
      <main className="post">
        <div 
          className="jumbotron"
          style={{
            backgroundImage: `url("${currentPost.imgSrc}")`,
            backgroundPosition: 'top center',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed'
          }}>
        </div>
        <div className="container-fluid">
          {post()}
        </div>
        <div className="related-items">
          <div className="related-posts">
            {relatedPostsList}
          </div>
          <div className="comments">
            {currentPostComments.length === 1 ? (
              <h3>{currentPostComments.length} comment</h3>  
            ) : (
              <h3>{currentPostComments.length} comments</h3>
            )}
            {commentsList}
          </div>
        </div>
      </main>
    );
  }
}

BlogPost.propTypes = {
  onFetchPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  relatedPosts: PropTypes.array.isRequired,
  comments: PropTypes.object.isRequired,
  commentAuthors: PropTypes.object.isRequired,
  currentPost: PropTypes.object.isRequired,
  onChangeCurrentPost: PropTypes.func.isRequired,
  currentPostComments: PropTypes.array.isRequired
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(BlogPost);
