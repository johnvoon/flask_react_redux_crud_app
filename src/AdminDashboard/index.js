import React, { Component, PropTypes } from 'react';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>
          Admin Dashboard
        </h1>
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  children: PropTypes.node.isRequired
};

export default AdminDashboard;