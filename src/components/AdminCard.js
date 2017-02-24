import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class AdminCard extends Component {
  render() {
    const { text, endpoint, count, iconClass, customClassNames } = this.props;

    return (
      <div className="col-lg-3 col-md-6">
        <Link to={`/admin/${endpoint}`}>
          <div className={`panel ${customClassNames}`}>
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-3">
                  <span className={iconClass}/>
                </div>
                <div className="col-xs-9 text-right">
                  <div>{count}</div>
                  <div>{text}</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

AdminCard.propTypes = {
  dispatchEvent: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};