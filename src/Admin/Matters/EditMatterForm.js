import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from  'redux-form';
import moment from 'moment';
import { hideModal, loadFormData } from 'Admin/actions';
import { removeJWT } from 'Authentication/actions';
import { editMatter } from 'Entities/MattersActions';
import MatterParticularsForm from './MatterParticularsForm';
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
    onEditMatter: (JWT, content, id) => {
      return dispatch(editMatter(JWT, content, id));
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

class EditMatterForm extends Component { 
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

    const initData = {
      "fileOpen": moment(selectedRecord.fileOpen).format('DD/MM/YYYY'),
      "costsOnAccount": selectedRecord.costsOnAccount,
      "practiceAreas": (selectedRecord.practiceAreas || []).join(','),
      "staff": (selectedRecord.staff || []).join(','),
      "description": selectedRecord.description.replace(/^[\[\d+\]\s+]+/g, '')
    };

    onLoadFormData(initData);
  }

  _handleSubmit(data) {
    const { selectedRecord, onEditMatter, JWT, onHideModal, 
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
    onEditMatter(config, formData, selectedRecord.id)
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
    const { onHideModal, handleSubmit, 
      pristine, reset, submitting } = this.props;
    const { errorMessage } = this.state;
    
    return (
      <form>
        <MatterParticularsForm/>
        {errorMessage && <ErrorAlert message={errorMessage}/>}
        <div className="btn-toolbar">
        <ButtonToolbar
          onHideModal={onHideModal}
          pristine={pristine}
          submitting={submitting}
          reset={reset}
          handleSubmit={handleSubmit(data => this._handleSubmit(data))}/>    
        </div>
      </form>
    );
  }
}

EditMatterForm.propTypes = {
  onLoadFormData: PropTypes.func.isRequired,
  onEditMatter: PropTypes.func.isRequired,
  onHideModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  selectedRecord: PropTypes.object.isRequired,
  JWT: PropTypes.string.isRequired,
  onJWTExpired: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form:  'EditMatterForm',
})(EditMatterForm));
