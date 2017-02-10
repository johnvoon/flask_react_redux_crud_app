import React, { Component } from 'react';
import classNames from 'classnames';
// Parent: '../HomePage/index'

export default class Hero extends Component {
  render() {
    const { index, currentIndex, prevIndex, heroClass, buttonText } = this.props;

    return (
      <div
        className="jumbotron"
        style={{
          backgroundImage: `url(http://localhost:8000/static/images/2000/${heroClass}.jpg)`,
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed'
        }}>
        <button type="button" className={`btn btn-primary btn-${heroClass}`}>
          {buttonText}
        </button>
      </div>
    );
  }
}
