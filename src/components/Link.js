import React, { Component } from 'react';

export default class Link extends Component {
  onClick(event) {
    const { filterByArea, data } = this.props;

    event.preventDefault();
    filterByArea(data);
  }

  render() {
    const clickEvent = this.onClick.bind(this);
    const { linkText, count } = this.props;

    return (
      <li 
        className="list-group-item">
        <a role="button" 
           href='#'
           onClick={clickEvent}>
          {linkText}
        </a>
          <span className="badge">{count}</span>
      </li>    
    );
  }
}
