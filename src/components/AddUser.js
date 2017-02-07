import React, { Component, PropTypes } from 'react';
import GetJWTForm from './GetJWTForm';
import AddUserForm from './AddUserForm';
import AddStaffForm from './AddStaffForm';
import AddClientForm from './AddClientForm';
import _ from 'lodash';

export default class AddUser extends Component {
  

  render() {
    const { onAddUser, onAddStaff, onAddClient, onHide, onGetJWT, onJWTExpired } = this.props;
    const { practiceAreas, addedRecord, JWT, JWTExpired } = this.props;
    
    return (
      <div>
        <AddStaffForm
          onAddStaff={onAddStaff}
          practiceAreas={practiceAreas}
          onJWTExpired={onJWTExpired}
          onHide={onHide}/>
        {!JWT && <GetJWTForm
                   onGetJWT={onGetJWT}
                   JWTExpired={JWTExpired}/>}
        {JWT && _.isEmpty(addedRecord) && 
          <AddUserForm
            onAddUser={onAddUser}
            onJWTExpired={onJWTExpired}
            onHide={onHide}/>}
        {addedRecord.role === "staff" && 
          <AddStaffForm
            onAddStaff={onAddStaff}
            practiceAreas={practiceAreas}
            onJWTExpired={onJWTExpired}
            onHide={onHide}/>}
        {addedRecord.role === "client" && 
          <AddClientForm
            onAddClient={onAddClient}
            onJWTExpired={onJWTExpired}
            onHide={onHide}/>}
      </div>
    );
  }
}

AddUser.propTypes = {
  onAddUser: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  getJWT: PropTypes.func.isRequired,
  JWT: PropTypes.string.isRequired
};