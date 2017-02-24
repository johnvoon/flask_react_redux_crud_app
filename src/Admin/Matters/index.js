import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import ViewMatter from './ViewMatter';
import AddMatter from './AddMatter';
import EditMatter from './EditMatter';
import ButtonBlock from 'components/ButtonBlock';
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
import { fetchMatters } from 'Entities/MattersActions';
import { fetchPracticeAreas } from 'Entities/PracticeAreasActions';
import { fetchStaff } from 'Entities/StaffActions'; 
import { filterAdminData, 
         sortData, 
         changePageLength, 
         changePageNumber } from 'Admin/actions';
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
    }
  };
};

class AdminMatters extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onFetchMatters();
    this.props.onFetchPracticeAreas();
    this.props.onFetchStaff();
  }

  renderTableEditLink(val, row) {
    return (
      <TableEditLink 
        handleClick={() => {
          changeSelectedRecord(row);
          changeAdminOperation("edit");
          showModal();
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

  render() {
    const { onFilter, onSort, onPageLengthChange, onPageNumberChange } = this.props;
    const { data, filterValues, totalPages, 
      sortBy, currentPage, pageLength, selectedRecord,
      pageData, JWT, successMessage } = this.props;
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };
    const modalTitle = (adminOperation === "view" && `Matter Info (ID: ${selectedRecord.id}`)
                       (adminOperation === "add" && "Add a New Matter") ||
                       (adminOperation === "edit" && `Edit Matter (ID: ${selectedRecord.id}`)

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
            { title: 'File Open Date', component: TableDate, prop: 'fileOpen' },
            { title: 'Description', component: TablePostLink, prop: 'description'},
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
          show={modalShowing}>
          {adminOperation === "view" ? <ViewMatter/> : null}
          {adminOperation === "add" ? <AddMatter/> : null}
          {adminOperation === "edit" ? <EditMatter/> : null}
        </ModalMedium>
      </main>
    );
  }
}

AdminMatters.propTypes = {
  onFilter: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onPageLengthChange: PropTypes.func.isRequired,
  onPageNumberChange: PropTypes.func.isRequired,
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
)(AdminMatters);