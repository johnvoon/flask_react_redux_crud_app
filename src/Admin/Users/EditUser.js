import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import GetJWTForm from 'Admin/GetJWTForm';
import EditUserForm from './EditUserForm';

const mapStateToProps = (state) => {
  const { authentication } = state;
  return {
    ...authentication
  };
};

class EditUser extends Component {
  render() {
    return (
      <div>
        {!JWT && <GetJWTForm/>}
        {JWT && <EditUserForm/>}
      </div>
    );
  }
}

EditUser.propTypes = {
  JWT: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  null
)(EditUser);