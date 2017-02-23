import React, { Component, PropTypes } from 'react';
import GetJWTForm from 'Admin/GetJWTForm';
import DeleteRecordForm from './DeleteRecordForm';

const mapStateToProps = (state) => {
  const { authentication } = state;
  return {
    ...authentication
  };
};

export default class DeletePost extends Component {
  render() {
    const { JWT } = this.props;
    
    return (
      <div>
        {!JWT && <GetJWTForm/>}
        {JWT && <DeleteRecordForm/>}
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