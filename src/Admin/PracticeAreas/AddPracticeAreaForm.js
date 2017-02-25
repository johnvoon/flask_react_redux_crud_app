import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from  'redux-form';
import { hideModal } from 'Admin/actions';
import { removeJWT } from 'Authentication/actions';
import { addMatter } from 'Entities/MattersActions';
import ErrorAlert from 'components/ErrorAlert';
import Button from 'components/Button';
import PracticeAreaParticularsForm from './PracticeAreaParticularsForm';

const mapStateToProps = (state) => {
  const { entities, authentication } = state;

  return {
    ...entities,
    ...authentication
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPracticeArea: (JWT, content) => {
      return dispatch(addMatter(JWT, content));
    },

    onJWTExpired: () => {
      dispatch(removeJWT());
    },

    onHideModal: () => {
      dispatch(hideModal());
    }
  };
};

class AddPracticeAreaForm extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  _handleSubmit(data) {
    const { onAddPracticeArea, JWT, onHideModal, onJWTExpired } = this.props;
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };

    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    onAddPracticeArea(config, formData)
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

AddPracticeAreaForm.propTypes = {
  onAddPracticeArea: PropTypes.func.isRequired,
  onHideModal: PropTypes.func.isRequired,
  onJWTExpired: PropTypes.func.isRequired,
  JWT: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form:  'AddPracticeAreaForm',
  destroyOnUnmount: false,
})(AddPracticeAreaForm));
