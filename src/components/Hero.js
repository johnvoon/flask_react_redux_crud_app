import React, { Component } from 'react';
import classNames from 'classnames';
// Parent: '../HomePage/index'

export default class Hero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentIndex >= this.props.index) {
      this.setState({
        clicked: true
      })
    }
  }

  render() {
    const { clicked } = this.state;
    console.log(clicked);
    const { index, currentIndex, prevIndex, heroClass, buttonText } = this.props;

    return (
      <div
        className={classNames(
          "hero"
          // {"hero-left": clicked && (currentIndex > prevIndex) && (currentIndex !== index)},
          // {"hero-right": (currentIndex < prevIndex) && (currentIndex !== index)},
          // {"hero-visible": currentIndex === index}
        )}
        style={{
          backgroundImage: `url(http://localhost:8000/static/images/2000/${heroClass}.jpg)`,
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed'
        }}>
        <button type="button" className={`btn btn-primary btn-${heroClass}`}>
          {`Go to ${buttonText}`}
        </button>
      </div>
    );
  }
}
