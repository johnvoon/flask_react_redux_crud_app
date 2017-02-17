import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Scrollbars } from 'react-custom-scrollbars';
import AddPost from './AddPost';
import EditPost from './EditPost';
import DeleteRecord from './DeleteRecord';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import SearchField from '../components/SearchField';
import PageLengthMenu from '../components/PageLengthMenu';
import ModalSmall from '../components/ModalSmall';
import ModalMedium from '../components/ModalMedium';
import SuccessAlert from '../components/SuccessAlert';
import TableDate from '../components/TableDate';
import TablePostLink from '../components/TablePostLink';
import TableHeading from '../components/TableHeading';
import TableCommentsLink from '../components/TableCommentsLink';
import TableEditLink from '../components/TableEditLink';
import TableDeleteLink from '../components/TableDeleteLink';
import { fetchBlogData, addPost, editPost, deletePost, loadImage } from '../Entities/actions';
import { getJWT, removeJWT } from './actions';
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

  componentDidMount() {
    this.props.onFetchBlogData();
  }

  renderTableCommentsLink(val, row) {
    return (
      <TableCommentsLink
        data={row}/>
    );
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
    const { data, filterValues, totalPages, sortBy, currentPage, pageLength, pageData, JWT, JWTExpired, successMessage } = this.props;
    const { currentRecord, showAddModal, showEditModal, showDeleteModal } = this.state;
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };

    return (
      <main className="container-fluid">
        <Helmet
          title="Admin - Posts"
          meta={[
            { name: 'description', content: "List of blog posts" }
          ]}/>
        <h1>List of All Posts</h1>
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 text-center">
            <div className="form-group">
              <button
                className="btn btn-primary btn-block text-uppercase"
                onClick={() => this.setState({showAddModal: true})}>
                Add a New Post
              </button>
            </div>
          </div>
        </div>
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
            { title: 'Title', component: TablePostLink, prop: 'title'},
            { title: 'Author', component: TableHeading, prop: 'author'},
            { title: 'Practice Area', component: TableHeading, prop: 'practiceArea'},
            { title: '',
              component: (val, row) => this.renderTableCommentsLink(val, row),
              className: 'text-center' },
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
          data={data}/>
        <ModalMedium 
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
        </ModalMedium>
        <ModalMedium
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
        </ModalMedium>
        <ModalMedium
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
        </ModalMedium>
      </main>
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