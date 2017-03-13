import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Headroom from 'react-headroom';
import MainNavbar from 'components/MainNavbar';
import Sidebar from 'components/Sidebar';
import { fetchCurrentUser } from 'Authentication/actions';
import { VelocityTransitionGroup } from 'velocity-react';
import _ from 'lodash';

const mapStateToProps = (state) => {
  const { entities, authentication } = state;
  return {
    ...entities,
    ...authentication
  };
};

const mapDispatchToProps = (dispatch) => ({
  onFetchCurrentUser: () => {
    dispatch(fetchCurrentUser());
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.onFetchCurrentUser();
  }

  handleClick() {
    this.setState({
      showSidebar: this.state.showSidebar ? false : true
    });
  }

  render() {
    const { showSidebar } = this.state;
    const { currentUser } = this.props;
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
              handleClick={this.handleClick}
              showSidebar={showSidebar}/>
          </Headroom>
        </header>
        <VelocityTransitionGroup
          enter={{animation: "fadeIn"}}
          leave={{animation: "fadeOut"}}>
          {showSidebar ? (
            <Sidebar
              links={links}/>
          ) : undefined}
        </VelocityTransitionGroup>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  onFetchCurrentUser: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  currentUser: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);
