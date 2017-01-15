import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import SearchField from '../components/SearchField';
import PageLengthMenu from '../components/PageLengthMenu';
import ModalSmall from '../components/ModalSmall';
import ModalLarge from '../components/ModalLarge';
import AddUser from '../components/AddUser';
import EditUser from '../components/EditUser';
import DeleteRecord from '../components/DeleteRecord';
import SuccessAlert from '../components/SuccessAlert';
import TableDate from '../components/TableDate'; 
import TableUserInfoLink from '../components/TableUserInfoLink';
import TableHeading from '../components/TableHeading';
import TableEditLink from '../components/TableEditLink';
import TableDeleteLink from '../components/TableDeleteLink';
import { getJWT, fetchUsers, addUser, editUser, deleteUser } from '../User/actions';
import { filterAdminData, 
         sortData, 
         changePageLength, 
         changePageNumber } from './actions';

const mapStateToProps = (state) => {
  const { userEntities, adminPages } = state;
  
  return {
    ...userEntities,
    ...adminPages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUsers: () => {
      dispatch(fetchUsers());
    },

    onAdd: (content) => {
      dispatch(addUser(content));
    },

    onEdit: (content, id) => {
      dispatch(editUser(content, id));
    },

    onDelete: (id) => {
      dispatch(deleteUser(id));
    },

    onGetJWT: (data) => {
      dispatch(getJWT(data));
    },

    onFilter: (data, {target: {value}}) => {
      dispatch(filterAdminData(value, data));
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

class AdminUsers extends Component {
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
    this.props.onFetchUsers();
  }

  render() {
    const { onGetJWT, onAdd, onEdit, onDelete, onFilter, onSort, onPageLengthChange, onPageNumberChange } = this.props;
    const { users } = this.props;
    const { filterValues, totalPages, sortBy, currentPage, pageLength, pageData, JWT, successMessage } = this.props;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${JWT}`
      }
    };

    return (
      <div>
        <h1>
          List of All Users
          <button
            className="btn btn-primary btn-lg sm-margin-top"
            onClick={() => this.setState({showAddModal: true})}>
            Add
          </button>
        </h1>
        {successMessage && <SuccessAlert message={successMessage}/>}
        <SearchField 
          filterValues={filterValues}
          onFilter={onFilter.bind(null, users)}
        />
        <div className="row">
          <Pagination
            pageNavLength={5}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageNumberChange={onPageNumberChange}
          />  
        </div>
        <PageLengthMenu 
          pageLengthOptions={[ 5, 10, 20]}
          pageLength={pageLength}
          onPageLengthChange={onPageLengthChange}
        />
        <Table 
          columns={[
            { title: 'Created On', component: TableDate, prop: 'created' },
            { title: 'Username', component: TableUserInfoLink, prop: 'username'},
            { title: 'Full Name', component: TableHeading, prop: 'fullName'},
            { title: 'Role', component: TableHeading, prop: 'role'},
            { title: '', component: TableEditLink, className: 'text-center'},
            { title: '', component: TableDeleteLink, className: 'text-center'}
          ]}
          sortBy={sortBy}
          onSort={onSort}
          pageData={pageData}
          data={users}
        />
        <ModalLarge 
          title="Add New User" 
          show={this.state.showAddModal} 
          onHide={() => this.setState({showAddModal: false})}>
          <AddUser
            onGetJWT={onGetJWT.bind(null)}
            onHide={() => this.setState({showAddModal: false})}
            onAdd={onAdd.bind(null)}
            JWT={JWT}/>
        </ModalLarge>
        <ModalLarge
          title={`Edit This User (ID: ${this.state.currentRecord.id})`}
          show={this.state.showEditModal} 
          onHide={() => this.setState({showEditModal: false})}>
          <EditUser
            user={this.state.currentRecord}
            onEdit={onEdit.bind(null)}
            onHide={() => this.setState({showEditModal: false})}
            onGetJWT={onGetJWT.bind(null)}
            JWT={JWT}/>
        </ModalLarge>
        <ModalSmall
          title={`Delete User (ID: ${this.state.currentRecord.id})`}
          show={this.state.showDeleteModal} 
          onHide={() => this.setState({showDeleteModal: false})}>
          <DeleteRecord
            onDelete={onDelete.bind(null, this.state.currentRecord.id)}
            onHide={() => this.setState({showDeleteModal: false})}
            onGetJWT={onGetJWT.bind(null)}
            JWT={JWT}/>
        </ModalSmall>
      </div>
    );
  }
}

AdminUsers.propTypes = {
  onFetchUsers: PropTypes.func.isRequired,
  onGetJWT: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
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