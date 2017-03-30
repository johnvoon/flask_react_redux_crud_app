import React, { Component, PropTypes } from 'react';

export default class Link extends Component {
  render() {
    const { linkText, count, handleClick } = this.props;

    return (
      <a 
        className="list-group-item"
        onClick={handleClick}>
        {linkText}
        {count ? <span className="badge">{count}</span> : null}
      </a>
    );
  }
}

Link.propTypes = {
  handleClick: PropTypes.func.isRequired,
  linkText: PropTypes.string.isRequired,
  count: PropTypes.number
};
