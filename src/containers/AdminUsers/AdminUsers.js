import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminPostsTable from '../components/AdminPostsTable';

class AdminPostsIndex extends Component {
  render() {
    return (
      <AdminHeader />
      <Table 
        key="id"
        columns={[
          { title: 'Registered', prop: 'registered' },
          { title: 'Name', prop: 'name'},
          { title: 'Activity', prop: 'activity'},
          { title: 'Sign-in Count', prop: 'signInCount'}
        ]}
      />
    );
  }
}
