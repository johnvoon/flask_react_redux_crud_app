import React, { Component, PropTypes } from 'react';

export default class Link extends Component {
  onClick(linkText) {
    const { dispatchEvent } = this.props;

    event.preventDefault();
    dispatchEvent(linkText);
  }

  render() {
    const clickEvent = this.onClick.bind(this);
    const { linkText, count } = this.props;

    return (
      <a 
        className="list-group-item"
        onClick={() => clickEvent(linkText)}>
        {linkText}
        {count ? <span className="badge">{count}</span> : null}
      </a>
    );
  }
}

Link.propTypes = {
  dispatchEvent: PropTypes.func.isRequired,
  linkText: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
};
