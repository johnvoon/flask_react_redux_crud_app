import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Headroom from 'react-headroom';
import MainNavbar from 'components/MainNavbar';
import Sidebar from 'components/Sidebar';
import { fetchCurrentUser } from 'Authentication/actions';
import { toggleSidebar, hideSidebar } from './actions';
import { VelocityTransitionGroup } from 'velocity-react';
import _ from 'lodash';

const mapStateToProps = (state) => {
  const { app, entities, authentication } = state;
  return {
    ...app,
    ...entities,
    ...authentication
  };
};

const mapDispatchToProps = (dispatch) => ({
  onFetchCurrentUser: () => {
    dispatch(fetchCurrentUser());
  },

  onToggleSidebar: () => {
    dispatch(toggleSidebar());
  },

  onHideSidebar: () => {
    dispatch(hideSidebar());
  }
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onFetchCurrentUser();
  }

  render() {
    const { currentUser, sidebarShowing,
      onToggleSidebar, onHideSidebar } = this.props;
    const links = [
      ["Home", "/", "index"],
      ["Practice Areas", "/practice-areas"],
      ["Blog", "/blog"],
      (_.isEmpty(currentUser) ? undefined : ["Admin Dashboard", "/admin"]),
      (_.isEmpty(currentUser) ? ["Login", "/login"] : ["Logout", "/logout"])
    ];

    return (
      <div className="root-container">
        <header>
          <Headroom
            style={{zIndex: '4'}}>
            <MainNavbar
              links={links}
              handleClick={onToggleSidebar}
              sidebarShowing={sidebarShowing}/>
          </Headroom>
        </header>
        <VelocityTransitionGroup
          enter={{animation: "fadeIn"}}
          leave={{animation: "fadeOut"}}>
          {sidebarShowing ? (
            <Sidebar
              links={links}
              handleHide={onHideSidebar}/>
          ) : null}
        </VelocityTransitionGroup>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  onFetchCurrentUser: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  currentUser: PropTypes.object.isRequired,
  sidebarShowing: PropTypes.bool.isRequired,
  onToggleSidebar: PropTypes.func.isRequired,
  onHideSidebar: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);
