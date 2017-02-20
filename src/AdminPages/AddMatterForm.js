import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from  'redux-form';
import { loadFormData as load } from './actions';
import ErrorAlert from '../components/ErrorAlert';
import InputFormGroup from '../components/InputFormGroup';
import InputGroupFormGroup from '../components/InputGroupFormGroup';
import MultiselectFormGroup from '../components/MultiselectFormGroup';
import DatepickerFormGroup from '../components/DatepickerFormGroup';
import { required } from '../utils';
import _ from 'lodash';

class AddMatterForm extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  _handleSubmit(data) {
    const { onAddMatter, onHide, onJWTExpired } = this.props;
    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    onAddMatter(formData)
    .then(() => onHide())
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
    const { handleSubmit, hideAddMatterForm, pristine, reset, submitting } = this.props;
    const { errorMessage } = this.state;
    
    return (
      <form>
        <Field
          name="fileOpen"
          component={DatepickerFormGroup}
          label="File Open Date"
          validate={required}/>
        <Field
          name="costsOnAccount"
          component={InputGroupFormGroup}
          label="Costs on account"/>
        <Field
          name="practiceAreas"
          component={MultiselectFormGroup}
          label="Practice Areas"
          validate={required}/>
        <Field
          name="matter"
          component={InputFormGroup}
          label="Matter"
          validate={required}/>
        {errorMessage && <ErrorAlert message={errorMessage}/>}
        <div className="btn-toolbar">
          <button
            className="btn btn-primary pull-right" 
            type="submit"
            disabled={submitting}
            onClick={handleSubmit(data => this._handleSubmit(data))}>
            Add Matter
          </button>
          <button
            className="btn btn-danger pull-right" 
            type="button"
            onClick={hideAddMatterForm}>
            Cancel
          </button>          
        </div>
      </form>
    );
  }
}

AddMatterForm.propTypes = {
  onAddMatter: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

AddMatterForm = reduxForm({
  form:  'AddMatterForm',
  destroyOnUnmount: false,
})(AddMatterForm);

export default AddMatterForm;