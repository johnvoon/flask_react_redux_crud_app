import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Sidebar extends Component {
  renderLinks() {
    const { links, handleHide } = this.props;
    
    return links.map((link, idx) => {
      if (link ) {
        const linkText = link[0];
        const slug = link[1];
        
        return (
          <Link
            key={idx}
            className="list-group-item"
            to={slug}
            onClick={handleHide}>
            {linkText}
          </Link>
        );
      } else return null
    });
  }

  render() {
    return (
      <div className="sidebar pull-right">
        <div className="list-group">
          <div className="list-group-item">
            <h4 className="list-group-item-heading">
              Menu
            </h4>
          </div>
          {this.renderLinks()}
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  links: PropTypes.array.isRequired,
};