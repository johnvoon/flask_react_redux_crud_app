import React, { Component, PropTypes } from 'react';
import GetJWTForm from './GetJWTForm';
import EditPostForm from './EditPostForm';

class EditPost extends Component {
  render() {
    const { post, staff, practiceAreas, onEdit, onHide, onGetJWT, onJWTExpired, JWT, JWTExpired } = this.props;
    
    return (
      <div>
        {!JWT && <GetJWTForm
                    onGetJWT={onGetJWT}
                    JWTExpired={JWTExpired}/>}
        {JWT && <EditPostForm
                    staff={staff}
                    practiceAreas={practiceAreas}
                    onJWTExpired={onJWTExpired}
                    onEdit={onEdit}
                    post={post}
                    onHide={onHide}/>}
      </div>
    );
  }
}

EditPost.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  onGetJWT: PropTypes.func.isRequired,  
  onJWTExpired: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired,
  practiceAreas: PropTypes.object.isRequired,
  JWT: PropTypes.string.isRequired,
  JWTExpired: PropTypes.bool.isRequired
};

export default EditPost;