import React, { Component } from 'react';

export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, handleClick, customClassNames } = this.props;

    return (
      <div className="form-group">
        <button
          type="button"
          className={`btn btn-block text-uppercase ${customClassNames}`}
          onClick={handleClick}>
          {children}
        </button>
      </div>
    );
  }
}
