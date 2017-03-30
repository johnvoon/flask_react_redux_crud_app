import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { VelocityComponent } from 'velocity-react';
import Waypoint from 'react-waypoint';

class ButtonLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleClick() {
    const { router, slug, id } = this.props;
    router.push({
      pathname: slug,
      state: { id: id }
    });  
  }

  handleEnter() {
    this.setState({
      showComponent: true
    });
  }

  render() {
    const { text, imgSrc, customClassNames } = this.props;

    return (
      <VelocityComponent
        animation={{opacity: this.state.showComponent ? 1 : 0}}
        duration={700}>
        <Waypoint 
          onEnter={this.handleEnter}>
          <div className="form-group">
            <button
              type="button"
              className={`btn btn-block text-uppercase ${customClassNames}`}
              onClick={this.handleClick}
              style={{
                backgroundImage: `url(${imgSrc})`
              }}>
              {text}
            </button>
          </div>
        </Waypoint>
      </VelocityComponent>
    );
  }
}

export default withRouter(ButtonLink);

ButtonLink.propTypes = {
  router: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  customClassNames: PropTypes.string.isRequired,
};