import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import sr from 'components/ScrollReveal';

class ButtonLink extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const config = {
      duration: 1000,
      scale: 1,
      distance: 0
    };
    
    sr.reveal(this.button, config, 100);
  }

  handleClick() {
    const { router, endpoint, id } = this.props;
    router.push({
      pathname: endpoint,
      state: { id: id }
    });  
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
            backgroundImage: `url(${API_URL}/static/images/2000/${imgFilename}.jpg)`
          }}
          ref={button => this.button = button}>
          {text}
        </button>
      </div>
    );
  }
}

export default withRouter(ButtonLink);

ButtonLink.propTypes = {
  router: PropTypes.object.isRequired,
  endpoint: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  imgFilename: PropTypes.string.isRequired,
  customClassNames: PropTypes.string.isRequired,
};