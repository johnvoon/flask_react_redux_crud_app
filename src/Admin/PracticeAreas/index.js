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
import TableCommentsLink from 'components/TableCommentsLink';
import TableEditLink from 'components/TableEditLink';
import TableDeleteLink from 'components/TableDeleteLink';
import { getJWT, removeJWT } from 'Authentication/actions';
import { fetchMatters, addMatter, editMatter } from 'Entities/MattersActions';
import { fetchPracticeAreas } from 'Entities/PracticeAreasActions';
import { fetchStaff } from 'Entities/StaffActions'; 
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
    onFetchMatters: () => {
      dispatch(fetchMatters());
    },

    onFetchPracticeAreas: () => {
      dispatch(fetchPracticeAreas());
    },

    onFetchStaff: () => {
      dispatch(fetchStaff());
    },

    onGetJWT: (data) => {
      return dispatch(getJWT(data));
    },

    onJWTExpired: () => {
      dispatch(removeJWT());
    },

    onAdd: (JWT, content) => {
      return dispatch(addMatter(JWT, content));
    },

    onEdit: (JWT, content, id) => {
      return dispatch(editMatter(JWT, content, id));
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
    return (
      <TableEditLink 
        handleClick={() => {
          changeSelectedRecord(row);
          changeAdminOperation("edit");
          showModal();
        }}/>
    );
  }

  render() {
    const { onGetJWT, onJWTExpired, onAdd, onEdit, onFilter, onSort, onPageLengthChange, onPageNumberChange } = this.props;
    const { posts, staff, practiceAreas } = this.props;
    const { data, filterValues, totalPages, sortBy, currentPage, pageLength, pageData, JWT, JWTExpired, successMessage } = this.props;
    const { currentRecord, showAddModal, showEditModal } = this.state;
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };

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
              <button
                className="btn btn-primary btn-block text-uppercase"
                onClick={() => this.setState({showAddModal: true})}>
                Add a New Matter
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
          title={}
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
)(AdminPracticeAreas);