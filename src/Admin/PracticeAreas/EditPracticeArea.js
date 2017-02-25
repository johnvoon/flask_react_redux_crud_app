import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import GetJWTForm from 'Admin/GetJWTForm';
import EditPracticeAreaForm from './EditPracticeAreaForm';

const mapStateToProps = (state) => {
  const { authentication } = state;
  return {
    ...authentication
  };
};

class EditPracticeArea extends Component {
  render() {
    const { JWT } = this.props;
    
    return (
      <div>
        {!JWT && <GetJWTForm/>}
        {JWT && <EditPracticeAreaForm/>}
      </div>
    );
  }
}

EditPracticeArea.propTypes = {
  JWT: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  null
)(EditPracticeArea);