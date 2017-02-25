import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from  'redux-form';
import { hideModal } from 'Admin/actions';
import { removeJWT } from 'Authentication/actions';
import { addMatter, addMatterInsideForm } from 'Entities/MattersActions';
import MatterParticularsForm from './MatterParticularsForm';
import ErrorAlert from 'components/ErrorAlert';
import ButtonBlock from 'components/ButtonBlock';
import Button from 'components/Button';

const mapStateToProps = (state) => {
  const { entities, authentication } = state;

  return {
    ...entities,
    ...authentication
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddMatter: (JWT, content) => {
      return dispatch(addMatter(JWT, content));
    },

    onAddMatterInsideForm: (JWT, content) => {
      return dispatch(addMatterInsideForm(JWT, content));
    },

    onJWTExpired: () => {
      dispatch(removeJWT());
    },

    onHideModal: () => {
      dispatch(hideModal());
    }
  };
};

class AddMatterForm extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  _handleSubmit(data) {
    const { onAddMatter, JWT, 
      onHideModal, onJWTExpired } = this.props;
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };

    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    onAddMatter(config, formData)
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

  _handleSubmitInsideForm(data) {
    const { onAddMatterInsideForm, JWT, onHideModal, onJWTExpired, changeMatterFieldValue } = this.props;
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };

    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    onAddMatterInsideForm(config, formData)
    .then(({matterId}) => {
      changeMatterFieldValue && 
      changeMatterFieldValue(matterId);
    })
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
    const { onHideModal, addButtonOnly, handleSubmit, 
      pristine, reset, submitting } = this.props;
    const { errorMessage } = this.state;
    
    return (
      <form>
        <MatterParticularsForm/>
        {errorMessage && <ErrorAlert message={errorMessage}/>}
        {addButtonOnly ? (
          <ButtonBlock 
            customClassNames="btn-primary"
            type="button"
            handleClick={handleSubmit(data => this._handleSubmitInsideForm(data))}>
            Save
          </ButtonBlock>
        ) : (
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
          </div>)}
      </form>
    );
  }
}

AddMatterForm.propTypes = {
  onAddMatter: PropTypes.func.isRequired,
  onHideModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  JWT: PropTypes.string.isRequired,
  onJWTExpired: PropTypes.func.isRequired,
  changeMatterFieldValue: PropTypes.func.isRequired,
  addButtonOnly: PropTypes.bool.isRequired,
  onAddMatterInsideForm: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form:  'AddMatterForm',
  destroyOnUnmount: false,
})(AddMatterForm));
