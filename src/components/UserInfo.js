import React, { Component, PropTypes } from 'react';
import StaticFormGroup from './StaticFormGroup';
import moment from 'moment';
import _ from 'lodash';

export default class UserInfo extends Component { 
  render() {
    const { user } = this.props;
    const userCreated = moment(user.created, "ddd DD-MMM-YYYY HH:mm:ss").format('DD/MM/YY HH:mm:ss');
    const userUpdated = moment(user.updated, "ddd DD-MMM-YYYY HH:mm:ss").format('DD/MM/YY HH:mm:ss');

    return (
      <form className="form-horizontal">
        <StaticFormGroup 
          label="Created"
          text={userCreated}/>
        <StaticFormGroup 
          label="Updated"
          text={userUpdated}/>
        <StaticFormGroup 
          label="Status"
          text={user.active}/>
        <StaticFormGroup 
          label="Role"
          text={user.role}/>
        <StaticFormGroup 
          label="Username"
          text={user.username}/>
        <StaticFormGroup 
          label="Email"
          text={user.email}/>
        <StaticFormGroup 
          label="First Name"
          text={user.firstName}/>
        <StaticFormGroup 
          label="Middle Name"
          text={user.middleName}/>
        <StaticFormGroup 
          label="Last Name"
          text={user.lastName}/>
        <StaticFormGroup 
          label="Phone Number"
          text={user.phoneNumber}/>
        <StaticFormGroup 
          label="Full Address"
          text={user.fullAddress}/>
      </form>
    );
  }
}

UserInfo.propTypes = {
  initialize: PropTypes.object.isRequired,
  onEdit: PropTypes.object.isRequired,
  onHide: PropTypes.object.isRequired,
  handleSubmit: PropTypes.object.isRequired,
  pristine: PropTypes.object.isRequired,
  reset: PropTypes.object.isRequired,
  submitting: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
