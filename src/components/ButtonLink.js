import React, { Component } from 'react';
import { withRouter } from 'react-router';

class ButtonLink extends Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    const { router, endpoint, id } = this.props;
    router.push({
      pathname: endpoint,
      state: { id: id }
    })    
  }

  render() {
    this.handleClick = this.handleClick.bind(this);
    const { text, imgFilename, customClassNames } = this.props;

    return (
      <div className="form-group">
        <button
          type="button"
          className={`btn btn-block text-uppercase ${customClassNames}`}
          onClick={this.handleClick}
          style={{
            backgroundImage: `url('http://localhost:8000/static/images/2000/${imgFilename}.jpg')`
          }}>
          {text}
        </button>
      </div>
    );
  }
}

export default withRouter(ButtonLink);