import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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

class ViewPracticeArea extends Component { 
  render() {
    const { posts, matters, staff, 
      selectedRecord, onHideModal } = this.props;
    const postsList = selectedRecord.posts.length > 0 ? 
      selectedRecord.posts.map(id => {
        return (
          <p key={id}>[{id}] {posts[id].title}</p>
        );
      }) : "None";
    const mattersList = selectedRecord.matters.length > 0 ?
      selectedRecord.matters.map(id => {
        return (
          <p key={id}>{matters[id].description}</p>
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
          label="Image">
          <img src={selectedRecord.thumbnailSrc} alt="Practice area background image"/>
        </StaticFormGroup>
        <StaticFormGroup 
          label="Area">
          {selectedRecord.area}
        </StaticFormGroup>
        <StaticFormGroup 
          label={`Posts (Count: ${postsList.length})`}>
          {postsList}
        </StaticFormGroup>
        <StaticFormGroup 
          label={`Matters (Count: ${mattersList.length})`}>
          {mattersList}
        </StaticFormGroup>
        <StaticFormGroup 
          label={`Staff (Count: ${staffList.length})`}>
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

ViewPracticeArea.propTypes = {
  onHideModal: PropTypes.object.isRequired,
  selectedRecord: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  matters: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPracticeArea);