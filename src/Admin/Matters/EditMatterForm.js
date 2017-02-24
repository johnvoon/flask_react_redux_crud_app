import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from  'redux-form';
import _ from 'lodash';
import { hideModal, loadFormData as load } from 'Admin/actions';
import { required, createOptionsList } from 'utils';
import { removeJWT } from 'Authentication/actions';
import { addMatter } from 'Entities/MattersActions';
import MatterParticularsForm from './MatterParticularsForm';
import ErrorAlert from 'components/ErrorAlert';
import ButtonBlock from 'components/ButtonBlock';

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
    onEditMatter: (JWT, content, matterId) => {
      return dispatch(addMatter(JWT, content, matterId));
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
  }

  _handleSubmit(data) {
    const { selectedRecord, onEditMatter, JWT, onHideModal, 
      onJWTExpired, changeMatterFieldValue } = this.props;
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
        })
      } else {
        this.setState({
          errorMessage: message
        })
      }
    });
  }

  render() {
    const { addButtonOnly, handleSubmit, pristine, reset, submitting } = this.props;
    const { errorMessage } = this.state;
    
    return (
      <form>
        <MatterParticularsForm/>
        {errorMessage && <ErrorAlert message={errorMessage}/>}
        {addButtonOnly ? (
          <ButtonBlock 
            customClassNames="btn-primary"
            type="button"
            handleClick={props.handleClick}>
            Save
          </ButtonBlock>
        ) : (
          <div className="btn-toolbar">
            <Button
              customClassNames="btn-danger pull-right" 
              type="button" 
              handleClick={onHideModal()}>
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

EditMatterForm.propTypes = {
  onEditMatter: PropTypes.func.isRequired,
  onHideModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form:  'EditMatterForm',
  destroyOnUnmount: false,
})(EditMatterForm));
