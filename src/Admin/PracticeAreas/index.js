import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import AddPracticeArea from './AddPracticeArea';
import EditPracticeArea from './EditPracticeArea';
import Pagination from 'components/Pagination';
import Table from 'components/Table';
import SearchField from 'components/SearchField';
import PageLengthMenu from 'components/PageLengthMenu';
import ModalMedium from 'components/ModalMedium';
import SuccessAlert from 'components/SuccessAlert';
import TableDate from 'components/TableDate';
import TablePostLink from 'components/TablePostLink';
import TableText from 'components/TableText';
import TableEditLink from 'components/TableEditLink';
import ButtonBlock from 'components/ButtonBlock';
import { fetchMatters } from 'Entities/MattersActions';
import { fetchPracticeAreas } from 'Entities/PracticeAreasActions';
import { fetchStaff } from 'Entities/StaffActions'; 
import { filterAdminData, 
         sortData, 
         changePageLength, 
         changePageNumber,
         showModal,
         changeSelectedRecord,
         changeAdminOperation } from 'Admin/actions';
import { selectData, selectPageData, selectTotalPages } from 'Admin/selectors';

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
    onFetchMatters: () => {
      dispatch(fetchMatters());
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

    onChangeSelectedRecord: (record) => {
      dispatch(changeSelectedRecord(record));
    },

    onChangeAdminOperation: (value) => {
      dispatch(changeAdminOperation(value));
    }
  };
};

class AdminPracticeAreas extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onFetchMatters();
    this.props.onFetchPracticeAreas();
    this.props.onFetchStaff();
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

  render() {
    const { onFilter, onSort, onPageLengthChange, 
      onPageNumberChange, adminOperation,
      modalShowing, selectedRecord,
      data, filterValues, totalPages, 
      sortBy, currentPage, pageLength, 
      pageData, successMessage } = this.props;
    const modalTitle = (adminOperation === "view" && `Practice Area Info (ID: ${selectedRecord.id}`) ||
                       (adminOperation === "add" && "Add a New Practice Area") ||
                       (adminOperation === "edit" && `Edit Practice Area (ID: ${selectedRecord.id}`);

    return (
      <main className="container-fluid">
        <Helmet
          title="Admin - Practice Areas"
          meta={[
            { name: 'description', content: "List of practice areas" }
          ]}/>
        <h1>List of All Practice Areas</h1>
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 text-center">
            <div className="form-group">
              <ButtonBlock
                customClassNames="btn-primary"
                onClick={() => this.setState({showAddModal: true})}>
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
            { title: 'ID', component: TableText, prop: 'id'},
            { title: 'File Open Date', component: TableDate, prop: 'created' },
            { title: 'Description', component: TablePostLink, prop: 'title'},
            { title: 'Author', component: TableText, prop: 'author'},
            { title: 'Practice Area', component: TableText, prop: 'practiceArea'},
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
          show={modalShowing}>
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
  onPageLengthChange: PropTypes.func.isRequired,
  onPageNumberChange: PropTypes.func.isRequired,
  onShowModal: PropTypes.func.isRequired,
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
  adminOperation: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPracticeAreas);