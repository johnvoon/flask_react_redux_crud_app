import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import ViewMatter from './ViewMatter';
import AddMatter from './AddMatter';
import EditMatter from './EditMatter';
import GetJWTForm from 'Admin/GetJWTForm';
import ButtonBlock from 'components/ButtonBlock';
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
import { fetchMatters } from 'Entities/MattersActions';
import { fetchPracticeAreas } from 'Entities/PracticeAreasActions';
import { fetchStaff } from 'Entities/StaffActions';
import { fetchClients } from 'Entities/ClientsActions'; 
import { filterAdminData, 
         sortData, 
         changePageLength, 
         changePageNumber,
         changeAdminOperation,
         changeSelectedRecord,
         showModal,
         hideModal,
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
    onFetchMatters: (config, admin) => {
      dispatch(fetchMatters(config, admin));
    },

    onFetchPracticeAreas: () => {
      dispatch(fetchPracticeAreas());
    },

    onFetchStaff: () => {
      dispatch(fetchStaff());
    },

    onFetchClients: () => {
      dispatch(fetchClients());
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

    onChangeSelectedRecord: (record) => {
      dispatch(changeSelectedRecord(record));
    },

    onChangeAdminOperation: (value) => {
      dispatch(changeAdminOperation(value));
    },

    onShowModal: () => {
      dispatch(showModal());
    },

    onHideModal: () => {
      dispatch(hideModal());
    },

    onResetState: () => {
      dispatch(resetState());
    }
  };
};

class AdminMatters extends Component {
  constructor(props) {
    super(props);

    this.handleClickAddButton = this.handleClickAddButton.bind(this);
  }

  componentDidMount() {
    const { JWT, onShowModal, onChangeAdminOperation,
      onFetchMatters, onFetchPracticeAreas,
      onFetchStaff, onFetchClients } = this.props;
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };
    
    if (JWT) {
      onFetchMatters(config, true);
      onFetchPracticeAreas();
      onFetchStaff();
      onFetchClients();
    } else {
      onChangeAdminOperation("authenticate");
      onShowModal();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { onFetchMatters, onFetchPracticeAreas, 
      onFetchStaff, onHideModal, onFetchClients } = this.props;
    const { JWT } = nextProps;
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };

    if (!this.props.JWT && JWT) {
      onFetchMatters(config, true);
      onFetchPracticeAreas();
      onFetchStaff();
      onFetchClients();
      onHideModal();
    }
  }

  componentWillUnmount() {
    const { onResetState } = this.props;
    
    onResetState();
  }

  renderTableEditLink(val, row) { //eslint-disable-line no-unused-vars
    const { onChangeSelectedRecord, onShowModal, 
      onChangeAdminOperation, } = this.props;

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

  handleClickAddButton() {
    const { onShowModal,
      onChangeAdminOperation } = this.props;

    onShowModal();
    onChangeAdminOperation("add");
  }

  render() {
    const { onFilter, onSort, onPageLengthChange, 
      onPageNumberChange, data, filterValues, totalPages, 
      sortBy, currentPage, pageLength, selectedRecord,
      pageData, adminOperation, modalShowing,
      successMessage, onHideModal } = this.props;
    const modalTitle = (adminOperation === "authenticate" && "Load Matters") ||
                       (adminOperation === "read" && `Matter Info (ID: ${selectedRecord.id})`) ||
                       (adminOperation === "add" && "Add a New Matter") ||
                       (adminOperation === "edit" && `Edit Matter (ID: ${selectedRecord.id})`) ||
                       '';

    return (
      <main className="container-fluid">
        <Helmet
          title="Admin - Matters"
          meta={[
            { name: 'description', content: "List of blog posts" }
          ]}/>
        <h1>List of All Matters</h1>
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 text-center">
            <div className="form-group">
              <ButtonBlock
                customClassNames="btn-primary"
                type="button"
                handleClick={this.handleClickAddButton}>
                Add a New Matter
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
              placeholder="Search matters by keyword"/>
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
            { title: 'File Open Date', component: TableDate, prop: 'fileOpen' },
            { title: 'Description', 
              component: (val, row) => this.renderTableLink(val, row), 
              prop: 'description'},
            { title: 'Costs on Account', component: TableText, prop: 'costsOnAccount'},
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
          {adminOperation === "read" ? <ViewMatter/> : null}
          {adminOperation === "add" ? <AddMatter/> : null}
          {adminOperation === "edit" ? <EditMatter/> : null}
        </ModalMedium>
      </main>
    );
  }
}

AdminMatters.propTypes = {
  onFetchMatters: PropTypes.func.isRequired,
  onFetchPracticeAreas: PropTypes.func.isRequired,
  onFetchStaff: PropTypes.func.isRequired,
  onFetchClients: PropTypes.func.isRequired,
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
  successMessage: PropTypes.string.isRequired,
  selectedRecord: PropTypes.object.isRequired,
  adminOperation: PropTypes.string.isRequired,
  modalShowing: PropTypes.bool.isRequired,
  JWT: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminMatters);