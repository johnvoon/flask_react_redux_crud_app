import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logoutUser, fetchCurrentUser } from './actions';


const mapDispatchToProps = (dispatch) => ({
  onLogoutUser: () => {
    return dispatch(logoutUser());
  },
  onFetchCurrentUser: () => {
    return dispatch(fetchCurrentUser());
  }
});

class Logout extends Component {
  componentDidMount() {
    this.props.onLogoutUser()
    .then(() => this.props.onFetchCurrentUser())
    .then(() => this.props.router.push('/'))
  }

  render() {
    return null;
  }
}

Logout.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  staff: PropTypes.object.isRequired,
  practiceAreas: PropTypes.object.isRequired
};

export default withRouter(
  connect(
    null, 
    mapDispatchToProps
  )(Logout)
);
