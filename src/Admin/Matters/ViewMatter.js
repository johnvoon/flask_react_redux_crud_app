import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { hideModal } from 'Admin/actions';
import StaticFormGroup from 'components/StaticFormGroup';
import Button from 'components/Button';

const mapStateToProps = (state) => {
  const { entities, adminPages } = state;
  
  return {
    ...entities,
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
    const { selectedRecord, staff, clients, 
      practiceAreas, onHideModal } = this.props;
    const fileOpen = moment(selectedRecord.fileOpen, "ddd DD-MMM-YYYY HH:mm:ss").format('DD/MM/YY HH:mm:ss');
    const fileClose = moment(selectedRecord.fileClose, "ddd DD-MMM-YYYY HH:mm:ss").format('DD/MM/YY HH:mm:ss');
    const clientList = selectedRecord.clients.length > 0 ? 
      selectedRecord.clients.map(id => {
        return (
          <p key={id}>[{id}] {clients[id].name}</p>
        );
      }) : "None";
    const practiceAreaList = selectedRecord.practiceAreas.length > 0 ? 
      selectedRecord.practiceAreas.map(id => {
        return (
          <p key={id}>[{id}] {practiceAreas[id].area}</p>
        );
      }) : "None";
    const staffList = selectedRecord.staff.length > 0 ? 
      selectedRecord.staff.map(id => {
        return (
          <p key={id}>[{id}] {staff[id].name}</p>
        );
      }) : "None";

    return (
      <form>
        <StaticFormGroup 
          label="Description">
          {selectedRecord.description || ""}
        </StaticFormGroup>        
        <div className="row">
          <div className="col-sm-6">
            <StaticFormGroup 
              label="Active">
              {selectedRecord.active ? "Yes" : "No"}
            </StaticFormGroup>
          </div>
          <div className="col-sm-6">
            <StaticFormGroup 
              label="Costs on Account">
              ${selectedRecord.costsOnAccount}
            </StaticFormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <StaticFormGroup 
              label="File Open Date">
              {fileOpen}
            </StaticFormGroup>
          </div>
          <div className="col-sm-6">
            <StaticFormGroup 
              label="File Close Date">
              {fileClose}
            </StaticFormGroup>
          </div>
        </div>
        <StaticFormGroup 
          label="Client(s)">
          {clientList}
        </StaticFormGroup>
        <StaticFormGroup 
          label="Practice Area(s)">
          {practiceAreaList}
        </StaticFormGroup>
        <StaticFormGroup 
          label="Handling Staff">
          {staffList}
        </StaticFormGroup>
        <div className="btn-toolbar">
          <Button
            customClassNames="btn-default pull-right" 
            type="button" 
            handleClick={onHideModal}>
            Close
          </Button>
        </div>
      </form>
    );
  }
}

ViewUser.propTypes = {
  onHideModal: PropTypes.object.isRequired,
  selectedRecord: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired,
  clients: PropTypes.object.isRequired,
  practiceAreas: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewUser);