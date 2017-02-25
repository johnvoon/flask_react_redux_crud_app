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
    const { onLogoutUser, onFetchCurrentUser, 
      router } = this.props;

    onLogoutUser()
    .then(() => onFetchCurrentUser())
    .then(() => router.push('/'));
  }

  render() {
    return <div/>;
  }
}

Logout.propTypes = {
  onLogoutUser: PropTypes.func.isRequired,
  onFetchCurrentUser: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired
};

export default withRouter(
  connect(
    null, 
    mapDispatchToProps
  )(Logout)
);
