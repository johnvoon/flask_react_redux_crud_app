import React, { Component, PropTypes } from 'react';
import GetJWTForm from './GetJWTForm';
import AddUserForm from './AddUserForm';

export default class AddUser extends Component {
  render() {
    const { onAdd, onHide, getJWT, token } = this.props;
    
    return (
      <div>
        {!token && <GetJWTForm getJWT={getJWT}/>}
        {token && <AddUserForm
                    onAdd={onAdd}
                    onHide={onHide}/>}
      </div>
    );
  }
}

AddUser.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  getJWT: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};