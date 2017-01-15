import React, { Component, PropTypes } from 'react';

export default class Link extends Component {
  onClick(event) {
    const { dispatchEvent } = this.props;

    event.preventDefault();
    dispatchEvent(event);
  }

  render() {
    const clickEvent = this.onClick.bind(this);
    const { linkText, count } = this.props;

    return (
      <li 
        className="list-group-item">
        <a role="button" 
           href="#"
           onClick={clickEvent}>
          {linkText}
        </a>
          <span className="badge">{count}</span>
      </li>    
    );
  }
}

Link.propTypes = {
  dispatchEvent: PropTypes.func.isRequired,
  linkText: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
};
