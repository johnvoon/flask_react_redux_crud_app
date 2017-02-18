import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import SearchField from '../components/SearchField';
import PageLengthMenu from '../components/PageLengthMenu';
import ModalMedium from '../components/ModalMedium';
import GetJWTForm from './GetJWTForm';
import DeleteRecord from './DeleteRecord';
import SuccessAlert from '../components/SuccessAlert';
import TableDate from '../components/TableDate';
import TableHeading from '../components/TableHeading';
import TableDeleteLink from '../components/TableDeleteLink';
import { getJWT, 
         removeJWT, 
         fetchComments, 
         changeCommentVisibility, 
         deleteComment } from '../Entities/actions';
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
    onFetchComments: (id) => {
      dispatch(fetchComments(id));
    },

    onChangeCommentVisibility: (id, formData) => {
      dispatch(changeCommentVisibility(id, formData));
    },

    onGetJWT: (data) => {
      return dispatch(getJWT(data));
    },

    onJWTExpired: () => {
      dispatch(removeJWT());
    },

    onDelete: (JWT, id) => {
      return dispatch(deleteComment(JWT, id));
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

class AdminComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      showDeleteModal: false,
      showGetJWTModal: false,
      currentRecord: {}
    };
  }

  componentDidMount() {
    this.props.onFetchComments(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { JWT } = nextProps;
    const { visibilityChangePending, commentId, commentVisibility } = this.state;
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };

    if (visibilityChangePending && !this.props.JWT && JWT) {
      this.props.onChangeCommentVisibility(commentId, commentVisibility, config);
      this.setState({
        visibilityChangePending: false,
        showGetJWTModal: false
      })
    }
  }

  handleChange(id, {target: {value, name}}) {
    const { JWT, onJWTExpired, JWTExpired, onChangeCommentVisibility } = this.props;

    this.setState({
      visibilityChangePending: true,
      commentId: id,
      commentVisibility: value,
      [name]: value
    });

    if (!JWT || JWTExpired) {
      this.setState({showGetJWTModal: true});
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
            this.setState({showGetJWTModal: true});
          } else if (status === 404) {
            this.setState({
              errorMessage: data.message
            })
          } else {
            this.setState({
              errorMessage: message
            })
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
    return (
      <TableDeleteLink 
        handleClick={() => this.setState({
          currentRecord: row,
          showDeleteModal: true })}/>
    );
  }

  render() {
    const { onGetJWT, onJWTExpired, onDelete, onFilter, onSort, onPageLengthChange, onPageNumberChange } = this.props;
    const { data, filterValues, totalPages, sortBy, currentPage, pageLength, pageData, JWT, JWTExpired, successMessage } = this.props;
    const { currentRecord, showGetJWTModal, showDeleteModal, errorMessage } = this.state;
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };

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
        {errorMessage && <ErrorAlert message={errorMessage}/>}
        {successMessage && <SuccessAlert message={successMessage}/>}
        <Table 
          columns={[
            { title: 'ID', component: TableHeading, prop: 'id'},
            { title: 'Created On', component: TableDate, prop: 'created' },
            { title: 'Content', component: TableHeading, prop: 'content'},
            { title: 'Author Username', component: TableHeading, prop: 'authorUsername'},
            { title: 'Author Name', component: TableHeading, prop: 'authorFullName'},
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
          title="Change Comment Visibility"
          show={showGetJWTModal}
          onHide={() => this.setState({showGetJWTModal: false})}>
          <GetJWTForm
            onGetJWT={onGetJWT}
            JWTExpired={JWTExpired}
            onHide={() => this.setState({showGetJWTModal: false})}/>
        </ModalMedium>
        <ModalMedium
          title={`Delete Comment (ID: ${currentRecord.id})`}
          show={showDeleteModal} 
          onHide={() => this.setState({showDeleteModal: false})}>
          <DeleteRecord
            onDelete={onDelete.bind(null, config, currentRecord.id)}
            onHide={() => this.setState({showDeleteModal: false})}
            onGetJWT={onGetJWT}
            onJWTExpired={onJWTExpired}
            JWT={JWT}
            JWTExpired={JWTExpired}/>
        </ModalMedium>
      </main>
    );
  }
}

AdminComments.propTypes = {
  onFetchComments: PropTypes.func.isRequired,
  onGetJWT: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onPageLengthChange: PropTypes.func.isRequired,
  onPageNumberChange: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired,
  practiceAreas: PropTypes.object.isRequired,
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
)(AdminComments);