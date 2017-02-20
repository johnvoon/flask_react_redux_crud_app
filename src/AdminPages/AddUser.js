import React, { Component, PropTypes } from 'react';
import GetJWTForm from './GetJWTForm';
import RoleSelectForm from './RoleSelectForm';
import AddStaffForm from './AddStaffForm';
import AddClientForm from './AddClientForm';
import AddPublicUserForm from './AddPublicUserForm';
import _ from 'lodash';

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: ''
    }
  }

  handleClick(event) {
    this.setState({
      role: event.target.textContent
    });
  }

  render() {
    this.handleClick = this.handleClick.bind(this);
    const { onAddUser, onAddStaff, onAddClient, onHide, onGetJWT, onJWTExpired } = this.props;
    const { matters, practiceAreas, addedRecord, JWT, JWTExpired } = this.props;
    const { role } = this.state;

    return (
      <div>
        {!JWT && <GetJWTForm
                   onGetJWT={onGetJWT}
                   JWTExpired={JWTExpired}/>}
        {JWT && !role && 
          <RoleSelectForm
            handleClick={this.handleClick}/>}
        {JWT && role === 'Client' && 
          <AddClientForm
            onAddUser={onAddUser}
            onAddClient={onAddClient}
            matters={matters}
            onJWTExpired={onJWTExpired}
            onHide={onHide}
            addedRecord={addedRecord}/>}
        {JWT && role === 'Staff' && 
          <AddStaffForm
            onAddUser={onAddUser}
            onAddStaff={onAddStaff}
            practiceAreas={practiceAreas}
            matters={matters}
            onJWTExpired={onJWTExpired}
            onHide={onHide}
            addedRecord={addedRecord}/>}
        {JWT && role === 'Public' && 
          <AddPublicUserForm
            onAddUser={onAddUser}
            onJWTExpired={onJWTExpired}
            onHide={onHide}
            addedRecord={addedRecord}/>}
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