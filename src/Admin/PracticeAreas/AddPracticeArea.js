import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import GetJWTForm from 'Admin/GetJWTForm';
import AddPracticeAreaForm from './AddPracticeAreaForm';

const mapStateToProps = (state) => {
  const { authentication } = state;
  return {
    ...authentication
  };
};

export default class AddPracticeArea extends Component {
  render() {
    const { JWT } = this.props;
    
    return (
      <div>
        {!JWT && <GetJWTForm/>}
        {JWT && <AddPracticeAreaForm/>}
      </div>
    );
  }
}

AddPracticeArea.propTypes = {
  JWT: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPracticeArea);