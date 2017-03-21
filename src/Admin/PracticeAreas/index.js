import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import AddPracticeArea from './AddPracticeArea';
import EditPracticeArea from './EditPracticeArea';
import ViewPracticeArea from './ViewPracticeArea';
import GetJWTForm from 'Admin/GetJWTForm';
import Pagination from 'components/Pagination';
import Table from 'components/Table';
import SearchField from 'components/SearchField';
import PageLengthMenu from 'components/PageLengthMenu';
import ModalMedium from 'components/ModalMedium';
import SuccessAlert from 'components/SuccessAlert';
import TableText from 'components/TableText';
import TableLink from 'components/TableLink';
import TableDescription from 'components/TableDescription';
import TableEditLink from 'components/TableEditLink';
import ButtonBlock from 'components/ButtonBlock';
import { fetchMatters } from 'Entities/MattersActions';
import { fetchPracticeAreas } from 'Entities/PracticeAreasActions';
import { fetchPosts } from 'Entities/PostsActions';
import { fetchStaff } from 'Entities/StaffActions'; 
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
  const { entities, authentication, adminPages } = state;
  return {
    pageData: selectPageData(state),
    totalPages: selectTotalPages(state),
    data: selectData(state),
    ...entities,
    ...authentication,
    ...adminPages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMatters: (config) => {
      dispatch(fetchMatters(config));
    },

    onFetchPracticeAreas: (admin) => {
      dispatch(fetchPracticeAreas(admin));
    },

    onFetchStaff: () => {
      dispatch(fetchStaff());
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

class AdminPracticeAreas extends Component {
  constructor(props) {
    super(props);
    this.handleClickAddButton = this.handleClickAddButton.bind(this);
  }

  componentDidMount() {
    const { JWT, onShowModal, onChangeAdminOperation,
      onFetchMatters, onFetchPracticeAreas,
      onFetchStaff, onFetchPosts } = this.props;
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };
    
    if (JWT) {
      onFetchPracticeAreas(true);
      onFetchMatters(config);
      onFetchStaff();
      onFetchPosts();
    } else {
      onChangeAdminOperation("authenticate");
      onShowModal();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { onFetchMatters, onFetchPracticeAreas, 
      onFetchStaff, onFetchPosts, 
      onHideModal } = this.props;
    const { JWT } = nextProps;
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };

    if (!this.props.JWT && JWT) {
      onFetchPracticeAreas(true);
      onFetchMatters(config);
      onFetchStaff();
      onFetchPosts();
      onHideModal();
    }
  }

  componentWillUnmount() {
    const { onResetState } = this.props;
    
    onResetState();
  }

  renderTableEditLink(val, row) {
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

  renderTableLink(val, row) {
    const { onChangeSelectedRecord, 
      onChangeAdminOperation, onShowModal } = this.props;

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

  renderTableDescription(val, row) { // eslint-disable-line no-unused-vars
    const description = (row.description || []).map((paragraph, idx) => {
      return (
        <p key={idx}>{paragraph}</p>
      );
    });

    return (
      <TableDescription 
        more="Show more"
        less="Show less"
        lines={1}>
        {description}
      </TableDescription>
    );    
  }

  handleClickAddButton() {
    const { onChangeAdminOperation, 
      onShowModal } = this.props;

    onChangeAdminOperation("add");
    onShowModal();
  }

  render() {
    const { onFilter, onSort, onPageLengthChange, 
      onPageNumberChange, adminOperation,
      modalShowing, selectedRecord,
      data, filterValues, totalPages, 
      sortBy, currentPage, pageLength, 
      pageData, successMessage, onHideModal } = this.props;
    const modalTitle = (adminOperation === "authenticate" && "Load Practice Areas") ||
                       (adminOperation === "read" && `Practice Area Info (ID: ${selectedRecord.id})`) ||
                       (adminOperation === "add" && "Add a New Practice Area") ||
                       (adminOperation === "edit" && `Edit Practice Area (ID: ${selectedRecord.id})`) ||
                       '';

    return (
      <main className="container-fluid">
        <Helmet
          title="Admin - Practice Areas"
          meta={[
            { name: 'description', content: "List of practice areas" }
          ]}/>
        <h1>List of All Practice Areas</h1>
        <Link to="/admin">Back to Admin Dashboard</Link>
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 text-center">
            <div className="form-group">
              <ButtonBlock
                type="button"
                customClassNames="btn-primary"
                handleClick={this.handleClickAddButton}>
                Add a New Practice Area
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
              placeholder="Search practice areas by keyword"/>
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
            { title: 'Practice Area', 
              component: (val, row) => this.renderTableLink(val, row), 
              prop: 'area' },
            { title: 'Description', 
              component: (val, row) => this.renderTableDescription(val, row), 
              prop: 'description'},
            { title: '', 
              component: (val, row) => this.renderTableEditLink(val, row),
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
          {adminOperation === "authenticate" ? <GetJWTForm/> : null}
          {adminOperation === "read" ? <ViewPracticeArea/> : null}
          {adminOperation === "add" ? <AddPracticeArea/> : null}
          {adminOperation === "edit" ? <EditPracticeArea/> : null}
        </ModalMedium>
      </main>
    );
  }
}

AdminPracticeAreas.propTypes = {
  onFilter: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onFetchMatters: PropTypes.func.isRequired,
  onFetchPracticeAreas: PropTypes.func.isRequired,
  onFetchStaff: PropTypes.func.isRequired,
  onFetchPosts: PropTypes.func.isRequired,
  onPageLengthChange: PropTypes.func.isRequired,
  onPageNumberChange: PropTypes.func.isRequired,
  onShowModal: PropTypes.func.isRequired,
  onHideModal: PropTypes.func.isRequired,
  onChangeSelectedRecord: PropTypes.func.isRequired,
  onChangeAdminOperation: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  sortBy: PropTypes.object.isRequired,
  filterValues: PropTypes.string.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageLength: PropTypes.number.isRequired,
  pageData: PropTypes.array.isRequired,
  successMessage: PropTypes.string.isRequired,
  modalShowing: PropTypes.bool.isRequired,
  selectedRecord: PropTypes.object.isRequired,
  adminOperation: PropTypes.string.isRequired,
  onResetState: PropTypes.func.isRequired,
  JWT: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPracticeAreas);