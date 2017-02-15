import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from  'redux-form';
import InputFormGroup from '../components/InputFormGroup';
import SelectFormGroup from '../components/SelectFormGroup';
import StaticFormGroup from '../components/StaticFormGroup';
import AsyncValidationFormGroup from '../components/AsyncValidationFormGroup';
import GeosuggestFormGroup from '../components/GeosuggestFormGroup';
import ErrorAlert from '../components/ErrorAlert';
import { required, email, username, asyncValidateUserIdentity as asyncValidate } from '../utils';
import { loadFormData as load } from './actions';
import moment from 'moment';
import _ from 'lodash';

class EditUserForm extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    }
  }

  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    const { user } = this.props;
    const { loadFormData } = this.props;
    const initData = {
      "active": user.active === "Active" ? "1" : "0",
      "role": user.role,
      "firstName": user.firstName,
      "middleName": user.middleName,
      "lastName": user.lastName,
      "phoneNumber": user.phoneNumber,
      "unitNumber": user.unitNumber,
      "streetAddress": user.streetAddress,
      "suburb": user.suburb,
      "postcode": user.postcode,
      "state": user.state,
      "country": user.country
    };

    loadFormData(initData);
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

  _handleSubmit(data) {
    const { user, onEdit, onHide, onJWTExpired } = this.props;
      
    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    onEdit(formData, user.id)
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
    const { user } = this.props;
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const { errorMessage } = this.state;
    
    const userCreated = moment(user.created, "ddd DD-MMM-YYYY HH:mm:ss").format('DD/MM/YY HH:mm:ss');
    const userUpdated = moment(user.updated, "ddd DD-MMM-YYYY HH:mm:ss").format('DD/MM/YY HH:mm:ss');
    const activeOptions = ["1 - Active", "2 - Disabled"]
    const roleOptions = ["admin - Admin", "client - Client", "staff - Staff", "public - Public"]
    
    return (
      <form>
        <StaticFormGroup 
          label="Created"
          text={userCreated}/>
        <StaticFormGroup 
          label="Updated"
          text={userUpdated}/>
        <StaticFormGroup 
          label="Username"
          text={user.username}/>
        <StaticFormGroup 
          label="Email"
          text={user.email}/>
        <div className="row">
          <div className="col-sm-6">
            <Field 
              name="active"
              component={SelectFormGroup}
              label="Status"
              validate={required}
              options={activeOptions}/>
          </div>
          <div className="col-sm-6">
            <Field 
              name="role"
              component={SelectFormGroup}
              label="Role"
              validate={required}
              options={roleOptions}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <Field 
              name="lastName"
              type="text"
              component={InputFormGroup}
              label="Last Name"
              validate={required}/>
          </div>
          <div className="col-sm-6">
            <Field 
              name="firstName"
              type="text"
              component={InputFormGroup}
              label="First Name"
              validate={required}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <Field 
              name="middleName"
              type="text"
              component={InputFormGroup}
              label="Middle Name"/>
          </div>
          <div className="col-sm-6">
            <Field 
              name="phoneNumber"
              type="tel"
              component={InputFormGroup}
              label="Mobile Number"
              validate={required}/>
          </div>
        </div>
        <Field 
          name="addressSearch"
          type="text"
          component={GeosuggestFormGroup}
          label="Address Search"
          placeholder="Enter your address to search"
          fillInAddress={(value) => this.fillInAddress(value)}>
        </Field>
        <div className="row">
          <div className="col-sm-2">
            <Field 
              name="unitNumber"
              type="text"
              component={InputFormGroup}
              label="Unit Number"/>
          </div>
          <div className="col-sm-5">
            <Field 
              name="streetAddress"
              type="text"
              component={InputFormGroup}
              label="Street Address"/>
          </div>
          <div className="col-sm-5">
            <Field 
              name="suburb"
              type="text"
              component={InputFormGroup}
              label="Suburb"/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2">
            <Field 
              name="postcode"
              type="text"
              component={InputFormGroup}
              label="Postcode"/>
          </div>
          <div className="col-sm-5">
            <Field 
              name="state"
              type="text"
              component={InputFormGroup}
              label="State"/>
          </div>
          <div className="col-sm-5">
            <Field 
              name="country"
              type="text"
              component={InputFormGroup}
              label="Country"/>
          </div>
        </div>
        {errorMessage && <ErrorAlert message={errorMessage}/>}
        <div className="btn-toolbar">
          <button 
            className="btn btn-danger pull-right" 
            type="button" 
            disabled={ pristine || submitting} 
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

EditUserForm.propTypes = {
  initialize: PropTypes.object.isRequired,
  onEdit: PropTypes.object.isRequired,
  onHide: PropTypes.object.isRequired,
  handleSubmit: PropTypes.object.isRequired,
  pristine: PropTypes.object.isRequired,
  reset: PropTypes.object.isRequired,
  submitting: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

EditUserForm = reduxForm({
  form:  'EditUserForm',
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(EditUserForm);

EditUserForm = connect(
  state => {
    return {initialValues: state.adminPages.formData}
  },
  { loadFormData: load }
)(EditUserForm)

export default EditUserForm;
