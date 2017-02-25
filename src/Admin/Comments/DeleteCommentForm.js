import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { removeJWT } from 'Authentication/actions';
import { deleteComment } from 'Entities/CommentsActions';
import { hideModal } from 'Admin/actions';
import Button from 'components/Button';
import ErrorAlert from 'components/ErrorAlert';

const mapStateToProps = (state) => {
  const { entities, authentication } = state;
  
  return {
    ...entities,
    ...authentication
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteComment: (JWT, commentId) => {
      return dispatch(deleteComment(JWT, commentId));
    },

    onJWTExpired: () => {
      dispatch(removeJWT());
    },

    onHideModal: () => {
      dispatch(hideModal());
    }
  };
};

class DeleteCommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  _handleSubmit() {
    const { onDeleteComment, onHideModal, onJWTExpired,
      selectedRecord, JWT } = this.props;

    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };

    onDeleteComment(config, selectedRecord.id)
    .then(() => onHideModal())
    .catch(({response, message}) => {
      const { status, data } = response;
      if (status === 401) {
        onJWTExpired();
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
  }

  render() {
    const { onHideModal } = this.props;
    const { handleSubmit, submitting } = this.props;
    const { errorMessage } = this.state;

    return (
      <div>
        <p>Are you sure you want to delete this record? 
          WARNING: This action is irreversible</p> 
        <form>
          {errorMessage && <ErrorAlert message={errorMessage}/>}
          <div className="btn-toolbar">
            <Button
              customClassNames="btn-danger pull-right" 
              type="button" 
              handleClick={onHideModal()}>
              Close
            </Button>
            <Button
              customClassNames="btn-primary pull-right" 
              type="submit"
              disabled={submitting}
              handleClick={handleSubmit(() => this._handleSubmit())}>
              Yes
            </Button>        
          </div>
        </form>
      </div>
    );    
  }
}

DeleteCommentForm.propTypes = {
  onDeleteComment: PropTypes.func.isRequired,
  onHideModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.func.isRequired,
  onJWTExpired: PropTypes.func.isRequired,
  selectedRecord: PropTypes.object.isRequired,
  JWT: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'DeleteCommentForm'
})(DeleteCommentForm));