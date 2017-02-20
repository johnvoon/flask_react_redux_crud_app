import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { VelocityTransitionGroup } from 'velocity-react';
import Post from '../components/Post';
import RelatedPost from '../components/RelatedPost';
import Comment from '../components/Comment';
import Avatar from '../components/Avatar';
import CommentForm from './CommentForm';
import { fetchPostData, addComment } from '../Entities/CommentsActions';
import { fetchCurrentUser } from '../Authentication/actions';
import _ from 'lodash';

const mapStateToProps = (state) => {
  const { entities, blogPost, authentication } = state;
  console.log(entities);
  return {
    ...entities,
    ...blogPost,
    ...authentication
  };
};

const mapDispatchToProps = (dispatch) => ({
  onFetchPost: (postId) => {
    dispatch(fetchPostData(postId));
  },
  
  onChangeCurrentPost: (postId) => {
    dispatch(fetchPostData(postId));
  },
  
  onFetchCurrentUser: () => {
    dispatch(fetchCurrentUser());
  },

  onAddComment: (formData) => {
    dispatch(addComment(formData));
  }
});

class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCommentTextArea: false
    }
  }

  componentDidMount() {
    this.props.onFetchCurrentUser()
    this.props.onFetchPost(this.props.params.id);
  }

  componentDidUpdate() {
    console.log(this.textArea);
  }

  showCommentTextArea() {
    this.setState({
      showCommentTextArea: true
    })
  }

  hideCommentTextArea() {
    this.setState({
      showCommentTextArea: false
    })
  }

  render() {
    this.showCommentTextArea = this.showCommentTextArea.bind(this);
    this.hideCommentTextArea = this.hideCommentTextArea.bind(this);
    const { posts, relatedPosts, comments, currentPost,
            onChangeCurrentPost, currentPostComments, currentUser, onAddComment } = this.props;
    const { showCommentTextArea } = this.state;
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
        <Helmet
          title={currentPost.title}
          meta={[
            { name: 'description', content: currentPost.summary }
          ]}/>
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
          <div className="container-fluid related-posts">
            <div className="row">
              {relatedPostsList}
            </div>
          </div>
          <div className="comments">
            <div 
              className="comment-form"
              onClick={this.showCommentTextArea}
              onBlur={this.hideCommentTextArea}>
              {_.isEmpty(currentUser) ? (
                <Link to={{
                  pathname: '/login',
                  query: { next: `/blog/${currentPost.id}`}
                }}>
                  <Avatar
                    iconClassName="comment"
                    avatarText="Log in to leave a comment..."/>
                </Link>
              ) : (
                <Avatar
                  avatarPhoto={currentUser.photo}
                  avatarText={showCommentTextArea ? currentUser.name : "Leave a Comment"}/>
              )}
              <VelocityTransitionGroup 
                enter={{animation: "slideDown"}}
                leave={{animation: "slideUp"}}>
                {_.isEmpty(currentUser) || !showCommentTextArea ? null : 
                  <CommentForm
                    name={currentUser.name}
                    onAddComment={onAddComment}
                    postId={currentPost.id}
                    ref={textArea => this.textArea = textArea}/>}
              </VelocityTransitionGroup>
            </div>
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
  currentPost: PropTypes.object.isRequired,
  onChangeCurrentPost: PropTypes.func.isRequired,
  currentPostComments: PropTypes.array.isRequired
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(BlogPost);
