import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import AddPost from './AddPost';
import EditPost from './EditPost';
import DeletePost from './DeletePost';
import { filterAdminData, 
         sortData, 
         changePageLength, 
         changePageNumber,
         showModal,
         hideModal,
         changeSelectedRecord,
         changeAdminOperation,
         resetState } from 'Admin/actions';
import { selectData, selectPageData, selectTotalPages } from 'Admin/selectors';
import Pagination from 'components/Pagination';
import Table from 'components/Table';
import SearchField from 'components/SearchField';
import PageLengthMenu from 'components/PageLengthMenu';
import ModalMedium from 'components/ModalMedium';
import SuccessAlert from 'components/SuccessAlert';
import TableDate from 'components/TableDate';
import TablePostLink from 'components/TablePostLink';
import TableText from 'components/TableText';
import TableCommentsLink from 'components/TableCommentsLink';
import TableEditLink from 'components/TableEditLink';
import TableDeleteLink from 'components/TableDeleteLink';
import ButtonBlock from 'components/ButtonBlock';
import { fetchPosts } from 'Entities/PostsActions';
import { fetchPracticeAreas } from 'Entities/PracticeAreasActions';
import { fetchStaff } from 'Entities/StaffActions'; 

const mapStateToProps = (state) => {
  const { entities, adminPages, authentication } = state;
  return {
    pageData: selectPageData(state),
    totalPages: selectTotalPages(state),
    data: selectData(state),
    ...entities,
    ...adminPages,
    ...authentication
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchPosts: (admin) => {
      dispatch(fetchPosts(admin));
    },

    onFetchPracticeAreas: () => {
      dispatch(fetchPracticeAreas());
    },

    onFetchStaff: () => {
      dispatch(fetchStaff());
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
    },

    onShowModal: () => {
      dispatch(showModal());
    },

    onHideModal: () => {
      dispatch(hideModal());
    },

    onChangeSelectedRecord: (record) => {
      dispatch(changeSelectedRecord(record));
    },

    onChangeAdminOperation: (value) => {
      dispatch(changeAdminOperation(value));
    },

    onResetState: () => {
      dispatch(resetState());
    }
  };
};

class AdminPosts extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { onFetchPosts, onFetchPracticeAreas, 
      onFetchStaff } = this.props;
    
    onFetchPosts(true);
    onFetchPracticeAreas();
    onFetchStaff();
  }

  componentWillUnmount() {
    const { onResetState } = this.props;
    
    onResetState();
  }

  renderTableCommentsLink(val, row) { // eslint-disable-line no-unused-vars
    return (
      <TableCommentsLink
        data={row}/>
    );
  }

  renderTableEditLink(val, row) { // eslint-disable-line no-unused-vars
    const { onChangeSelectedRecord, 
      onChangeAdminOperation, onShowModal } = this.props;

    return (
      <TableEditLink 
        handleClick={() => {
          onChangeSelectedRecord(row);
          onChangeAdminOperation("edit");
          onShowModal();
        }}/>
    );
  }

  renderTableDeleteLink(val, row) { // eslint-disable-line no-unused-vars
    const { onChangeSelectedRecord, 
      onChangeAdminOperation, onShowModal } = this.props;

    return (
      <TableDeleteLink 
        handleClick={() => {
          onChangeSelectedRecord(row);
          onChangeAdminOperation("delete");
          onShowModal();
        }}/>
    );
  }

  handleClickAddButton() {
    const { onChangeAdminOperation, 
      onShowModal } = this.props;

    onChangeAdminOperation("add");
    onShowModal();
  }

  render() {
    this.handleClickAddButton = this.handleClickAddButton.bind(this);
    const { onFilter, onSort, onPageLengthChange, 
      onPageNumberChange, data, filterValues, 
      totalPages, sortBy, currentPage, pageLength, 
      pageData, successMessage, selectedRecord,
      adminOperation, modalShowing, onHideModal } = this.props;
    const modalTitle = (adminOperation === "add" && "Add a New Post") ||
                       (adminOperation === "edit" && `Edit Post (ID: ${selectedRecord.id})`) ||
                       (adminOperation === "delete" && `Delete Post (ID: ${selectedRecord.id})`) ||
                       '';
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
              <ButtonBlock
                customClassNames="btn-primary"
                type="button"
                handleClick={this.handleClickAddButton}>
                Add a New Post
              </ButtonBlock>
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
              onFilter={onFilter}
              placeholder="Search posts by keyword"/>
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
            { title: 'ID', component: TableText, prop: 'id'},
            { title: 'Created On', component: TableDate, prop: 'created' },
            { title: 'Title', component: TablePostLink, prop: 'title'},
            { title: 'Author', component: TableText, prop: 'author'},
            { title: 'Practice Area', component: TableText, prop: 'practiceArea'},
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
          title={modalTitle}
          show={modalShowing}
          onHide={onHideModal}>
          {adminOperation === "add" ? <AddPost/> : null}
          {adminOperation === "edit" ? <EditPost/> : null}
          {adminOperation === "delete" ? <DeletePost/> : null}
        </ModalMedium>
      </main>
    );
  }
}

AdminPosts.propTypes = {
  onFetchPosts: PropTypes.func.isRequired,
  onFetchPracticeAreas: PropTypes.func.isRequired,
  onFetchStaff: PropTypes.func.isRequired,
  onChangeSelectedRecord: PropTypes.func.isRequired,
  onChangeAdminOperation: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onPageLengthChange: PropTypes.func.isRequired,
  onPageNumberChange: PropTypes.func.isRequired,
  onShowModal: PropTypes.func.isRequired,
  onHideModal: PropTypes.func.isRequired,
  onResetState: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  sortBy: PropTypes.object.isRequired,
  filterValues: PropTypes.string.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageLength: PropTypes.number.isRequired,
  pageData: PropTypes.array.isRequired,
  successMessage: PropTypes.string.isRequired,
  selectedRecord: PropTypes.object.isRequired,
  adminOperation: PropTypes.string.isRequired,
  modalShowing: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPosts);