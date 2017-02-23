import React, { Component, PropTypes } from 'react';
import GetJWTForm from 'Admin/GetJWTForm';
import EditPracticeArea from './EditPracticeArea';

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
        {JWT && <EditPracticeArea/>}
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