import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class NavTab extends Component {
  render() {
    const { isActive, text, handleClick } = this.props;

    return (
      <li role="navigation" className={classNames(
        {"active": isActive}
      )}>
        <a
          onClick={handleClick}
          >{text}</a>
      </li>
    );    
  }
}

NavTab.propTypes = {
  text: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};
