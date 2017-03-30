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
import Footer from 'components/Footer';
import { fetchPosts } from 'Entities/PostsActions';
import { fetchPracticeAreas } from 'Entities/PracticeAreasActions';
import { fetchStaff } from 'Entities/StaffActions';
import { showAllPosts,
         sortPosts,
         filterPostsByKeyword, 
         filterByArea, 
         filterByAuthor, 
         loadMore } from './actions';
import { selectVisiblePostIds, selectFilteredPostIds } from './selectors';

const mapStateToProps = (state) => {
  const { entities, blogHome } = state;

  return {
    visiblePostIds: selectVisiblePostIds(state),
    filteredPostIds: selectFilteredPostIds(state),
    ...entities,
    ...blogHome
  };
};

export const mapDispatchToProps = (dispatch) => ({
  onFetchPosts: () => {
    dispatch(fetchPosts());
  },

  onFetchPracticeAreas: () => {
    dispatch(fetchPracticeAreas());
  },

  onFetchStaff: () => {
    dispatch(fetchStaff());
  },

  onFilterPostsByKeyword: ({target: {value}}) => {
    dispatch(filterPostsByKeyword(value));
  },

  onShowAllPosts: () => {
    dispatch(showAllPosts());
  },

  onSortPosts: (sortBy) => {
    dispatch(sortPosts(sortBy));
  },

  onFilterByArea: (linkText) => {
    dispatch(filterByArea(linkText));
  },

  onFilterByAuthor: (linkText) => {
    dispatch(filterByAuthor(linkText));
  },

  onLoadMore: (filteredPostIds) => {
    dispatch(loadMore(filteredPostIds));
  }
});

export class BlogHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSortMenu: false,
      showAreaMenu: false,
      showAuthorMenu: false,
      showPostCard: false
    };
    this.toggleSortMenu = this.toggleSortMenu.bind(this);
    this.toggleAreaMenu = this.toggleAreaMenu.bind(this);
    this.toggleAuthorMenu = this.toggleAuthorMenu.bind(this);
  }

  componentDidMount() {
    const { onFetchPosts, onFetchPracticeAreas, 
      onFetchStaff } = this.props;
    
    onFetchPosts();
    onFetchPracticeAreas();
    onFetchStaff();
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

  handleAllPostsLinkClick(event) {
    const { onShowAllPosts } = this.props;
    
    event.preventDefault();
    onShowAllPosts();
    scrollIntoViewIfNeeded(
      this._postsContainer, 
      false, 
      {duration: 400}
    );
  }

  handleSortLinkClick(event, sortBy) {
    const { onSortPosts } = this.props;

    event.preventDefault();
    onSortPosts(sortBy);
    scrollIntoViewIfNeeded(
      this._postsContainer, 
      false, 
      {duration: 400}
    );
  }

  handleAreaLinkClick(event, id) {
    const { onFilterByArea, practiceAreas } = this.props;

    event.preventDefault();
    onFilterByArea(practiceAreas[id].area);
    scrollIntoViewIfNeeded(
      this._postsContainer, 
      false, 
      {duration: 400}
    );
  }

  handleAuthorLinkClick(event, id) {
    const { onFilterByAuthor, staff } = this.props;

    event.preventDefault();
    onFilterByAuthor(staff[id].name);
    scrollIntoViewIfNeeded(
      this._postsContainer, 
      false, 
      {duration: 400}
    );
  }

  render() {
    const { posts, practiceAreas, staff, 
      visiblePostIds, filteredPostIds, filterValues, 
      currentFilter, hasMore } = this.props;
    const { onFilterPostsByKeyword, onLoadMore } = this.props;
    const { showSortMenu, showAreaMenu, 
      showAuthorMenu } = this.state;
    const postsList = visiblePostIds.map((id) => {
      return (
        <PostCard
          key={id}
          post={posts[id]}/>
      );
    });
    
    const allPostsLink = () => {
      return (
        <FilterLink
          linkText="All Posts"
          count={Object.keys(posts).length}
          handleClick={(event) => this.handleAllPostsLinkClick(event)}/>
      );
    };

    const sortLinks = ["title", "created", "author"].map(sortBy => {
      return (
        <FilterLink
          key={sortBy}
          linkText={_.capitalize(sortBy)}
          handleClick={(event) => this.handleSortLinkClick(event, sortBy)}/>
      );
    });

    const areaLinks = Object.keys(practiceAreas).map((id) => {
      if (practiceAreas[id].posts.length > 0) {
        return (
          <FilterLink
            key={id}
            linkText={practiceAreas[id].area}
            count={practiceAreas[id].posts.length}
            handleClick={(event) => this.handleAreaLinkClick(event, id)}/>
        );
      }
    });

    const authorLinks = Object.keys(staff).map((id) => {
      return (
        <FilterLink
          key={id}
          linkText={staff[id].name}
          count={staff[id].posts}
          handleClick={(event) => this.handleAuthorLinkClick(event, id)}/>
      );
    });

    return (
      <div>
        <main>
          <Helmet
            title="Our Blog"
            meta={[
              { name: 'description', content: "Our firm's latest blog posts written by industry professionals." }
            ]}/>
          <div 
            className="jumbotron"
            style={{
              backgroundImage: `url(${API_URL}/static/images/2000/coffee-smartphone.jpg)`,
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
                  onFilter={onFilterPostsByKeyword}
                  placeholder="Search posts by keyword"/>
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
                  (currentFilter === "keyword") ? `Posts found: ${filteredPostIds.length}` :
                  "All Posts"}</h2>
                <InfiniteScroll 
                  pageStart={0}
                  loadMore={() => filteredPostIds.length > 0 && onLoadMore(filteredPostIds)}
                  hasMore={hasMore}
                  threshold={100}>
                  {postsList}
                </InfiniteScroll>
              </div>
            </div>
          </div> : <div/>}
          <Footer/>
        </main>
      </div>
    );
  }
}

BlogHome.propTypes = {
  onFetchPosts: PropTypes.func.isRequired,
  onFetchPracticeAreas: PropTypes.func.isRequired,
  onFetchStaff: PropTypes.func.isRequired,
  onShowAllPosts: PropTypes.func.isRequired,
  onFilterPostsByKeyword: PropTypes.func.isRequired,
  onFilterByArea: PropTypes.func.isRequired,
  onFilterByAuthor: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  onSortPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  practiceAreas: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired,
  filteredPostIds: PropTypes.array.isRequired,
  visiblePostIds: PropTypes.array.isRequired,
  filterValues: PropTypes.string.isRequired,
  currentFilter: PropTypes.string.isRequired,
  hasMore: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(BlogHome);
