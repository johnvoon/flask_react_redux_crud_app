import React, { Component, PropTypes } from 'react';
import GetJWTForm from './GetJWTForm';
import AddPostForm from './AddPostForm';

export default class AddPost extends Component {
  render() {
    const { onAdd, onHide, onGetJWT, onJWTExpired, onDrop } = this.props;
    const { postAuthors, practiceAreas, JWT, JWTExpired } = this.props;

    return (
      <div>
        {!JWT && <GetJWTForm 
                   onGetJWT={onGetJWT}
                   JWTExpired={JWTExpired}/>}
        {JWT && <AddPostForm
                  postAuthors={postAuthors}
                  practiceAreas={practiceAreas}
                  onJWTExpired={onJWTExpired}
                  onAdd={onAdd}
                  onHide={onHide}
                  onDrop={onDrop}/>}
      </div>
    );
  }
}

AddPost.propTypes = {
  postAuthors: PropTypes.object.isRequired,
  practiceAreas: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  onGetJWT: PropTypes.func.isRequired,
  JWT: PropTypes.string.isRequired
};