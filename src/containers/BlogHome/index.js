import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Post from '../../components/Post';
import Link from '../../components/Link';
import Button from '../../components/Button';
import SearchField from '../../components/SearchField';
import { fetchData } from '../../Blog/actions';
import { filterByKeyword, filterByArea, loadMore } from './actions';

const mapStateToProps = (state) => {
  return {
    ...state.blog
  };
};

const mapDispatchToProps = (dispatch) => ({
  onFetchData: () => {
    dispatch(fetchData());
  },

  onSearchFilter: ({target: {value}}) => {
    dispatch(filterByKeyword(value));
  },

  onAreaFilter: (key, area) => {
    dispatch(filterByArea(area));
  },

  onLoadMore: () => {
    dispatch(loadMore());
  }
});

class BlogHome extends Component {
  componentWillMount() {
    this.props.onFetchData();
  }

  render() {
    const { allPosts, visiblePosts,
            onSearchFilter, onAreaFilter,
            filterValues, onLoadMore, currentArea } = this.props;

    const postsList = visiblePosts.map((post) => {
      return (
        <Post
          key={post.id}
          post={post} />
      );
    });

    let areasList = { "All Posts": 0 };
    _.forEach(allPosts, (post) => {
      areasList["All Posts"] += 1;
      if (areasList[post.practice_area]) {
        areasList[post.practice_area] += 1;
      } else {
        areasList[post.practice_area] = 1;
      }
    });

    const areaLinks = Object.keys(areasList).map((area) => {
      return <Link
        key={area}
        linkText={area}
        data={area}
        count={areasList[area]} 
        filterByArea={onAreaFilter.bind(null, area)}
      />
    });

    return (
      <div className="container-fluid">
        <SearchField
          filterValues={filterValues}
          onFilter={onSearchFilter.bind(null)}
        />
        <div className="row">
          <div className="col-md-4">
            <h3>Filter Posts by Practice Area</h3>
            <ul className="list-group">
              {areaLinks}
            </ul>
          </div>
          <div className="col-md-8">
            {currentArea === "All Posts" ? (
              <h2>All Blog Posts</h2>
            ) : (
              <h2>{currentArea} Posts</h2>       
            )}
            {postsList}
            <Button 
              onLoadMore={onLoadMore.bind(null)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(BlogHome);
