import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { slugify, camelize } from 'utils';
import AdminCard from 'components/AdminCard';
import { fetchAdminCount } from './actions';

const mapStateToProps = (state) => {
  const { admin } = state;

  return {
    ...admin
  };
};

const mapDispatchToProps = (dispatch) => ({
  onFetchAdminCount: () => {
    dispatch(fetchAdminCount());
  }
});

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onFetchAdminCount();
  }

  render() {
    const { adminData } = this.props;
    const entities = ["Posts", "Users", "Matters", "Practice Areas"];
    const adminCards = entities.map((entity, idx) => {
      return (
        <AdminCard
          key={idx}
          text={entity}
          slug={slugify(entity)}
          count={adminData[camelize(entity)]}/>
      );
    });

    return (
      <main className="container-fluid">
        <h1>
          Admin Dashboard
        </h1>
        {adminCards}
      </main>
    );
  }
}

AdminDashboard.propTypes = {
  onFetchAdminCount: PropTypes.func.isRequired,
  adminData: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDashboard);