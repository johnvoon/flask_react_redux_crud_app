import React, { Component, PropTypes } from 'react';
import GetJWTForm from './GetJWTForm';
import DeleteRecordForm from './DeleteRecordForm';

export default class DeleteRecord extends Component {
  render() {
    const { onDelete, onHide, onGetJWT, onJWTExpired, JWT, JWTExpired } = this.props;
    
    return (
      <div>
        {!JWT && <GetJWTForm 
                   onGetJWT={onGetJWT}
                   JWTExpired={JWTExpired}/>}
        {JWT && <DeleteRecordForm
                    onDelete={onDelete}
                    onHide={onHide}
                    onJWTExpired={onJWTExpired}/>}
      </div>
    );
  }
}

DeleteRecord.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  onGetJWT: PropTypes.func.isRequired,
  JWT: PropTypes.string.isRequired
};
