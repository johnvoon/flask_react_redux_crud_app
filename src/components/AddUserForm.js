import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from  'redux-form';
import ErrorAlert from './ErrorAlert';
import InputFormGroup from './InputFormGroup';
import SelectFormGroup from './SelectFormGroup';
import GeosuggestFormGroup from './GeosuggestFormGroup';
import AsyncValidationFormGroup from './AsyncValidationFormGroup';
import { required, email, username, asyncValidateUserIdentity as asyncValidate } from '../utils';
import { loadFormData as load } from '../AdminPages/actions';
import _ from 'lodash';

class AddUserForm extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  _handleSubmit(data) {
    const { onAdd, onHide, onJWTExpired } = this.props;
    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    onAdd(formData)
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

  fillInAddress(value) {
    const { loadFormData } = this.props;
    const { gmaps } = value;
    const { address_components } = gmaps;
    const addressComponents = {}
    address_components.forEach((component) => {
      const addressType = component.types[0];
      const value = component.long_name;
      addressComponents[addressType] = value
    });
    const initData = {
      unitNumber: _.get(addressComponents, 'subpremise', ''),
      streetAddress: _.get(addressComponents, 'street_number', '') + ' ' + _.get(addressComponents, 'route', ''),
      suburb: _.get(addressComponents, 'locality', ''),
      postcode: _.get(addressComponents, 'postal_code', ''),
      state: _.get(addressComponents, 'administrative_area_level_1', ''),
      country: _.get(addressComponents, 'country', '')
    };

    loadFormData(initData);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const { errorMessage } = this.state;
    const roleOptions = ["client - Client", "staff - Staff", "public - Public"];

    return (
      <form className="form-horizontal">
        <Field 
          name="role"
          component={SelectFormGroup}
          label="Role"
          validate={required}
          options={roleOptions}/>
        <Field 
          name="username"
          type="text"
          component={AsyncValidationFormGroup}
          label="Username"
          validate={[required, username]}/>
        <Field 
          name="password"
          type="password"
          component={InputFormGroup}
          label="Password"
          validate={required}/>
        <Field 
          name="email"
          type="email"
          component={AsyncValidationFormGroup}
          label="Email"
          validate={[required, email]}/>
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
          name="phoneNumber"
          type="tel"
          component={InputFormGroup}
          label="Mobile Number"
          validate={required}/>
        <Field 
          name="addressSearch"
          type="text"
          component={GeosuggestFormGroup}
          label="Address Search"
          placeholder="Enter your address to search"
          fillInAddress={(value) => this.fillInAddress(value)}>
        </Field>
        <Field 
          name="unitNumber"
          type="text"
          component={InputFormGroup}
          label="Unit Number"/>
        <Field 
          name="streetAddress"
          type="text"
          component={InputFormGroup}
          label="Street Address"/>
        <Field 
          name="suburb"
          type="text"
          component={InputFormGroup}
          label="Suburb"/>
        <Field 
          name="postcode"
          type="text"
          component={InputFormGroup}
          label="Postcode"/>
        <Field 
          name="state"
          type="text"
          component={InputFormGroup}
          label="State"/>
        <Field 
          name="country"
          type="text"
          component={InputFormGroup}
          label="Country"/>
        {errorMessage && <ErrorAlert message={errorMessage}/>}
        <div className="btn-toolbar">
          <button 
            className="btn btn-primary pull-right" 
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

AddUserForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

AddUserForm = reduxForm({
  form:  'AddUserForm',
  asyncValidate,
  asyncBlurFields: ['username', 'email'],
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(AddUserForm);

AddUserForm = connect(
  state => {
    return {initialValues: state.adminPages.formData}
  },
  { loadFormData: load }
)(AddUserForm)

export default AddUserForm;