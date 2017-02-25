import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { hideModal } from 'Admin/actions';
import StaticFormGroup from 'components/StaticFormGroup';
import Button from 'components/Button';

const mapStateToProps = (state) => {
  const { adminPages } = state;
  
  return {
    ...adminPages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHideModal: () => {
      dispatch(hideModal());
    }
  };
};

class ViewUser extends Component { 
  render() {
    const { selectedRecord, onHideModal } = this.props;
    const userCreated = moment(selectedRecord.created, "ddd DD-MMM-YYYY HH:mm:ss").format('DD/MM/YY HH:mm:ss');
    const userUpdated = moment(selectedRecord.updated, "ddd DD-MMM-YYYY HH:mm:ss").format('DD/MM/YY HH:mm:ss');

    return (
      <form>
        <div>
          <img src={selectedRecord.photo} alt="User photo"/>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Created"
              text={userCreated}/>
          </div>
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Updated"
              text={userUpdated}/>
          </div>
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Status"
              text={selectedRecord.active}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Role"
              text={selectedRecord.role}/>
          </div>
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Username"
              text={selectedRecord.username}/>
          </div>
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Email"
              text={selectedRecord.email}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Last Name"
              text={selectedRecord.lastName}/>
          </div>
          <div className="col-sm-4">
            <StaticFormGroup 
              label="First Name"
              text={selectedRecord.firstName}/>
          </div>
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Middle Name"
              text={selectedRecord.middleName}/>
          </div>
        </div>
        <StaticFormGroup 
          label="Phone Number"
          text={selectedRecord.phoneNumber}/>
        <StaticFormGroup 
          label="Full Address"
          text={selectedRecord.fullAddress}/>
        <div className="btn-toolbar">
          <Button
            customClassNames="btn-danger pull-right" 
            type="button" 
            handleClick={onHideModal()}>
            Close
          </Button>
        </div>
      </form>
    );
  }
}

ViewUser.propTypes = {
  initialize: PropTypes.object.isRequired,
  onEdit: PropTypes.object.isRequired,
  onHideModal: PropTypes.object.isRequired,
  handleSubmit: PropTypes.object.isRequired,
  pristine: PropTypes.object.isRequired,
  reset: PropTypes.object.isRequired,
  submitting: PropTypes.object.isRequired,
  selectedRecord: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewUser);