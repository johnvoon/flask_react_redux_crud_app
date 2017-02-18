import React, { Component } from 'react';
import { Link } from 'react-router';
import NavLink from './NavLink';
import classNames from 'classnames';

export default class MainNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkText: ''
    };
  }

  handleClick(linkText) {
    this.setState({
      currentLink: linkText
    })
  }

  renderLinks() {
    const { currentLink } = this.state;
    const { links } = this.props;

    return links.map((link, idx) => {
      const linkText = link[0];
      const endpoint = link[1];

      return (
        <NavLink 
          key={idx}
          linkText={linkText}
          endpoint={endpoint}
          index={endpoint === "/"}/>
      );
    });
  }

  render() {
    const { handleClick, showSidebar } = this.props;

    return (
      <nav className="navbar navbar-default navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/">
              <img src="http://localhost:8000/static/images/concept-logo.png"
                   className="img-fluid"
                   title="Concept Law Firm" 
                   alt="Concept Law Firm"/>
            </Link>
            <button 
              className={classNames(
                "navbar-toggle",
                "collapsed",
                "hamburger",
                "hamburger--elastic",
                {"is-active": showSidebar})}
              type="button"
              onClick={handleClick}>
              <span className="hamburger-box"> 
                <span className="hamburger-inner"/>
              </span>
            </button>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              {this.renderLinks()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
  

