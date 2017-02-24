import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field } from  'redux-form';
import _ from 'lodash';
import classNames from 'classnames';
import { required } from 'utils';
import InputFormGroup from 'components/InputFormGroup';


export default class UserParticularsForm extends Component {
  render() {
    const { isDisplayed } = this.props;

    return (
      <div className={classNames({
        hidden: !isDisplayed
      })}>
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
      </div>
    )
  }
}