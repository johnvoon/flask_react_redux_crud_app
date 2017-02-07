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

  componentWillMount() {
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
        <footer className="footer text-center">
          <div className="container">
            <ul className="list-inline">
              <li className="text-muted">Concept Law Firm &copy; 2017</li>
              <li><Link to="#">Contact</Link></li>
              <li><Link to="#">Privacy Policy</Link></li>
              <li><Link to="#">Terms of Service</Link></li>
            </ul>
          </div>
        </footer>  
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
