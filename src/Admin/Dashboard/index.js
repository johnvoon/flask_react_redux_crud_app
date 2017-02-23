import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

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

export default AdminDashboard;