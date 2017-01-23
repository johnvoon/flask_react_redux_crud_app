import React, { Component, PropTypes } from 'react';
import GetJWTForm from './GetJWTForm';
import AddUserForm from './AddUserForm';

export default class AddUser extends Component {
  render() {
    const { onAdd, onHide, onGetJWT, onJWTExpired } = this.props;
    const { JWT, JWTExpired } = this.props;
    
    return (
      <div>
        {!JWT && <GetJWTForm 
                   onHide={onHide}
                   onGetJWT={onGetJWT}
                   JWTExpired={JWTExpired}/>}
        {JWT && <AddUserForm
                    onAdd={onAdd}
                    onJWTExpired={onJWTExpired}
                    onHide={onHide}/>}
      </div>
    );
  }
}

AddUser.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  getJWT: PropTypes.func.isRequired,
  JWT: PropTypes.string.isRequired
};