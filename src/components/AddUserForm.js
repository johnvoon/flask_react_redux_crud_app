import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from  'redux-form';
import ErrorAlert from './ErrorAlert';
import InputFormGroup from './InputFormGroup';
import { required } from '../utils';


class AddUserForm extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  render() {
    const { onAdd, onHide,
            handleSubmit, pristine, reset, submitting } = this.props;
    const { errorMessage } = this.state;

    return (
      <form className="form-horizontal" onClick={handleSubmit(data => {
        onAdd(data)
        .then(() => onHide())
        .catch(error => this.setState({
          errorMessage: {error}
        }));
      })}>
        <Field 
          name="username"
          type="text"
          component={InputFormGroup}
          label="Username"
          validate={required}/>
        <Field 
          name="password"
          type="password"
          component={InputFormGroup}
          label="Password"
          validate={required}/>
        <Field 
          name="email"
          type="email"
          component={InputFormGroup}
          label="Email"
          validate={required}/>
        <Field 
          name="firstName"
          type="text"
          component={InputFormGroup}
          label="First Name"
          validate={required}/>
        <Field 
          name="middleName"
          type="text"
          component={InputFormGroup}
          label="Middle Name"/>
        <Field 
          name="lastName"
          type="text"
          component={InputFormGroup}
          label="Last Name"
          validate={required}/>
        <Field 
          name="unitNo"
          type="text"
          component={InputFormGroup}
          label="Unit No"
          validate={required}/>
        <Field 
          name="addressSearch"
          type="text"
          component={InputFormGroup}
          label=""
          placeholder="Enter address to search"
          validate={required}>
        </Field>
        <Field 
          name="unitNo"
          type="text"
          component={InputFormGroup}
          label="Unit No"
          validate={required}/>
        <Field 
          name="streetAddress"
          type="text"
          component={InputFormGroup}
          label="Street Address"
          validate={required}/>
        <Field 
          name="suburb"
          type="text"
          component={InputFormGroup}
          label="Suburb"
          validate={required}/>
        <Field 
          name="state"
          type="text"
          component={InputFormGroup}
          label="State"
          validate={required}/>
        <Field 
          name="postCode"
          type="text"
          component={InputFormGroup}
          label="Post Code"
          validate={required}/>
        <Field 
          name="suburb"
          type="text"
          component={InputFormGroup}
          label="Unit No"
          validate={required}/>
        {errorMessage && <ErrorAlert message={errorMessage}/>}
        <div className="btn-toolbar">
          <button className="btn btn-primary pull-right" type="button" disabled={pristine || submitting} onClick={reset}>
            Reset
          </button>
          <button
            className="btn btn-primary pull-right" type="submit" disabled={submitting}>
            Save
          </button>
        </div>
      </form>
    );
  }
}

AddUserForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form:  'AddUserForm'
})(AddUserForm);