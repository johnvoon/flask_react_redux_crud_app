import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import Helmet from 'react-helmet';
import { VelocityTransitionGroup } from 'velocity-react';
import CommentForm from './CommentForm';
import { selectSortedComments } from './selectors';
import { fetchPost, fetchRelatedPosts } from 'Entities/PostsActions';
import { fetchComments, addComment } from 'Entities/CommentsActions';
import { fetchCurrentUser } from 'Authentication/actions';
import Post from 'components/Post';
import RelatedPost from 'components/RelatedPost';
import Comment from 'components/Comment';
import Avatar from 'components/Avatar';

const mapStateToProps = (state) => {
  const { entities, blogPost, authentication } = state;
  
  return {
    sortedComments: selectSortedComments(state),
    ...entities,
    ...blogPost,
    ...authentication
  };
};

const mapDispatchToProps = (dispatch) => ({
  onFetchCurrentUser: () => {
    dispatch(fetchCurrentUser());
  },

  onFetchPost: (id) => {
    return dispatch(fetchPost(id));
  },

  onFetchRelatedPosts: (id, practiceArea) => {
    dispatch(fetchRelatedPosts(id, practiceArea));
  },

  onFetchComments: (id) => {
    dispatch(fetchComments(id));
  },

  onAddComment: (formData) => {
    return dispatch(addComment(formData));
  }
});

class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCommentForm: false
    };
  }

  componentDidMount() {
    const { params, onFetchCurrentUser, 
      onFetchPost, onFetchRelatedPosts,
      onFetchComments } = this.props;

    onFetchCurrentUser();
    onFetchPost(params.id)
    .then(({post, postId}) => {
      const practiceArea = post[postId].practiceArea;
      onFetchRelatedPosts(postId, practiceArea);
      onFetchComments(postId);
    });
  }

  showCommentForm() {
    this.setState({
      showCommentForm: true
    });
  }

  hideCommentForm() {
    this.setState({
      showCommentForm: false
    });
  }

  changeCurrentPost(id, event) {
    const { router, onFetchPost, 
    onFetchRelatedPosts, onFetchComments } = this.props;
    event.preventDefault();
    onFetchPost(id)
    .then(({post, postId}) => {
      router.push(`/blog/${postId}/${post[postId].slug}`);
      onFetchRelatedPosts(postId, post[postId].practiceArea);
      onFetchComments(postId);
    });
  }

  render() {
    this.showCommentForm = this.showCommentForm.bind(this);
    this.hideCommentForm = this.hideCommentForm.bind(this);
    this.changeCurrentPost = this.changeCurrentPost.bind(this);
    const { posts, relatedPosts, comments, currentPost,
            sortedComments, currentUser, onAddComment } = this.props;
    const { showCommentForm } = this.state;
    const relatedPostsList = relatedPosts.map((id) => {
      return (
        <RelatedPost 
          key={id}
          post={posts[id]}
          dispatchEvent={this.changeCurrentPost.bind(null, id)}
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

    const commentsList = (sortedComments || []).map(id => {
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
            backgroundImage: `url(${currentPost.imgSrc})`,
            backgroundPosition: 'top center',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed'
          }}/>
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
              onClick={this.showCommentForm}
              onBlur={this.hideCommentForm}>
              {_.isEmpty(currentUser) ? (
                <Link to={{
                  pathname: '/login',
                  query: { next: `/blog/${currentPost.id}/${currentPost.slug}`}
                }}>
                  <Avatar
                    iconClassName="comment"
                    avatarText="Log in to leave a comment..."/>
                </Link>
              ) : (
                <Avatar
                  avatarPhoto={currentUser.photo}
                  avatarText={showCommentForm ? currentUser.name : "Leave a Comment"}/>
              )}
              <VelocityTransitionGroup 
                enter={{animation: "slideDown"}}
                leave={{animation: "slideUp"}}>
                {_.isEmpty(currentUser) || !showCommentForm ? null : 
                  <CommentForm
                    name={currentUser.name}
                    onAddComment={onAddComment}
                    onHideCommentForm={this.hideCommentForm}
                    postId={currentPost.id}/>}
              </VelocityTransitionGroup>
            </div>
            {sortedComments.length === 1 ? (
              <h3>{sortedComments.length} comment</h3>  
            ) : (
              <h3>{sortedComments.length} comments</h3>
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
  onFetchCurrentUser: PropTypes.func.isRequired,
  onFetchRelatedPosts: PropTypes.func.isRequired,
  onFetchComments: PropTypes.func.isRequired,
  onAddComment: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  relatedPosts: PropTypes.array.isRequired,
  comments: PropTypes.object.isRequired,
  currentPost: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  sortedComments: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired
};

export default withRouter(
  connect(
    mapStateToProps, 
    mapDispatchToProps
  )(BlogPost)
);
