import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';
import GetJWTForm from './GetJWTForm';
import AddUser from './AddUser';
import EditUser from './EditUser';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import SearchField from '../components/SearchField';
import PageLengthMenu from '../components/PageLengthMenu';
import ModalMedium from '../components/ModalMedium';
import UserInfo from '../components/UserInfo';
import SuccessAlert from '../components/SuccessAlert';
import TableDate from '../components/TableDate'; 
import TableUserInfoLink from '../components/TableUserInfoLink';
import TableHeading from '../components/TableHeading';
import TableEditLink from '../components/TableEditLink';
import { getJWT, removeJWT } from '../Authentication/actions';
import { fetchUsers } from '../Entities/UsersActions'
import { fetchPracticeAreas } from '../Entities/PracticeAreasActions';
import { addUser, editUser } from '../Entities/UsersActions';
import { fetchStaff, addStaff, editStaff } from '../Entities/UsersActions';
import { fetchClients, addClient, editClient } from '../Entities/ClientsActions';
import { fetchMatters, addMatter } from '../Entities/MattersActions';
import { filterAdminData, 
         sortData, 
         changePageLength, 
         changePageNumber,
         resetAddedRecord } from './actions';
import { selectData, selectPageData, selectTotalPages } from './selectors';

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
    onFetchUsers: (config) => {
      dispatch(fetchUsers(config));
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

    onGetJWT: (data) => {
      return dispatch(getJWT(data));
    },

    onJWTExpired: () => {
      dispatch(removeJWT());
    },

    onAddUser: (JWT, content) => {
      return dispatch(addUser(JWT, content));
    },

    onAddStaff: (JWT, content) => {
      return dispatch(addStaff(JWT, content));
    },

    onAddClient: (JWT, content) => {
      return dispatch(addClient(JWT, content));
    },

    onEditUser: (JWT, content, id) => {
      return dispatch(editUser(JWT, content, id));
    },

    onEditStaff: (JWT, content, id) => {
      return dispatch(editStaff(JWT, content, id));
    },

    onEditClient: (JWT, content, id) => {
      return dispatch(editClient(JWT, content, id));
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

    onResetAddedRecord: () => {
      dispatch(resetAddedRecord());
    }
  };
};

class AdminUsers extends Component {
  constructor(props) {
    super(props);
    this.handleClickAddButton = this.handleClickAddButton.bind(this);
    this.state = { 
      showGetJWTModal: true,
      showUserInfoModal: false,
      showAddModal: false,
      showEditModal: false,
      currentRecord: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    const { JWT, addedRecord } = nextProps;
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };

    if (!this.props.JWT && JWT) {
      this.props.onFetchUsers(config);
      this.props.onFetchPracticeAreas();
      this.props.onFetchMatters(config);
      this.props.onFetchStaff(config);
      this.props.onFetchClients(config);
      this.setState({showGetJWTModal: false})
    }

    if (_.isEmpty(this.props.addedRecord) && 
      addedRecord.role === 'public') {
      this.setState({showAddModal: false});
    }
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

  renderUserInfoLink(val, row) {
    return (
      <TableUserInfoLink
        username={val}
        handleClick={(event) => {
          event.preventDefault();
          this.setState({
           currentRecord: row,
           showUserInfoModal: true })}}/>
    );
  }

  handleClickAddButton() {
    this.props.onResetAddedRecord();
    this.setState({showAddModal: true});
  }

  render() {
    const { onGetJWT, onJWTExpired, onAddUser, onAddStaff, onAddClient, 
            onEditUser, onEditStaff, onEditClient, onFilter, onSort, 
            onPageLengthChange, onPageNumberChange } = this.props;
    const { users, matters, practiceAreas, staff, staffUsers, 
            clients, clientUsers } = this.props;
    const { data, filterValues, totalPages, sortBy, 
            currentPage, pageLength, pageData, JWT, 
            JWTExpired, successMessage, addedRecord } = this.props;
    const { currentRecord, showGetJWTModal, showUserInfoModal, 
            showAddModal, showEditModal } = this.state;
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };
    console.log(staff, staffUsers);
    return (
      <main className="container-fluid">
        <Helmet
          title="Admin - Users"
          meta={[
            { name: 'description', content: "List of users." }
        ]}/>
        <h1>List of All Users</h1>
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 text-center">
            <div className="form-group">
              <button
                className="btn btn-primary btn-block text-uppercase"
                onClick={this.handleClickAddButton}>
                Add a New User
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
            { title: 'Username', 
              component: (val, row) => this.renderUserInfoLink(val, row), 
              prop: 'username'},
            { title: 'Full Name', component: TableHeading, prop: 'fullName'},
            { title: 'Role', component: TableHeading, prop: 'role'},
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
          title="Load Users"
          show={showGetJWTModal}
          onHide={() => this.setState({showGetJWTModal: false})}>
          <GetJWTForm
            onGetJWT={onGetJWT}
            JWTExpired={JWTExpired}
            onHide={() => this.setState({showGetJWTModal: false})}
            user={currentRecord}/>
        </ModalMedium>
        <ModalMedium
          title="User Info"
          show={showUserInfoModal}
          onHide={() => this.setState({showUserInfoModal: false})}>
          <UserInfo
            onHide={() => this.setState({showUserInfoModal: false})}
            user={currentRecord}/>
        </ModalMedium>
        <ModalMedium 
          title="Add New User" 
          show={showAddModal} 
          onHide={() => this.setState({showAddModal: false})}>
          <AddUser
            practiceAreas={practiceAreas}
            matters={matters}
            onGetJWT={onGetJWT}
            onAddUser={onAddUser.bind(null, config)}
            onAddStaff={onAddStaff.bind(null, config)}
            onAddClient={onAddClient.bind(null, config)}
            onHide={() => this.setState({showAddModal: false})}
            onJWTExpired={onJWTExpired}
            JWT={JWT}
            JWTExpired={JWTExpired}
            addedRecord={addedRecord}/>
        </ModalMedium>
        <ModalMedium
          title={`Edit This User (ID: ${currentRecord.id})`}
          show={showEditModal} 
          onHide={() => this.setState({showEditModal: false})}>
          <EditUser
            user={currentRecord}
            matters={matters}
            practiceAreas={practiceAreas}
            staff={staff}
            staffUsers={staffUsers}
            clients={clients}
            onEditUser={onEditUser.bind(null, config)}
            onHide={() => this.setState({showEditModal: false})}
            onGetJWT={onGetJWT}
            onJWTExpired={onJWTExpired}
            JWT={JWT}
            JWTExpired={JWTExpired}/>
        </ModalMedium>
      </main>
    );
  }
}

AdminUsers.propTypes = {
  onFetchUsers: PropTypes.func.isRequired,
  onGetJWT: PropTypes.func.isRequired,
  onAddUser: PropTypes.func.isRequired,
  onEditUser: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onPageLengthChange: PropTypes.func.isRequired,
  onPageNumberChange: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
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
)(AdminUsers);