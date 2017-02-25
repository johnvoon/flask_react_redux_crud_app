import React, { Component, PropTypes } from 'react';

export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, customClassNames, type, handleClick, disabled } = this.props;

    return (
      <button
        type={type}
        className={`btn text-uppercase ${customClassNames}`}
        onClick={handleClick}
        disabled={disabled ? disabled : false}>
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  customClassNames: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};