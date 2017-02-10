import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Headroom from 'react-headroom';
import MainNavbar from '../components/MainNavbar';
import PracticeAreaNavbar from '../components/PracticeAreaNavbar';
import PracticeAreaPanel from '../components/PracticeAreaPanel';
import Sidebar from '../components/Sidebar';
import { fetchPracticeAreas } from '../Entities/actions';
import { VelocityTransitionGroup } from 'velocity-react';

const mapStateToProps = (state) => {
  const { entities } = state;

  return {
    ...entities,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onFetchPracticeAreas: () => {
    dispatch(fetchPracticeAreas());
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false
    }
  }

  componentDidMount() {
    this.props.onFetchPracticeAreas();
  }

  handleClick() {
    this.setState({
      showSidebar: this.state.showSidebar ? false : true
    })
  }

  render() {
    this.handleClick = this.handleClick.bind(this);
    const { showSidebar } = this.state;
    const { practiceAreas } = this.props;
    const links = [
      ["Home", "/", "index"],
      ["Practice Areas", "/practice-areas"],
      ["People", "/people"],
      ["Blog", "/blog"],
      ["Contact", "/contact"],
      ["Login", "/login"]
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
  children: PropTypes.node.isRequired
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);
