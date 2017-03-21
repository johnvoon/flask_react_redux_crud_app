import React, { Component, PropTypes } from 'react';
import { Field } from  'redux-form';
import classNames from 'classnames';
import { required, email, username, passwordMatch } from 'utils';
import InputFormGroup from 'components/InputFormGroup';
import AsyncValidationFormGroup from 'components/AsyncValidationFormGroup';

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
    );
  }
}

UserAccountDetailsForm.propTypes = {
  isDisplayed: PropTypes.bool.isRequired,
  passwordValue: PropTypes.string.isRequired
};