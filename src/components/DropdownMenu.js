import React, { Component } from 'react';
import { VelocityTransitionGroup } from 'velocity-react';

export default class DropdownMenu extends Component {
  render() {
    const { handleClick, heading, showMenu, showAllLink, links } = this.props;

    return (
      <div className="form-group">
        <button
          className="btn btn-primary btn-block text-uppercase"
          type="button"
          onClick={handleClick}>
          <span className="pull-left">{heading}</span>
          <span className="angle-down pull-right"></span>
        </button>
        <VelocityTransitionGroup
          enter={{animation: "slideDown"}}
          leave={{animation: "slideUp"}}>
          {showMenu ? (
            <div className="list-group">
              {showAllLink}
              {links}
            </div>
          ) : undefined}
        </VelocityTransitionGroup>
      </div>
    );
  }
}
