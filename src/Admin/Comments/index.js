import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import DeleteComment from './DeleteComment';
import { filterAdminData, 
         sortData, 
         changePageLength, 
         changePageNumber,
         changeAdminOperation,
         showModal,
         hideModal,
         resetState } from 'Admin/actions';
import GetJWTForm from 'Admin/GetJWTForm';
import { selectData, selectPageData, selectTotalPages } from 'Admin/selectors';
import Pagination from 'components/Pagination';
import Table from 'components/Table';
import SearchField from 'components/SearchField';
import PageLengthMenu from 'components/PageLengthMenu';
import ModalMedium from 'components/ModalMedium';
import SuccessAlert from 'components/SuccessAlert';
import TableDate from 'components/TableDate';
import TableText from 'components/TableText';
import TableDeleteLink from 'components/TableDeleteLink';
import ErrorAlert from 'components/ErrorAlert';
import { removeJWT } from 'Authentication/actions'; 
import { fetchComments, 
  changeCommentVisibility } from 'Entities/CommentsActions';

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
    onFetchComments: (id, admin) => {
      dispatch(fetchComments(id, admin));
    },

    onChangeCommentVisibility: (id, formData) => {
      dispatch(changeCommentVisibility(id, formData));
    },

    onJWTExpired: () => {
      dispatch(removeJWT());
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

    onChangeAdminOperation: (value) => {
      dispatch(changeAdminOperation(value));
    },

    onResetState: () => {
      dispatch(resetState());
    }
  };
};

class AdminComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  componentDidMount() {
    const { onFetchComments, params } = this.props;
    
    onFetchComments(params.id, true);
  }

  componentWillReceiveProps(nextProps) {
    const { JWT } = nextProps;
    const { onChangeCommentVisibility, onHideModal } = this.props;
    const { visibilityChangePending, commentId, 
      commentVisibility } = this.state;
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };

    if (visibilityChangePending && !this.props.JWT && JWT) {
      onChangeCommentVisibility(commentId, commentVisibility, config);
      onHideModal();
      this.setState({
        visibilityChangePending: false
      });
    }
  }

  componentWillUnmount() {
    const { onResetState } = this.props;
    
    onResetState();
  }

  handleChange(id, {target: {value, name}}) {
    const { JWT, onJWTExpired, JWTExpired, 
      onChangeCommentVisibility, 
      onChangeAdminOperation,
      onShowModal } = this.props;

    this.setState({
      visibilityChangePending: true,
      commentId: id,
      commentVisibility: value,
      [name]: value
    });

    if (!JWT || JWTExpired) {
      onChangeAdminOperation("edit");
      onShowModal();
    } else {
      const config = {
        headers: {
          'Authorization': `JWT ${JWT}`
        }
      };
      let formData = new FormData();
      formData.append('visible', value);
      onChangeCommentVisibility(id, formData, config)
        .catch(({response, message}) => {
          const { status, data } = response;
          if (status === 401) {
            onJWTExpired();
            onChangeAdminOperation("edit");
            onShowModal();
          } else if (status === 404) {
            this.setState({
              errorMessage: data.message
            });
          } else {
            this.setState({
              errorMessage: message
            });
          }
        });
      this.setState({
        visibilityChangePending: false,
        commentId: '',
        commentVisibility: ''
      });
    }
  }

  renderSelectField(val, row) {
    this.handleChange = this.handleChange.bind(this);
    
    return (
      <select
        name={row.id}
        value={this.state[row.id] ? this.state[row.id] : (row.visible ? "1" : "0")}
        className="form-control"
        onChange={this.handleChange.bind(null, row.id)}>
        <option value="1">Visible</option>
        <option value="0">Hide</option>
      </select>
    );
  }

  renderTableDeleteLink(val, row) {
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

  render() {
    const { onFilter, onSort, onPageLengthChange, 
      onPageNumberChange, data, filterValues, totalPages, 
      sortBy, currentPage, pageLength, 
      pageData, selectedRecord, successMessage, 
      adminOperation, modalShowing } = this.props;
    const { errorMessage } = this.state;
    const modalTitle = (adminOperation === "edit" && "Change Comment Visibility") ||
                       (adminOperation === "delete" && `Delete Post (ID: ${selectedRecord.id}`);

    return (
      <main className="container-fluid">
        <Helmet
          title={`Admin - Commments for Post ${this.props.params.id}`}
          meta={[
            { name: 'description', content: `List of comments for post ${this.props.params.id}` }
          ]}/>
        <h1>{`Comments for Post ${this.props.params.id}`}</h1>
        <Link to="/admin/posts">Back to Posts</Link>
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
              placeholder="Search comment by keyword"/>
          </div>
          <div className="col-sm-4">
            <Pagination
              pageNavLength={3}
              totalPages={totalPages}
              currentPage={currentPage}
              onPageNumberChange={onPageNumberChange}/>
          </div>
        </div>
        {errorMessage && <ErrorAlert message={errorMessage}/>}
        {successMessage && <SuccessAlert message={successMessage}/>}
        <Table 
          columns={[
            { title: 'ID', component: TableText, prop: 'id'},
            { title: 'Created On', component: TableDate, prop: 'created' },
            { title: 'Content', component: TableText, prop: 'content'},
            { title: 'Author Username', component: TableText, prop: 'authorUsername'},
            { title: 'Author Name', component: TableText, prop: 'authorFullName'},
            { title: 'Visibility', 
              component: (val, row) => this.renderSelectField(val, row),
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
          show={modalShowing}>
          {adminOperation === "edit" ? <GetJWTForm/> : null}
          {adminOperation === "delete" ? <DeleteComment/> : null}
        </ModalMedium>
      </main>
    );
  }
}

AdminComments.propTypes = {
  onFetchComments: PropTypes.func.isRequired,
  onChangeCommentVisibility: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onPageLengthChange: PropTypes.func.isRequired,
  onPageNumberChange: PropTypes.func.isRequired,
  onShowModal: PropTypes.func.isRequired,
  onHideModal: PropTypes.func.isRequired,
  onJWTExpired: PropTypes.func.isRequired,
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
  JWT: PropTypes.string.isRequired,
  JWTExpired: PropTypes.bool.isRequired,
  successMessage: PropTypes.string.isRequired,
  selectedRecord: PropTypes.object.isRequired,
  adminOperation: PropTypes.string.isRequired,
  modalShowing: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminComments);