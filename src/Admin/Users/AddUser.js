import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import GetJWTForm from 'Admin/GetJWTForm';
import RoleSelectForm from './RoleSelectForm';
import AddStaffForm from './AddStaffForm';
import AddClientForm from './AddClientForm';
import AddPublicUserForm from './AddPublicUserForm';

const mapStateToProps = (state) => {
  const { authentication } = state;
  return {
    ...authentication
  };
};

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      role: ''
    };
  }

  handleClick(event) {
    this.setState({
      role: event.target.textContent
    });
  }

  render() {
    const { role } = this.state;
    const { JWT } = this.props;

    return (
      <div>
        {!JWT && <GetJWTForm/>}
        {JWT && !role && 
          <RoleSelectForm
            handleClick={this.handleClick}/>}
        {JWT && role === 'Client' && 
          <AddClientForm/>}
        {JWT && role === 'Staff' && 
          <AddStaffForm/>}
        {JWT && role === 'Public' && 
          <AddPublicUserForm/>}
      </div>
    );
  }
}

AddUser.propTypes = {
  onAddUser: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  getJWT: PropTypes.func.isRequired,
  JWT: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  null
)(AddUser);