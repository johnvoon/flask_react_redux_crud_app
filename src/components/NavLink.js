import React, { Component, PropTypes } from 'react';
import { IndexLink, Link, withRouter } from 'react-router';
import classNames from 'classnames';

class NavLink extends Component {
  render() {
    const { router, linkText, slug, index } = this.props;
    const isActive = router.isActive(slug, true);

    return (
      <li className={classNames({"active": isActive})}>
        {index ? (
          <IndexLink to={slug}>
            {linkText}
          </IndexLink>
        ) : (
          <Link to={slug}>{linkText}</Link>
        )}
      </li>
    );    
  }
}

NavLink.propTypes = {
  linkText: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  router: PropTypes.object.isRequired,
  index: PropTypes.bool.isRequired
};

export default withRouter(NavLink);