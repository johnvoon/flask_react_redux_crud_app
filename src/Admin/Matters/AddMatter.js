import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import GetJWTForm from 'Admin/GetJWTForm';
import AddMatterForm from './AddMatterForm';

const mapStateToProps = (state) => {
  const { authentication } = state;
  return {
    ...authentication
  };
};

export default class AddMatter extends Component {
  render() {
    const { JWT } = this.props;
    
    return (
      <div>
        {!JWT && <GetJWTForm/>}
        {JWT && <AddMatterForm/>}
      </div>
    );
  }
}

AddMatter.propTypes = {
  JWT: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMatter);