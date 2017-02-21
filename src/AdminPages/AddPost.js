import React, { Component, PropTypes } from 'react';
import GetJWTForm from './GetJWTForm';
import AddPostForm from './AddPostForm';

export default class AddPost extends Component {
  render() {
    const { onAdd, onHide, onGetJWT, onJWTExpired } = this.props;
    const { staff, practiceAreas, JWT, JWTExpired } = this.props;
    console.log(JWT);
    
    return (
      <div>
        {!JWT && (
          <GetJWTForm
            onGetJWT={onGetJWT}
            JWTExpired={JWTExpired}/>
        )}
        {JWT && (
          <AddPostForm
            staff={staff}
            practiceAreas={practiceAreas}
            onJWTExpired={onJWTExpired}
            onAdd={onAdd}
            onHide={onHide}/>
        )}
      </div>
    );
  }
}

AddPost.propTypes = {
  staff: PropTypes.object.isRequired,
  practiceAreas: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  onGetJWT: PropTypes.func.isRequired,
  JWT: PropTypes.string.isRequired
};