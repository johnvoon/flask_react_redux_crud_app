import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import GetJWTForm from 'Admin/GetJWTForm';
import DeletePostForm from './DeletePostForm';

const mapStateToProps = (state) => {
  const { authentication } = state;
  return {
    ...authentication
  };
};

class DeletePost extends Component {
  render() {
    const { JWT } = this.props;
    
    return (
      <div>
        {!JWT && <GetJWTForm/>}
        {JWT && <DeletePostForm/>}
      </div>
    );
  }
}

DeletePost.propTypes = {
  JWT: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps, 
  null
)(DeletePost);