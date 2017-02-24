import React, { Component, PropTypes } from 'react';
import GetJWTForm from 'Admin/GetJWTForm';
import EditMatterForm from './EditMatterForm';

const mapStateToProps = (state) => {
  const { authentication } = state;
  return {
    ...authentication
  };
};

class EditMatter extends Component {
  render() {
    const { JWT } = this.props;
    
    return (
      <div>
        {!JWT && <GetJWTForm/>}
        {JWT && <EditMatterForm/>}
      </div>
    );
  }
}

EditMatter.propTypes = {
  JWT: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  null
)(EditMatter)