import React, { Component } from 'react';
import { Field } from 'redux-form';
import StaticFormGroup from '../components/StaticFormGroup';
import InputFormGroup from '../components/InputFormGroup';
import SelectFormGroup from '../components/SelectFormGroup';
import moment from 'moment';
import { required } from '../utils';
import classNames from 'classnames';

export default class EditUserParticularsForm extends Component {
  render() {
    const { user, isDisplayed, handleChange } = this.props;
    const userCreated = moment(user.created, "ddd DD-MMM-YYYY HH:mm:ss").format('DD/MM/YY HH:mm:ss');
    const userUpdated = moment(user.updated, "ddd DD-MMM-YYYY HH:mm:ss").format('DD/MM/YY HH:mm:ss');
    const activeOptions = ["1 - Active", "2 - Disabled"];
    const roleOptions = ["admin - Admin", "client - Client", "staff - Staff", "public - Public"];
    
    return (
      <div className={classNames({
        hidden: !isDisplayed
      })}>
        <div className="row">
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Created"
              text={userCreated}/>
          </div>
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Updated"
              text={userUpdated}/>
          </div>
          <div className="col-sm-4">
            <Field 
              name="active"
              component={SelectFormGroup}
              label="Status"
              validate={required}
              options={activeOptions}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2">
            {user.role === 'staff' || user.role === 'client' ? (
              <StaticFormGroup 
                label="Role"
                text={user.role}/>
            ) : (
              <Field 
                name="role"
                component={SelectFormGroup}
                label="Role"
                options={roleOptions}
                handleChange={handleChange}/>
            )}
          </div>
          <div className="col-sm-5">
            <StaticFormGroup 
              label="Username"
              text={user.username}/>
          </div>
          <div className="col-sm-5">
            <StaticFormGroup 
              label="Email"
              text={user.email}/>
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
      </div>
    );    
  }
}
