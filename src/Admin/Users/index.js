import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';
import GetJWTForm from './GetJWTForm';
import AddUser from './AddUser';
import EditUser from './EditUser';
import ViewUser from './ViewUser';
import Pagination from '../../components/Pagination';
import Table from '../../components/Table';
import SearchField from '../../components/SearchField';
import PageLengthMenu from '../../components/PageLengthMenu';
import ModalMedium from '../../components/ModalMedium';
import SuccessAlert from '../../components/SuccessAlert';
import TableDate from '../components/TableDate'; 
import TableUserInfoLink from '../components/TableUserInfoLink';
import TableHeading from '../../components/TableHeading';
import TableEditLink from '../../components/TableEditLink';
import { fetchUsers } from '../../Entities/UsersActions'
import { fetchPracticeAreas } from '../Entities/PracticeAreasActions';
import { fetchStaff } from '../../Entities/StaffActions';
import { fetchClients } from '../../Entities/ClientsActions';
import { fetchMatters } from '../../Entities/MattersActions';
import { filterAdminData, 
         sortData, 
         changePageLength, 
         changePageNumber,
         changeSelectedRecord } from './actions';
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

    onFetchClients: (config) => {
      dispatch(fetchClients(config));
    }

    onFilter: ({target: {value}}) => {
      dispatch(filterAdminData(value));
    },

    onSort: (sortBy) => {
      dispatch(sortData(sortBy));
    },

    onShowModal: () => {
      dispatch(showModal());
    },
    
    onPageLengthChange: ({target: {value}}) => {
      dispatch(changePageLength(value));
    },

    onPageNumberChange: (value) => {
      dispatch(changePageNumber(value));
    },

    onSelectedRecordChange: (record) => {
      dispatch(changeSelectedRecord(record));
    }
  };
};

class AdminUsers extends Component {
  constructor(props) {
    super(props);
    this.hideGetJWTModal = this.hideGetJWTModal.bind(this);
    this.hideUserInfoModal = this.hideUserInfoModal.bind(this);
    this.hideAddModal =  this.hideAddModal.bind(this);
    this.hideEditModal = this.hideEditModal.bind(this);
    this.handleClickAddButton = this.handleClickAddButton.bind(this);
  }

  componentDidMount() {
    const { onShowModal, onChangeAdminOperation }
    onChangeAdminOperation("authenticate");
    onShowModal();
  }

  componentWillReceiveProps(nextProps) {
    const { JWT } = nextProps;
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
      this.hideGetJWTModal();
    }
  }

  renderTableEditLink(val, row) {
    const { 
      onSelectedRecordChange,
      onChangeAdminOperation, 
      onShowModal } = this.props;

    return (
      <TableEditLink 
        handleClick={() => {
          onSelectedRecordChange(row);
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
      onSelectedRecordChange,
      onChangeAdminOperation, 
      onShowModal } = this.props;
    
    return (
      <TableUserInfoLink
        username={val}
        handleClick={(event) => {
          event.preventDefault();
          onSelectedRecordChange(row);
          onChangeAdminOperation("read");
          onShowModal();
        }}/>
    );
  }

  render() {
    const { onFilter, onSort, onPageLengthChange, onPageNumberChange } = this.props;
    const { data, filterValues, totalPages, sortBy, 
            currentPage, pageLength, pageData, 
            successMessage, adminOperation, 
            selectedRecord, modalShowing } = this.props;
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };
    const modalTitle = (adminOperation === "authenticate" && "Load Users") ||
                       (adminOperation === "read" && `Edit User (ID: ${selectedRecord.id}`) ||
                       (adminOperation === "add" && "Add a New User") ||
                       (adminOperation === "edit" && `Edit User (ID: ${selectedRecord.id}`)
    
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
              <ButtonBlock
                className="btn btn-primary btn-block text-uppercase"
                onClick={this.handleClickAddButton}>
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
          title={}
          show={modalShowing}>
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
  onFetchUsers: PropTypes.func.isRequired,
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