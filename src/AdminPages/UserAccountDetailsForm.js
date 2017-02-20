import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field } from  'redux-form';
import ErrorAlert from '../components/ErrorAlert';
import InputFormGroup from '../components/InputFormGroup';
import SelectFormGroup from '../components/SelectFormGroup';
import AsyncValidationFormGroup from '../components/AsyncValidationFormGroup';
import FileUploadFormGroup from '../components/FileUploadFormGroup';
import { required, email, username, passwordMatch, asyncValidateUserIdentity as asyncValidate } from '../utils';
import { loadFormData as load } from './actions';
import classNames from 'classnames';
import _ from 'lodash';

export default class UserAccountDetailsForm extends Component {
  render() {
    const { isDisplayed, passwordValue } = this.props;

    return (
      <div className={classNames({
        hidden: !isDisplayed
      })}>
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
      </div>
    )
  }
}