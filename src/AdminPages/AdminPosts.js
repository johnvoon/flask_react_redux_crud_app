import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import SearchField from '../components/SearchField';
import PageLengthMenu from '../components/PageLengthMenu';
import ModalSmall from '../components/ModalSmall';
import ModalLarge from '../components/ModalLarge';
import AddPost from '../components/AddPost';
import EditPost from '../components/EditPost';
import DeleteRecord from '../components/DeleteRecord';
import SuccessAlert from '../components/SuccessAlert';
import TableDate from '../components/TableDate';
import TablePostLink from '../components/TablePostLink';
import TableHeading from '../components/TableHeading';
import TableEditLink from '../components/TableEditLink';
import TableDeleteLink from '../components/TableDeleteLink';
import { fetchBlogData, addPost, editPost, deletePost, loadImage } from '../Blog/actions';
import { getJWT, removeJWT } from '../User/actions';
import { filterAdminData, 
         sortData, 
         changePageLength, 
         changePageNumber } from './actions';
import { selectPageData, selectTotalPages } from './selectors';

const mapStateToProps = (state) => {
  const { blogEntities, adminPages } = state;
  return {
    pageData: selectPageData(state),
    totalPages: selectTotalPages(state),
    ...blogEntities,
    ...adminPages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchBlogData: () => {
      dispatch(fetchBlogData());
    },

    onGetJWT: (data) => {
      return dispatch(getJWT(data));
    },

    onJWTExpired: () => {
      dispatch(removeJWT());
    },

    onAdd: (JWT, content) => {
      return dispatch(addPost(JWT, content));
    },

    onEdit: (JWT, content, id) => {
      return dispatch(editPost(JWT, content, id));
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
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false,
      currentRecord: {}
    };
  }

  componentWillMount() {
    this.props.onFetchBlogData();
  }

  renderTableEditLink(val, row) {
    return (
      <TableEditLink 
        handleClick={() => {
          this.setState({
            currentRecord: row, 
            showEditModal: true })}}/>
    );
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
    const { onGetJWT, onJWTExpired, onAdd, onEdit, onDelete, onFilter, onSort, onPageLengthChange, onPageNumberChange } = this.props;
    const { posts, postAuthors, practiceAreas } = this.props;
    const { filterValues, totalPages, sortBy, currentPage, pageLength, pageData, JWT, JWTExpired, successMessage } = this.props;
    const { currentRecord, showAddModal, showEditModal, showDeleteModal } = this.state;
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };

    return (
      <div className="container-fluid">
        <h1>List of All Posts</h1>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => this.setState({showAddModal: true})}>
          Add
        </button>
        {successMessage && <SuccessAlert message={successMessage}/>}
        <SearchField 
          filterValues={filterValues}
          onFilter={onFilter}/>
        <Pagination
          pageNavLength={5}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageNumberChange={onPageNumberChange}/>
        <PageLengthMenu 
          pageLengthOptions={[ 5, 10, 20]}
          pageLength={pageLength}
          onPageLengthChange={onPageLengthChange}/>
        <Table 
          columns={[
            { title: 'Created On', component: TableDate, prop: 'created' },
            { title: 'Title', component: TablePostLink, prop: 'title'},
            { title: 'Author', component: TableHeading, prop: 'author'},
            { title: 'Practice Area', component: TableHeading, prop: 'practiceArea'},
            { title: '', 
              component: (val, row) => this.renderTableEditLink(val, row),
              className: 'text-center' },
            { title: '', 
              component: (val, row) => this.renderTableDeleteLink(val, row),
              className: 'text-center' }
          ]}
          sortBy={sortBy}
          onSort={onSort}
          pageData={pageData}
          data={posts}/>
        <ModalLarge 
          title="Add New Post"
          show={showAddModal} 
          onHide={() => this.setState({showAddModal: false})}>
          <AddPost
            postAuthors={postAuthors}
            practiceAreas={practiceAreas}
            onGetJWT={onGetJWT}
            onAdd={onAdd.bind(null, config)}
            onHide={() => this.setState({showAddModal: false})}
            onJWTExpired={onJWTExpired}
            JWT={JWT}
            JWTExpired={JWTExpired}/>
        </ModalLarge>
        <ModalLarge
          title={`Edit This Post (ID: ${currentRecord.id})`}
          show={showEditModal} 
          onHide={() => this.setState({showEditModal: false})}>
          <EditPost
            postAuthors={postAuthors}
            practiceAreas={practiceAreas}
            post={currentRecord}
            onEdit={onEdit.bind(null, config)}
            onHide={() => this.setState({showEditModal: false})}
            onGetJWT={onGetJWT}
            onJWTExpired={onJWTExpired}
            JWT={JWT}
            JWTExpired={JWTExpired}/>
        </ModalLarge>
        <ModalLarge
          title={`Delete Post (ID: ${currentRecord.id})`}
          show={showDeleteModal} 
          onHide={() => this.setState({showDeleteModal: false})}>
          <DeleteRecord
            onDelete={onDelete.bind(null, config, currentRecord.id)}
            onHide={() => this.setState({showDeleteModal: false})}
            onGetJWT={onGetJWT}
            onJWTExpired={onJWTExpired}
            JWT={JWT}
            JWTExpired={JWTExpired}/>
        </ModalLarge>
      </div>
    );
  }
}

AdminPosts.propTypes = {
  onFetchBlogData: PropTypes.func.isRequired,
  onGetJWT: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
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