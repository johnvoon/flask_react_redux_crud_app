import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import GetJWTForm from 'Admin/GetJWTForm';
import AddUser from './AddUser';
import EditUser from './EditUser';
import ViewUser from './ViewUser';
import Pagination from 'components/Pagination';
import Table from 'components/Table';
import SearchField from 'components/SearchField';
import PageLengthMenu from 'components/PageLengthMenu';
import ModalMedium from 'components/ModalMedium';
import SuccessAlert from 'components/SuccessAlert';
import TableDate from 'components/TableDate'; 
import TableLink from 'components/TableLink';
import TableText from 'components/TableText';
import TableEditLink from 'components/TableEditLink';
import ButtonBlock from 'components/ButtonBlock';
import { fetchUsers } from 'Entities/UsersActions';
import { fetchPosts } from 'Entities/PostsActions';
import { fetchPracticeAreas } from 'Entities/PracticeAreasActions';
import { fetchStaff } from 'Entities/StaffActions';
import { fetchClients } from 'Entities/ClientsActions';
import { fetchMatters } from 'Entities/MattersActions';
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
    onFetchUsers: (config, admin) => {
      dispatch(fetchUsers(config, admin));
    },

    onFetchPracticeAreas: () => {
      dispatch(fetchPracticeAreas());
    },

    onFetchMatters: (config) => {
      dispatch(fetchMatters(config));
    },

    onFetchStaff: (config) => {
      dispatch(fetchStaff(config));
    },

    onFetchClients: (config) => {
      dispatch(fetchClients(config));
    },

    onFetchPosts: () => {
      dispatch(fetchPosts());
    },

    onFilter: ({target: {value}}) => {
      dispatch(filterAdminData(value));
    },

    onSort: (sortBy) => {
      dispatch(sortData(sortBy));
    },

    onShowModal: () => {
      dispatch(showModal());
    },

    onHideModal: () => {
      dispatch(hideModal());
    },
    
    onPageLengthChange: ({target: {value}}) => {
      dispatch(changePageLength(value));
    },

    onPageNumberChange: (value) => {
      dispatch(changePageNumber(value));
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

class AdminUsers extends Component {
  constructor(props) {
    super(props);
    this.handleClickAddButton = this.handleClickAddButton.bind(this);
  }

  componentDidMount() {
    const { JWT, onShowModal, onChangeAdminOperation,
      onFetchUsers, onFetchPracticeAreas, onFetchMatters,
      onFetchStaff, onFetchClients, onFetchPosts } = this.props;
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };
    
    if (JWT) {
      onFetchUsers(config, true);
      onFetchPracticeAreas();
      onFetchMatters(config);
      onFetchStaff(config);
      onFetchClients(config);
      onFetchPosts();
    } else {
      onChangeAdminOperation("authenticate");
      onShowModal();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { onFetchUsers, onFetchPracticeAreas,
      onFetchMatters, onFetchStaff, onFetchClients, 
      onHideModal, onFetchPosts } = this.props;
    const { JWT } = nextProps;
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };

    if (!this.props.JWT && JWT) {
      onFetchUsers(config, true);
      onFetchPracticeAreas();
      onFetchMatters(config);
      onFetchStaff(config);
      onFetchClients(config);
      onFetchPosts();
      onHideModal();
    }
  }

  componentWillUnmount() {
    const { onResetState } = this.props;
    
    onResetState();
  }

  renderTableEditLink(val, row) {
    const { 
      onChangeSelectedRecord,
      onChangeAdminOperation, 
      onShowModal } = this.props;

    return (
      <TableEditLink 
        handleClick={() => {
          onChangeSelectedRecord(row);
          onChangeAdminOperation("edit");
          onShowModal();
        }}/>
    );
  }

  handleClickAddButton() {
    const { 
      onShowModal, 
      onChangeAdminOperation } = this.props;

    onShowModal();
    onChangeAdminOperation("add");
  }

  renderUserInfoLink(val, row) {
    const { 
      onChangeSelectedRecord,
      onChangeAdminOperation, 
      onShowModal } = this.props;
    
    return (
      <TableLink
        text={val}
        handleClick={(event) => {
          event.preventDefault();
          onChangeSelectedRecord(row);
          onChangeAdminOperation("read");
          onShowModal();
        }}/>
    );
  }

  render() {
    const { onFilter, onSort, onPageLengthChange, 
      onPageNumberChange, data, filterValues, 
      totalPages, sortBy, currentPage, pageLength, 
      pageData, successMessage, adminOperation, 
      selectedRecord, modalShowing, onHideModal } = this.props;
    const modalTitle = (adminOperation === "authenticate" && "Load Users") ||
                       (adminOperation === "read" && `Edit User (ID: ${selectedRecord.id})`) ||
                       (adminOperation === "add" && "Add a New User") ||
                       (adminOperation === "edit" && `Edit User (ID: ${selectedRecord.id})`) ||
                       '';
    
    return (
      <main className="container-fluid">
        <Helmet
          title="Admin - Users"
          meta={[
            { name: 'description', content: "List of users." }
        ]}/>
        <h1>List of All Users</h1>
        <Link to="/admin">Back to Admin Dashboard</Link>
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 text-center">
            <div className="form-group">
              <ButtonBlock
                customClassNames="btn-primary"
                handleClick={this.handleClickAddButton}>
                Add a New User
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
              placeholder="Search users by keyword"/> 
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
            { title: 'Username', 
              component: (val, row) => this.renderUserInfoLink(val, row), 
              prop: 'username'},
            { title: 'Full Name', component: TableText, prop: 'fullName'},
            { title: 'Role', component: TableText, prop: 'role'},
            { title: '', 
              component: (val, row) => this.renderTableEditLink(val, row),
              className: 'text-center' }
          ]}
          sortBy={sortBy}
          onSort={onSort}
          pageData={pageData}
          data={data}
        />
        <ModalMedium
          title={modalTitle}
          show={modalShowing}
          onHide={onHideModal}>
          {adminOperation === "authenticate" ? <GetJWTForm/> : null}
          {adminOperation === "read" ? <ViewUser/> : null}
          {adminOperation === "add" ? <AddUser/> : null}
          {adminOperation === "edit" ? <EditUser/> : null}
        </ModalMedium>
      </main>
    );
  }
}

AdminUsers.propTypes = {
  onFetchPracticeAreas: PropTypes.func.isRequired,
  onFetchMatters: PropTypes.func.isRequired,
  onFetchStaff: PropTypes.func.isRequired,
  onFetchClients: PropTypes.func.isRequired, 
  onFetchUsers: PropTypes.func.isRequired,
  onFetchPosts: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onPageLengthChange: PropTypes.func.isRequired,
  onPageNumberChange: PropTypes.func.isRequired,
  onShowModal: PropTypes.func.isRequired,
  onHideModal: PropTypes.func.isRequired,
  onChangeSelectedRecord: PropTypes.func.isRequired,
  onChangeAdminOperation: PropTypes.func.isRequired,
  onResetState: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  sortBy: PropTypes.object.isRequired,
  filterValues: PropTypes.string.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageLength: PropTypes.number.isRequired,
  pageData: PropTypes.array.isRequired,
  adminOperation: PropTypes.string.isRequired,
  selectedRecord: PropTypes.object.isRequired,
  modalShowing: PropTypes.bool.isRequired,
  JWT: PropTypes.string.isRequired,
  successMessage: PropTypes.string.isRequired,

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUsers);