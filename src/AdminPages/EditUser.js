import React, { Component, PropTypes } from 'react';
import GetJWTForm from './GetJWTForm';
import EditUserForm from './EditUserForm';

class EditUser extends Component {
  render() {
    const { user, practiceAreas, matters, staff, clients,
      onEdit, onHide, onGetJWT, onJWTExpired, JWT, JWTExpired } = this.props;
    
    return (
      <div>
        {!JWT && <GetJWTForm
                   onGetJWT={onGetJWT}
                   JWTExpired={JWTExpired}/>}
        {JWT && <EditUserForm
                  onJWTExpired={onJWTExpired}
                  onEdit={onEdit}
                  user={user}
                  staff={staff}
                  clients={clients}
                  practiceAreas={practiceAreas}
                  matters={matters}
                  onHide={onHide}/>}
      </div>
    );
  }
}

EditUser.propTypes = {
  user: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  onGetJWT: PropTypes.func.isRequired,
  onJWTExpired: PropTypes.func.isRequired,
  JWT: PropTypes.string.isRequired,
  JWTExpired: PropTypes.bool.isRequired
};

export default EditUser;