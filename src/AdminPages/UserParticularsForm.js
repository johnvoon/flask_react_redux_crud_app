import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from  'redux-form';
import ErrorAlert from '../components/ErrorAlert';
import InputFormGroup from '../components/InputFormGroup';
import SelectFormGroup from '../components/SelectFormGroup';
import GeosuggestFormGroup from '../components/GeosuggestFormGroup';
import AsyncValidationFormGroup from '../components/AsyncValidationFormGroup';
import FileUploadFormGroup from '../components/FileUploadFormGroup';
import { required, email, username, passwordMatch, asyncValidateUserIdentity as asyncValidate } from '../utils';
import { loadFormData as load } from './actions';
import _ from 'lodash';

export default class UserParticularsForm extends Component {
  render() {
    const { passwordValue, fillInAddress } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
            <Field 
              name="email"
              type="email"
              component={AsyncValidationFormGroup}
              label="Email"
              validate={[required, email]}/>            
          </div>
          <div className="col-sm-6">
            <Field 
              name="username"
              type="text"
              component={AsyncValidationFormGroup}
              label="Username"
              validate={[required, username]}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <Field 
              name="password"
              type="password"
              component={InputFormGroup}
              label="Password"
              validate={required}/>
          </div>
          <div className="col-sm-6">
            <Field 
              name="passwordConfirm"
              type="password"
              component={InputFormGroup}
              label="Confirm Password"
              validate={[required, passwordMatch(passwordValue)]}/>
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
        <div>
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
        </div>
        <Field 
          name="addressSearch"
          type="text"
          component={GeosuggestFormGroup}
          label="Address Search"
          placeholder="Enter your address to search"
          fillInAddress={fillInAddress}/>
        <div className="row">
          <div className="col-sm-2">
            <Field 
              name="unitNumber"
              type="text"
              component={InputFormGroup}
              label="Unit No"/>            
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
        <Field 
          name="file"
          component={FileUploadFormGroup}
          label="Photo"/>
      </div>
    )
  }
}