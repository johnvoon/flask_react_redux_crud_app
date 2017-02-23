import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import Helmet from 'react-helmet';
import { VelocityTransitionGroup } from 'velocity-react';
import Post from '../components/Post';
import RelatedPost from '../components/RelatedPost';
import Comment from '../components/Comment';
import Avatar from '../components/Avatar';
import CommentForm from './CommentForm';
import { fetchPost, fetchRelatedPosts } from '../Entities/PostsActions';
import { fetchComments, addComment } from '../Entities/CommentsActions';
import { fetchCurrentUser } from '../Authentication/actions';
import { selectSortedComments } from './selectors';
import _ from 'lodash';

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
      showCommentTextArea: false
    }
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

  changeCurrentPost(id, event) {
    const { router, params, onFetchPost, 
    onFetchRelatedPosts, onFetchComments } = this.props;
    event.preventDefault();
    router.push(`/blog/${id}`);
    onFetchPost(id)
    .then(({post, postId}) => {
      const practiceArea = post[postId].practiceArea;
      onFetchRelatedPosts(postId, practiceArea);
      onFetchComments(postId);
    });
  }

  render() {
    this.showCommentTextArea = this.showCommentTextArea.bind(this);
    this.hideCommentTextArea = this.hideCommentTextArea.bind(this);
    this.changeCurrentPost = this.changeCurrentPost.bind(this);
    const { posts, relatedPosts, comments, currentPost,
            sortedComments, currentUser, onAddComment } = this.props;
    const { showCommentTextArea } = this.state;
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
                    onHide={this.hideCommentTextArea}
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
  post: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  relatedPosts: PropTypes.array.isRequired,
  comments: PropTypes.object.isRequired,
  currentPost: PropTypes.object.isRequired,
  onChangeCurrentPost: PropTypes.func.isRequired,
};

export default withRouter(
  connect(
    mapStateToProps, 
    mapDispatchToProps
  )(BlogPost)
);
