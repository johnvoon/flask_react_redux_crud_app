import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, FormSection, formValueSelector } from  'redux-form';
import UserParticularsForm from './UserParticularsForm';
import ErrorAlert from '../components/ErrorAlert';
import AsyncValidationFormGroup from '../components/AsyncValidationFormGroup';
import GeosuggestFormGroup from '../components/GeosuggestFormGroup';
import InputFormGroup from '../components/InputFormGroup';
import SelectFormGroup from '../components/SelectFormGroup';
import TextAreaFormGroup from '../components/TextAreaFormGroup';
import MultiselectFormGroup from '../components/MultiselectFormGroup';
import DatepickerFormGroup from '../components/DatepickerFormGroup';
import { required, email, username, maxLength, asyncValidateUserIdentity as asyncValidate, createOptionsList } from '../utils';
import { loadFormData as load } from './actions';
import _ from 'lodash';

class AddStaffForm extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  _handleSubmit(data) {
    const { onAddUser, onAddStaff, onHide, onJWTExpired, addedRecord } = this.props;
    console.log(data);
    const userEntityFields = [
      'email', 'username', 'password', 'lastName', 'firstName', 'middleName', 
      'phoneNumber', 'unitNumber', 'streetAddress', 'suburb', 'postcode',
      'state', 'country', 'photo'
    ];
    const staffEntityFields = [
      'dateJoined', 'position', 'practiceAreas', 'matters', 'description'
    ];
    let userFormData = new FormData();
    let staffFormData = new FormData();
    Object.keys(data).forEach((key) => {
      userEntityFields.includes(key) &&
      userFormData.append(key, data[key]);
      staffEntityFields.includes(key) &&
      staffFormData.append(key, data[key]);
    });
    userFormData.append('role', 'staff');

    onAddUser(userFormData)
    .then(({addedRecordId}) => {
      staffFormData.append('userId', addedRecordId);
      onAddStaff(staffFormData);
    })
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
    const { practiceAreas, matters, passwordValue, handleSubmit, pristine, reset, submitting } = this.props;
    const { errorMessage } = this.state;
    const practiceAreaOptions = createOptionsList(practiceAreas, "area");
    const matterOptions = createOptionsList(matters, "description");
    
    return (
      <div>
        <UserParticularsForm
          fillInAddress={(value) => this.fillInAddress(value)}
          passwordValue={passwordValue}/>
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
          name="matters"
          component={MultiselectFormGroup}
          label="Matters Handled"
          options={matterOptions}
          placeholder="Select one or more matters"/>
        <Field 
          name="description"
          component={TextAreaFormGroup}
          label="Description"
          validate={[ required, maxLength(1000) ]}
          rows="4"/>
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
      </div>
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

const selector = formValueSelector('AddStaffForm');

AddStaffForm = reduxForm({
  form:  'AddStaffForm',
  asyncValidate,
  asyncBlurFields: ['username', 'email'],
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(AddStaffForm);

AddStaffForm = connect(
  state => {
    const passwordValue = selector(state, 'password');

    return {
      passwordValue,
      initialValues: state.adminPages.formData
    };
  },
  { loadFormData: load }
)(AddStaffForm)

export default AddStaffForm;