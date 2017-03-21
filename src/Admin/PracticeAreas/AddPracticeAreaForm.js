import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from  'redux-form';
import { slugify } from 'utils';
import { hideModal } from 'Admin/actions';
import { removeJWT } from 'Authentication/actions';
import { addPracticeArea } from 'Entities/PracticeAreasActions';
import ErrorAlert from 'components/ErrorAlert';
import ButtonToolbar from 'components/ButtonToolbar';
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
    onAddPracticeArea: (config, content) => {
      return dispatch(addPracticeArea(config, content));
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
      key === 'file' && formData.append('file', data.file[0]);
      formData.append(key, data[key]);
    });
    formData.append('slug', slugify(data.area));
    
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
        <ButtonToolbar
          onHideModal={onHideModal}
          pristine={pristine}
          submitting={submitting}
          reset={reset}
          handleSubmit={handleSubmit(data => this._handleSubmit(data))}/>
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
