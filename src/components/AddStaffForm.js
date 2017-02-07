import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from  'redux-form';
import ErrorAlert from './ErrorAlert';
import InputFormGroup from './InputFormGroup';
import TextAreaFormGroup from './TextAreaFormGroup';
import MultiselectFormGroup from './MultiselectFormGroup';
import FileUploadFormGroup from './FileUploadFormGroup';
import DatepickerFormGroup from './DatepickerFormGroup';
import { required, maxLength, createOptionsList } from '../utils';
import { loadFormData as load } from '../AdminPages/actions';

class AddStaffForm extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  _handleSubmit(data) {
    const { onAddStaff, onHide, onJWTExpired } = this.props;
    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    onAddStaff(formData)
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
    const { practiceAreas, handleSubmit, pristine, reset, submitting } = this.props;
    const { errorMessage } = this.state;
    const practiceAreaOptions = createOptionsList(practiceAreas, "area");

    return (
      <form>
        <div className="row">
          <div className="col-sm-6">
            <Field 
              name="dateJoined"
              component={DatepickerFormGroup}
              label="Date Joined"/>
          </div>
          <div className="col-sm-6">
            <Field 
              name="position"
              type="text"
              component={InputFormGroup}
              label="Position"/>
          </div>
        </div>
        <Field 
          name="practiceAreas"
          component={MultiselectFormGroup}
          label="Practice Areas"
          options={practiceAreaOptions}
          placeholder="Select one or more practice areas"/>
        <Field 
          name="cases"
          component={MultiselectFormGroup}
          label="Cases Handled"
          placeholder="Select one or more cases"/>
        <Field 
          name="description"
          component={TextAreaFormGroup}
          label="Description"
          validate={[ required, maxLength(1000) ]}
          rows="4"/>
        <Field 
          name="file"
          component={FileUploadFormGroup}
          label="Photo"/>
        {errorMessage && <ErrorAlert message={errorMessage}/>}
        <div className="btn-toolbar">
          <button 
            className="btn btn-danger pull-right" 
            type="button" 
            disabled={pristine || submitting} 
            onClick={reset}>
            Reset
          </button>
          <button
            className="btn btn-primary pull-right" 
            type="submit" 
            disabled={submitting}
            onClick={handleSubmit(data => this._handleSubmit(data))}>
            Save
          </button>
        </div>
      </form>
    );
  }
}

AddStaffForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form:  'AddStaffForm',
  destroyOnUnmount: false
})(AddStaffForm);
