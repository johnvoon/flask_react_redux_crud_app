import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Sidebar extends Component {
  renderLinks() {
    const { links } = this.props;
    return links.map((link, idx) => {
      const linkText = link[0];
      const endpoint = link[1];
      
      return (
        <Link
          key={idx}
          className="list-group-item"
          to={endpoint}
          onClick={window.location.reload}>
          {linkText}
        </Link>
      );
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