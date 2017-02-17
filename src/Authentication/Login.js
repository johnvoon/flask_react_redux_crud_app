import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { loginUser } from './actions';
import { fetchCurrentUser } from './actions';
import LoginForm from './LoginForm';

const mapDispatchToProps = (dispatch) => ({
  onLoginUser: (formData) => {
    return dispatch(loginUser(formData));
  },
  onFetchCurrentUser: () => {
    return dispatch(fetchCurrentUser());
  }
});

class Login extends Component {
  render() {
    const { onFetchCurrentUser, onLoginUser } = this.props;

    return (
      <main>
        <Helmet
          title="Log in"
          meta={[
            { name: 'description', content: "Log in to your portal." }
          ]}/>
        <div 
          className="jumbotron"
          style={{
            backgroundImage: "url('http://localhost:8000/static/images/2000/coffee-smartphone.jpg')",
            backgroundPosition: 'top center',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed'
          }}>
          <div className="container">
            <h1 className="text-uppercase">Log In</h1>
          </div>
        </div>
        <div className="login">
          <p>Log in to post a comment or view your portal</p>
          <LoginForm
            onLoginUser={onLoginUser}
            onFetchCurrentUser={onFetchCurrentUser}/>
        </div>
      </main>
    );
  }
}

Login.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  postAuthors: PropTypes.object.isRequired,
  practiceAreas: PropTypes.object.isRequired
};

export default connect(
  null, 
  mapDispatchToProps
)(Login);
