import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from  'redux-form';
import { slugify } from 'utils';
import { hideModal, loadFormData } from 'Admin/actions';
import { removeJWT } from 'Authentication/actions';
import { editPracticeArea } from 'Entities/PracticeAreasActions';
import PracticeAreaParticularsForm from './PracticeAreaParticularsForm';
import ErrorAlert from 'components/ErrorAlert';
import ButtonToolbar from 'components/ButtonToolbar';

const mapStateToProps = (state) => {
  const { entities, adminPages, authentication } = state;

  return {
    initialValues: adminPages.formData,
    ...entities,
    ...adminPages,
    ...authentication
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEditPracticeArea: (config, content, id) => {
      return dispatch(editPracticeArea(config, content, id));
    },

    onLoadFormData: (formData) => {
      return dispatch(loadFormData(formData));
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

    this.handleInitialize = this.handleInitialize.bind(this);
  }

  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    const { selectedRecord, onLoadFormData } = this.props;
    const description = (selectedRecord.description || []).map((paragraph) => {
      return paragraph;
    }).join('\r\n\r\n');

    const initData = {
      "area": selectedRecord.area,
      "description": description
    };

    onLoadFormData(initData);
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
      key === 'file' && formData.append('file', data.file[0]);
      formData.append(key, data[key]);
    });
    formData.append('slug', slugify(data.area));

    onEditPracticeArea(config, formData, selectedRecord.slug)
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

EditPracticeAreaForm.propTypes = {
  onEditPracticeArea: PropTypes.func.isRequired,
  onLoadFormData: PropTypes.func.isRequired,
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
})(EditPracticeAreaForm));
