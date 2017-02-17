import React, { Component, PropTypes } from 'react';
import { IndexLink, Link, withRouter } from 'react-router';
import classNames from 'classnames';

class ListItemLink extends Component {
  render() {
    const { router, linkText, endpoint, index, onlyActiveOnIndex } = this.props;
    const isActive = router.isActive(endpoint, true);

    return (
      <li className={classNames({"active": isActive})}>
        {index ? (
          <IndexLink to={endpoint}>
            {linkText}
          </IndexLink>
        ) : (
          <Link to={endpoint}>{linkText}</Link>
        )}
      </li>
    );    
  }
}

ListItemLink.propTypes = {
  linkText: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default withRouter(ListItemLink)