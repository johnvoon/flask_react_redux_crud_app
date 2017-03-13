import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class AdminCard extends Component {
  render() {
    const { text, slug, count } = this.props;

    return (
      <div className="admin-card col-lg-3 col-md-6 col-sm-6">
        <Link to={`/admin/${slug}`}>
          <div className={`panel bg-${slug}`}>
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-3">
                  <span className={slug}/>
                </div>
                <div className="col-xs-9 text-right">
                  <h2>{count}</h2>
                  <p>{text}</p>
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
  text: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired
};