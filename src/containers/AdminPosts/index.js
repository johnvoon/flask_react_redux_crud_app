import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Pagination from '../../components/Pagination';
import Table from '../../components/Table';
import SearchField from '../../components/SearchField';
import PageLengthMenu from '../../components/PageLengthMenu';
import { fetchData } from '../../Blog/actions';
import { filterByKeyword, sortData, changePageLength, changePageNumber } from './actions';
import { containsIgnoreCase } from '../../utils/filterSort';

const renderDate = (val, row) => {
  const postCreated = moment(val, "ddd DD-MMM-YYYY HH:mm:ss").format('DD/MM/YYYY');

  return (
    <time>{postCreated}</time>
  );
};

const renderEditLink = (val, row) => {
  return (
    <button className="btn btn-danger btn-sm">
      Edit
    </button>
  );
};

const renderHeading = (val, row) => {
  return (
    <h4 className="media-heading">{val}</h4>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.adminPosts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchData: () => {
      dispatch(fetchData());
    },

    onFilter: ({target: {value}}) => {
      dispatch(filterByKeyword(value));
    },

    onSort: (value) => {
      dispatch(sortData(value));
    },
    
    onPageLengthChange: ({target: {value}}) => {
      dispatch(changePageLength(value));
    },

    onPageNumberChange: (value) => {
      dispatch(changePageNumber(value));
    }
  }
};

class AdminPosts extends Component {
  componentWillMount() {
    this.props.onFetchData();
  }

  render() {
    const { onFilter, onSort, onPageLengthChange, 
      onPageNumberChange, filterValues, totalPages, 
      sortBy, currentPage, pageLength, pageData } = this.props;

    return (
      <div>
        <SearchField 
          filterValues={filterValues}
          onFilter={onFilter.bind(null)}
        />
        <Pagination
          className="pagination"
          pageNavLength={5}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageNumberChange={onPageNumberChange}
        />
        <PageLengthMenu 
          pageLengthOptions={[ 5, 10, 20]}
          pageLength={pageLength}
          onPageLengthChange={onPageLengthChange}
        />
        <Table 
          columns={[
            { title: 'Created On', render: renderDate, prop: 'created' },
            { title: 'Title', render: renderHeading, prop: 'title'},
            { title: 'Author', render: renderHeading, prop: 'author'},
            { title: 'Practice Area', render: renderHeading, prop: 'area'},
            { title: '', render: renderEditLink, className: 'text-center'}
          ]}
          trKey="id"
          sortBy={sortBy}
          onSort={onSort}
          pageData={pageData}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPosts);