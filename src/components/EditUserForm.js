import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from  'redux-form';
import InputFormGroup from './InputFormGroup';
import SelectFormGroup from './SelectFormGroup';
import StaticFormGroup from './StaticFormGroup';
import ErrorAlert from './ErrorAlert';
import { required, maxLength, createOptionsList } from '../utils';
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
    console.log(user);
    const { initialize } = this.props;
    const initData = {
      "username": user.title,
      "active": user.active === "Active" ? "1" : "0",
      "role": user.role,
      "email": user.email,
      "firstName": user.firstName,
      "middleName": user.middleName,
      "lastName": user.lastName,
      "mobileNumber": user.phoneNumber,
      "unitNumber": user.unitNumber,
      "streetAddress": user.streetAddress,
      "suburb": user.suburb,
      "postcode": user.postcode,
      "state": user.state,
      "country": user.country
    };

    initialize(initData);
  }

  _handleSubmit(data) {
    const { onEdit, onHide, onJWTExpired } = this.props;
      
    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    onEdit(formData)
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
      <form className="form-horizontal">
        <StaticFormGroup 
          label="Created"
          text={userCreated}/>
        <StaticFormGroup 
          label="Updated"
          text={userUpdated}/>
        <Field 
          name="active"
          component={SelectFormGroup}
          label="Status"
          validate={required}
          options={activeOptions}/>   
        <Field 
          name="role"
          component={SelectFormGroup}
          label="Role"
          validate={required}
          options={roleOptions}/>        
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
          name="mobileNumber"
          type="tel"
          component={InputFormGroup}
          label="Mobile Number"
          validate={required}/>
        <Field 
          name="addressSearch"
          type="text"
          component={InputFormGroup}
          label="Address Search"
          placeholder="Enter address to search">
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

export default reduxForm({
  form: 'EditUserForm',
  destroyOnUnmount: false
})(EditUserForm)
