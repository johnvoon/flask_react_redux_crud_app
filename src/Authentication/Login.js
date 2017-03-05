import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import LoginForm from './LoginForm';

class Login extends Component {
  render() {
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
            backgroundImage: `url(${API_URL}/static/images/2000/coffee-smartphone.jpg)`,
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
          <LoginForm/>
        </div>
      </main>
    );
  }
}

Login.propTypes = {
  onFetchCurrentUser: PropTypes.func.isRequired
};

export default Login;