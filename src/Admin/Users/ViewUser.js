import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
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
  constructor(props) {
    super(props);
    this.renderStaffInfo = this.renderStaffInfo.bind(this);
    this.renderClientInfo = this.renderClientInfo.bind(this);
  }

  renderStaffInfo() {
    const { selectedRecord, staffUsers, 
      matters, posts, practiceAreas } = this.props;
    const selectedStaff = staffUsers[selectedRecord.id];
    const mattersHandledIds = _.get(selectedStaff, "mattersHandled", []);
    const postsAuthoredIds = _.get(selectedStaff, "postsAuthored", []);
    const practiceAreaIds = _.get(selectedStaff, "practiceAreas", []);
    const position = _.get(selectedStaff, "position", "");
    const dateJoined = moment(
      _.get(selectedStaff, "dateJoined", ""), 
      "ddd DD-MMM-YYYY HH:mm:ss").format('DD/MM/YYYY');
    const postsAuthoredList = postsAuthoredIds.length > 0 ? 
      postsAuthoredIds.map(id => {
        return (
          <p key={id}>[{id}] {posts[id].title}</p>
        );
      }) : "None";
    const mattersHandledList = mattersHandledIds.length > 0 ? 
      mattersHandledIds.map(id => {
        return (
          <p key={id}>{matters[id].description}</p>
        );
      }) : "None";
    const practiceAreasList = practiceAreaIds.length > 0 ? 
      practiceAreaIds.map(id => {
        return (
          <p key={id}>[{id}] {practiceAreas[id].area}</p>
        );
      }) : "None";

    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
            <StaticFormGroup
              label="Date Joined">
              {dateJoined}
            </StaticFormGroup>
          </div>
          <div className="col-sm-6">
            <StaticFormGroup
              label="Position">
              {position}
            </StaticFormGroup>
          </div>
        </div>
        <StaticFormGroup
          label={`Posts Authored (Count: ${postsAuthoredIds.length})`}>
          {postsAuthoredList}
        </StaticFormGroup>
        <StaticFormGroup
          label={`Matters Handled (Count: ${mattersHandledIds.length})`}>
          {mattersHandledList}
        </StaticFormGroup>
        <StaticFormGroup
          label={`Practice Areas (Count: ${practiceAreaIds.length})`}>
          {practiceAreasList}
        </StaticFormGroup>
      </div>
    );
  }

  renderClientInfo() {
    const { selectedRecord, clientUsers, matters } = this.props;
    const selectedClient = clientUsers[selectedRecord.id];
    const matterIds = _.get(selectedClient, "matters", []);
    const mattersList = matterIds.length > 0 ? 
      matterIds.map(id => {
        return (
          <p key={id}>{matters[id].description}</p>
        );
      }) : "None";

    return (
      <StaticFormGroup
        label={`Matters (Count: ${matterIds.length})`}>
        {mattersList}
      </StaticFormGroup>
    );
  }

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
              label="Created">
              {userCreated}
            </StaticFormGroup>
          </div>
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Updated">
              {userUpdated}
            </StaticFormGroup>
          </div>
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Status">
              {selectedRecord.active}
            </StaticFormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Role">
              {selectedRecord.role}
            </StaticFormGroup>
          </div>
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Username">
              {selectedRecord.username}
            </StaticFormGroup>
          </div>
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Email">
              {selectedRecord.email}
            </StaticFormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Last Name">
              {selectedRecord.lastName}
            </StaticFormGroup>
          </div>
          <div className="col-sm-4">
            <StaticFormGroup 
              label="First Name">
              {selectedRecord.firstName}
            </StaticFormGroup>
          </div>
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Middle Name">
              {selectedRecord.middleName}
            </StaticFormGroup>
          </div>
        </div>
        <StaticFormGroup 
          label="Phone Number">
          {selectedRecord.phoneNumber}
        </StaticFormGroup>
        <StaticFormGroup 
          label="Full Address">
          {selectedRecord.fullAddress}
        </StaticFormGroup>
        {selectedRecord.role === "staff" && this.renderStaffInfo()}
        {selectedRecord.role === "client" && this.renderClientInfo()}
        <div className="btn-toolbar">
          <Button
            customClassNames="btn-danger pull-right" 
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
  staffUsers: PropTypes.func.isRequired,
  clientUsers: PropTypes.func.isRequired,
  matters: PropTypes.func.isRequired,
  posts: PropTypes.func.isRequired,
  practiceAreas: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewUser);