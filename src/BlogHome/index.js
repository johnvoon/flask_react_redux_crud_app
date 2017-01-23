import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import PostCard from '../components/PostCard';
import Link from '../components/Link';
import SearchField from '../components/SearchField';
import { fetchBlogData } from '../Blog/actions';
import { showAllPosts,
         filterPostsByKeyword, 
         filterByArea, 
         filterByAuthor, 
         loadMore } from './actions';

const mapStateToProps = (state) => {
  const { blogEntities, blogHome } = state;
  
  return {
    ...blogEntities,
    ...blogHome
  };
};

const mapDispatchToProps = (dispatch) => ({
  onFetchBlogData: () => {
    dispatch(fetchBlogData());
  },

  onSearchFilter: (posts, {target: {value}}) => {
    dispatch(filterPostsByKeyword(value, posts));
  },

  onShowAll: () => {
    dispatch(showAllPosts());
  },

  onAreaFilter: (posts, {target: {textContent}}) => {
    dispatch(filterByArea(posts, textContent));
  },

  onAuthorFilter: (posts, {target: {textContent}}) => {
    dispatch(filterByAuthor(posts, textContent));
  },

  onLoadMore: (allAvailablePosts) => {
    (allAvailablePosts.length > 0) && dispatch(loadMore());
  }
});

class BlogHome extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showAllMenu: true,
      showAreaMenu: false,
      showAuthorMenu: false
    };
    this.toggleAllMenu = this.toggleAllMenu.bind(this);
    this.toggleAreaMenu = this.toggleAreaMenu.bind(this);
    this.toggleAuthorMenu = this.toggleAuthorMenu.bind(this);
  }

  componentWillMount() {
    this.props.onFetchBlogData();
  }

  toggleAllMenu(event) {
    event.preventDefault();
    this.setState({showAllMenu: this.state.showAllMenu ? false : true})
  }

  toggleAreaMenu() {
    event.preventDefault();
    this.setState({showAreaMenu: this.state.showAreaMenu ? false : true})
  }

  toggleAuthorMenu() {
    event.preventDefault();
    this.setState({showAuthorMenu: this.state.showAuthorMenu ? false : true})
  }

  render() {
    const { posts, practiceAreas, postAuthors, visiblePosts, allAvailablePosts, filterValues, currentFilter, hasMore } = this.props;
    const { onShowAll, onSearchFilter, onAreaFilter, onAuthorFilter, onLoadMore } = this.props;
    const { showAllMenu, showAreaMenu, showAuthorMenu } = this.state;
    console.log(showAllMenu, showAreaMenu, showAuthorMenu);
    const postsList = visiblePosts.map((id) => {
      return (
        <PostCard
          key={id}
          post={posts[id]}
        />
      );
    });
    
    const allPostsLink = () => {
      return (
        <Link
          linkText="All Posts"
          data="All Posts"
          count={Object.keys(posts).length}
          dispatchEvent={onShowAll.bind(null)}
        />
      );
    };

    const areaLinks = Object.keys(practiceAreas).map((id) => {
      return (
        <Link
          key={id}
          linkText={practiceAreas[id].area}
          data={practiceAreas[id].area}
          count={practiceAreas[id].posts}
          dispatchEvent={onAreaFilter.bind(null, posts)}
        />
      );
    });

    const authorLinks = Object.keys(postAuthors).map((id) => {
      return (
        <Link
          key={id}
          linkText={postAuthors[id].name}
          data={postAuthors[id].name}
          count={postAuthors[id].posts}
          dispatchEvent={onAuthorFilter.bind(null, posts)}
        />
      );
    });

    return (
      <div className="container-fluid">
        <div className="jumbotron">
          <div className="container">
            <h1>Blog Posts</h1>
            <h3>Blog posts written by leading industry professionals</h3>
          </div>
        </div>
        <SearchField
          filterValues={filterValues}
          onFilter={onSearchFilter.bind(null, posts)}
        />
        {(Object.keys(posts).length > 0) ? 
          <div className="row">
            <div className="col-md-4">
              <ul className={"list-group " + (showAllMenu ? "" : "hidden")}>
                {allPostsLink()}
              </ul>
              <button 
                className="btn btn-block btn-default"
                onClick={this.toggleAreaMenu}>
              <h4>Filter by Practice Area</h4>
              </button>
              <ul className={"list-group " + (showAreaMenu ? "" : "hidden")}>
                {areaLinks}
              </ul>
              <button 
                className="btn btn-block btn-default"
                onClick={this.toggleAuthorMenu}>
              <h4>Filter by Author</h4>
              </button>
              <ul className={"list-group " + (showAuthorMenu ? "" : "hidden")}>
                {authorLinks}
              </ul>            
            </div>
            <div className="col-md-8">
              {(currentFilter === "area") ? (
                <h2>{filterValues}</h2>       
              ) : (currentFilter === "author") ? (
                <h2>Posts by {filterValues}</h2>
              ) : (currentFilter === "keyword") ? (
                <h2>Posts found: {allAvailablePosts.length}</h2>
              ) : (
                <h2>All Posts</h2>
              )}
              <InfiniteScroll 
                pageStart={0}
                allAvailablePosts={allAvailablePosts}
                loadMore={onLoadMore.bind(null, allAvailablePosts)}
                hasMore={hasMore}
                loader={<div className="loader">Loading...</div>}
                threshold={0}>
                {postsList}
              </InfiniteScroll>
            </div>
          </div> : <div className="loader">Loading...</div>}
      </div>
    );
  }
}

BlogHome.propTypes = {
  onFetchBlogData: PropTypes.func.isRequired,
  onShowAll: PropTypes.func.isRequired,
  onSearchFilter: PropTypes.func.isRequired,
  onAreaFilter: PropTypes.func.isRequired,
  onAuthorFilter: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  practiceAreas: PropTypes.object.isRequired,
  postAuthors: PropTypes.object.isRequired,
  visiblePosts: PropTypes.array.isRequired,
  filterValues: PropTypes.string.isRequired,
  currentFilter: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(BlogHome);
