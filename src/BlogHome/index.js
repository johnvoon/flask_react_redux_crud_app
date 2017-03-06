import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import PostCard from 'components/PostCard';
import FilterLink from 'components/FilterLink';
import SearchField from 'components/SearchField';
import DropdownMenu from 'components/DropdownMenu';
import { fetchPosts } from 'Entities/PostsActions';
import { fetchPracticeAreas } from 'Entities/PracticeAreasActions';
import { fetchStaff } from 'Entities/StaffActions';
import { showAllPosts,
         sortPosts,
         filterPostsByKeyword, 
         filterByArea, 
         filterByAuthor, 
         loadMore } from './actions';

const mapStateToProps = (state) => {
  const { entities, blogHome } = state;

  return {
    ...entities,
    ...blogHome
  };
};

const mapDispatchToProps = (dispatch) => ({
  onFetchPosts: () => {
    dispatch(fetchPosts());
  },

  onFetchPracticeAreas: () => {
    dispatch(fetchPracticeAreas());
  },

  onFetchStaff: () => {
    dispatch(fetchStaff());
  },

  onSearchFilter: (posts, {target: {value}}) => {
    dispatch(filterPostsByKeyword(value, posts));
  },

  onShowAll: () => {
    dispatch(showAllPosts());
  },

  onSort: (posts, sortBy) => {
    dispatch(sortPosts(posts, sortBy));
  },

  onAreaFilter: (posts, linkText) => {
    dispatch(filterByArea(posts, linkText));
  },

  onAuthorFilter: (posts, linkText) => {
    dispatch(filterByAuthor(posts, linkText));
  },

  onLoadMore: (allAvailablePosts) => {
    (allAvailablePosts.length > 0) && dispatch(loadMore());
  }
});

class BlogHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSortMenu: false,
      showAreaMenu: false,
      showAuthorMenu: false
    };
    this.toggleSortMenu = this.toggleSortMenu.bind(this);
    this.toggleAreaMenu = this.toggleAreaMenu.bind(this);
    this.toggleAuthorMenu = this.toggleAuthorMenu.bind(this);
  }

  componentDidMount() {
    this.props.onFetchPosts();
    this.props.onFetchPracticeAreas();
    this.props.onFetchStaff();
  }

  toggleSortMenu() {
    this.setState({
      showSortMenu: this.state.showSortMenu ? false : true
    });
  }

  toggleAreaMenu() {
    this.setState({
      showAreaMenu: this.state.showAreaMenu ? false : true
    });
  }

  toggleAuthorMenu() {
    this.setState({
      showAuthorMenu: this.state.showAuthorMenu ? false : true
    });
  }

  render() {
    const { posts, practiceAreas, staff, visiblePosts, allAvailablePosts, filterValues, currentFilter, hasMore } = this.props;
    const { onSort, onShowAll, onSearchFilter, onAreaFilter, onAuthorFilter, onLoadMore } = this.props;
    const { showSortMenu, showAreaMenu, showAuthorMenu } = this.state;
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
        <FilterLink
          linkText="All Posts"
          count={Object.keys(posts).length}
          dispatchEvent={() => {
            onShowAll();
            scrollIntoViewIfNeeded(
              this._postsContainer, 
              false, 
              {duration: 400}
            );
          }}/>
      );
    };

    const sortLinks = ["views", "title", "created", "author"].map(sortBy => {
      return (
        <FilterLink
          key={sortBy}
          linkText={_.capitalize(sortBy)}
          dispatchEvent={() => {
            onSort(allAvailablePosts, sortBy);
            scrollIntoViewIfNeeded(
              this._postsContainer, 
              false, 
              {duration: 400}
            );
          }}/>
      );
    });

    const areaLinks = Object.keys(practiceAreas).map((id) => {
      return (
        <FilterLink
          key={id}
          linkText={practiceAreas[id].area}
          count={practiceAreas[id].posts}
          dispatchEvent={() => {
            onAreaFilter(posts, practiceAreas[id].area);
            scrollIntoViewIfNeeded(
              this._postsContainer, 
              false, 
              {duration: 400}
            );
          }}/>
      );
    });

    const authorLinks = Object.keys(staff).map((id) => {
      return (
        <FilterLink
          key={id}
          linkText={staff[id].name}
          count={staff[id].posts}
          dispatchEvent={() => {
            onAuthorFilter(posts, staff[id].name);
            scrollIntoViewIfNeeded(
              this._postsContainer, 
              false, 
              {duration: 400}
            );
          }}/>
      );
    });

    return (
      <main>
        <Helmet
          title="Our Blog"
          meta={[
            { name: 'description', content: "Our firm's latest blog posts written by industry professionals." }
          ]}/>
        <div 
          className="jumbotron"
          style={{
            backgroundImage: 'url(static/images/2000/coffee-smartphone.jpg)',
            backgroundPosition: "top center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed"
          }}>
          <div className="container">
            <h1 className="text-uppercase">Blog Posts</h1>
            <h3>Written by leading industry professionals</h3>
          </div>
        </div>
        {(Object.keys(posts).length > 0) ? 
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <SearchField
                filterValues={filterValues}
                onFilter={onSearchFilter.bind(null, posts)}/>
              <DropdownMenu
                heading="Sort by"
                handleClick={this.toggleSortMenu}
                showMenu={showSortMenu}
                links={sortLinks}/>
              <DropdownMenu
                heading="Filter by Practice Area"
                handleClick={this.toggleAreaMenu}
                showMenu={showAreaMenu}
                showAllLink={allPostsLink()}
                links={areaLinks}/>
              <DropdownMenu
                heading="Filter by Author"
                handleClick={this.toggleAuthorMenu}
                showMenu={showAuthorMenu}
                showAllLink={allPostsLink()}
                links={authorLinks}/>        
            </div>
            <div 
              className="col-md-8"
              ref={node => this._postsContainer = node}>
              <h2 className="no-margin-top">{
                (currentFilter === "area") ? filterValues :
                (currentFilter === "author") ? `Posts by ${filterValues}` :
                (currentFilter === "keyword") ? `Posts found: ${allAvailablePosts.length}` :
                "All Posts"}</h2>
              <InfiniteScroll 
                pageStart={0}
                loadMore={onLoadMore.bind(null, allAvailablePosts)}
                hasMore={hasMore}
                threshold={100}>
                {postsList}
              </InfiniteScroll>
            </div>
          </div>
        </div> : <div/>}
      </main>
    );
  }
}

BlogHome.propTypes = {
  onFetchPosts: PropTypes.func.isRequired,
  onFetchPracticeAreas: PropTypes.func.isRequired,
  onFetchStaff: PropTypes.func.isRequired,
  onShowAll: PropTypes.func.isRequired,
  onSearchFilter: PropTypes.func.isRequired,
  onAreaFilter: PropTypes.func.isRequired,
  onAuthorFilter: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  practiceAreas: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired,
  allAvailablePosts: PropTypes.array.isRequired,
  visiblePosts: PropTypes.array.isRequired,
  filterValues: PropTypes.string.isRequired,
  currentFilter: PropTypes.string.isRequired,
  hasMore: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(BlogHome);
