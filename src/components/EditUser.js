import React, { Component, PropTypes } from 'react';
import GetJWTForm from './GetJWTForm';
import EditUserForm from './EditUserForm';

class EditUser extends Component {
  render() {
    const { user, onEdit, onHide, getJWT, token } = this.props;
    
    return (
      <div>
        {!token && <GetJWTForm getJWT={getJWT}/>}
        {token && <EditUserForm
                    onEdit={onEdit}
                    user={user}
                    onHide={onHide}/>}
      </div>
    );
  }
}

EditUser.propTypes = {
  user: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  getJWT: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default EditUser;