import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from  'redux-form';
import { hideModal } from 'Admin/actions';
import { removeJWT } from 'Authentication/actions';
import { editPracticeArea } from 'Entities/PracticeAreasActions';
import PracticeAreaParticularsForm from './PracticeAreaParticularsForm';
import ErrorAlert from 'components/ErrorAlert';
import Button from 'components/Button';

const mapStateToProps = (state) => {
  const { entities, adminPages, authentication } = state;

  return {
    ...entities,
    ...adminPages,
    ...authentication
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEditPracticeArea: (JWT, content, practiceAreaId) => {
      return dispatch(editPracticeArea(JWT, content, practiceAreaId));
    },

    onJWTExpired: () => {
      dispatch(removeJWT());
    },

    onHideModal: () => {
      dispatch(hideModal());
    }
  };
};

class EditPracticeAreaForm extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  _handleSubmit(data) {
    const { selectedRecord, onEditPracticeArea, JWT, onHideModal, 
      onJWTExpired } = this.props;
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };

    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    onEditPracticeArea(config, formData, selectedRecord.id)
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
    const { onHideModal, handleSubmit, pristine, reset, submitting } = this.props;
    const { errorMessage } = this.state;
    
    return (
      <form>
        <PracticeAreaParticularsForm/>
        {errorMessage && <ErrorAlert message={errorMessage}/>}
        <div className="btn-toolbar">
          <Button
            customClassNames="btn-danger pull-right" 
            type="button" 
            handleClick={onHideModal}>
            Close
          </Button>
          <Button 
            customClassNames="btn-danger pull-right" 
            type="button" 
            disabled={pristine || submitting} 
            handleClick={reset}>
            Reset
          </Button>
          <Button 
            customClassNames="btn-primary pull-right" 
            type="submit"
            disabled={submitting}
            handleClick={handleSubmit(data => this._handleSubmit(data))}>
            Save
          </Button>      
        </div>
      </form>
    );
  }
}

EditPracticeAreaForm.propTypes = {
  onEditPracticeArea: PropTypes.func.isRequired,
  onHideModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  selectedRecord: PropTypes.object.isRequired,
  JWT: PropTypes.string.isRequired, 
  onJWTExpired: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps  
)(reduxForm({
  form:  'EditPracticeAreaForm',
  destroyOnUnmount: false,
})(EditPracticeAreaForm));
