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
      <form>
        <div>
          <img src={user.photo} alt="User photo"/>
        </div>
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
            <StaticFormGroup 
              label="Status"
              text={user.active}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Role"
              text={user.role}/>
          </div>
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Username"
              text={user.username}/>
          </div>
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Email"
              text={user.email}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Last Name"
              text={user.lastName}/>
          </div>
          <div className="col-sm-4">
            <StaticFormGroup 
              label="First Name"
              text={user.firstName}/>
          </div>
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Middle Name"
              text={user.middleName}/>
          </div>
        </div>
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
