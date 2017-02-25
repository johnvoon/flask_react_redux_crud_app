import React, { Component, PropTypes } from 'react';

export default class ButtonBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, customClassNames, type, handleClick, disabled } = this.props;

    return (
      <div className="form-group">
        <button
          type={type}
          className={`btn btn-block text-uppercase ${customClassNames}`}
          onClick={handleClick}
          disabled={disabled ? disabled : false}>
          {children}
        </button>
      </div>
    );
  }
}

ButtonBlock.propTypes = {
  children: PropTypes.node.isRequired,
  customClassNames: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};