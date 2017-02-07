import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import SearchField from '../components/SearchField';
import PageLengthMenu from '../components/PageLengthMenu';
import ModalMedium from '../components/ModalMedium';
import DeleteRecord from '../components/DeleteRecord';
import SuccessAlert from '../components/SuccessAlert';
import TableDate from '../components/TableDate';
import TablePostLink from '../components/TablePostLink';
import TableHeading from '../components/TableHeading';
import TableDeleteLink from '../components/TableDeleteLink';
import { fetchComments, hideComment, deleteComment } from '../Entities/actions';
import { getJWT, removeJWT } from '../Entities/actions';
import { filterAdminData, 
         sortData, 
         changePageLength, 
         changePageNumber } from './actions';
import { selectData, selectPageData, selectTotalPages } from './selectors';

const mapStateToProps = (state) => {
  const { entities, adminPages } = state;
  return {
    pageData: selectPageData(state),
    totalPages: selectTotalPages(state),
    data: selectData(state),
    ...entities,
    ...adminPages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchComments: () => {
      dispatch(fetchComments());
    },

    onGetJWT: (data) => {
      return dispatch(getJWT(data));
    },

    onJWTExpired: () => {
      dispatch(removeJWT());
    },

    onDelete: (JWT, id) => {
      return dispatch(deletePost(JWT, id));
    },

    onFilter: ({target: {value}}) => {
      dispatch(filterAdminData(value));
    },

    onSort: (sortBy) => {
      dispatch(sortData(sortBy));
    },
    
    onPageLengthChange: ({target: {value}}) => {
      dispatch(changePageLength(value));
    },

    onPageNumberChange: (value) => {
      dispatch(changePageNumber(value));
    }
  };
};

class AdminPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteModal: false,
      currentRecord: {}
    };
  }

  componentWillMount() {
    this.props.onFetchComments();
  }

  renderTableDeleteLink(val, row) {
    return (
      <TableDeleteLink 
        handleClick={() => this.setState({
          currentRecord: row,
          showDeleteModal: true })}/>
    );
  }

  render() {
    const { onGetJWT, onJWTExpired, onDelete, onFilter, onSort, onPageLengthChange, onPageNumberChange } = this.props;
    const { comments } = this.props;
    const { data, filterValues, totalPages, sortBy, currentPage, pageLength, pageData, JWT, JWTExpired, successMessage } = this.props;
    const { currentRecord, showDeleteModal } = this.state;
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };

    return (
      <main className="container-fluid">
        <h1>{`Comments for Post ${this.props.params.id}`}</h1>
        <div className="row">
          <div className="col-sm-3">
            <PageLengthMenu 
              pageLengthOptions={[ 5, 10, 20]}
              pageLength={pageLength}
              onPageLengthChange={onPageLengthChange}/>
          </div>
          <div className="col-sm-5">
            <SearchField 
              filterValues={filterValues}
              onFilter={onFilter}/>
          </div>
          <div className="col-sm-4">
            <Pagination
              pageNavLength={3}
              totalPages={totalPages}
              currentPage={currentPage}
              onPageNumberChange={onPageNumberChange}/>
          </div>
        </div>
        {successMessage && <SuccessAlert message={successMessage}/>}
        <Table 
          columns={[
            { title: 'Created On', component: TableDate, prop: 'created' },
            { title: 'Content', component: TableHeading, prop: 'content'},
            { title: 'Author Username', component: TableHeading, prop: 'authorUsername'},
            { title: 'Author Name', component: TableHeading, prop: 'authorName'},
            { title: 'Visibility', 
              component: (val, row) => this.renderSelectField(val, row),
              className: 'text-center' },
            { title: '', 
              component: (val, row) => this.renderTableDeleteLink(val, row),
              className: 'text-center' }
          ]}
          sortBy={sortBy}
          onSort={onSort}
          pageData={pageData}
          data={data}/>
        <ModalMedium
          title={`Delete Comment (ID: ${currentRecord.id})`}
          show={showDeleteModal} 
          onHide={() => this.setState({showDeleteModal: false})}>
          <DeleteRecord
            onDelete={onDelete.bind(null, config, currentRecord.id)}
            onHide={() => this.setState({showDeleteModal: false})}
            onGetJWT={onGetJWT}
            onJWTExpired={onJWTExpired}
            JWT={JWT}
            JWTExpired={JWTExpired}/>
        </ModalMedium>
      </main>
    );
  }
}

AdminPosts.propTypes = {
  onFetchComments: PropTypes.func.isRequired,
  onGetJWT: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onPageLengthChange: PropTypes.func.isRequired,
  onPageNumberChange: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  postAuthors: PropTypes.object.isRequired,
  practiceAreas: PropTypes.object.isRequired,
  sortBy: PropTypes.object.isRequired,
  filterValues: PropTypes.string.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageLength: PropTypes.number.isRequired,
  pageData: PropTypes.array.isRequired,
  JWT: PropTypes.string.isRequired,
  successMessage: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPosts);