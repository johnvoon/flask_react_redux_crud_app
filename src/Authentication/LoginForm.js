import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import { required, passwordRequired } from '../utils';
import InputFormGroup from '../components/InputFormGroup';
import ErrorAlert from '../components/ErrorAlert';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  _handleSubmit(data) {
    const { onFetchCurrentUser, onLoginUser, router, location } = this.props;
    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    onLoginUser(formData)
    .then(() => {
      location ? 
        router.push(location.query.next) : 
        router.push('/admin')
    })
    .then(() => onFetchCurrentUser())
    .catch(({response, message}) => {
      const { status, data } = response;
      if (status >= 400 && status < 500) {
        this.setState({
          errorMessage: data.message
        });
      } else {
        this.setState({
          errorMessage: message
        });
      }
    });
  }

  render() {
    const { submitting, handleSubmit } = this.props;
    const { errorMessage } = this.state;

    return (
      <form>
        <Field 
          name="identity"
          type="text"
          component={InputFormGroup}
          label="Email or Username"
          validate={required}/>
        <Field 
          name="password"
          type="password"
          component={InputFormGroup}
          label="Password"
          validate={passwordRequired}/>
        {errorMessage && <ErrorAlert message={errorMessage}/>}
        <div className="form-group">
          <button
            className="btn btn-primary btn-block text-uppercase"
            type="submit"
            disabled={submitting}
            onClick={handleSubmit(data => this._handleSubmit(data))}>
            <span className="lock"/>
            Log In
          </button>            
        </div>
        <p className="small">By clicking Log In you agree to our <Link to="/terms">Terms of Use</Link> and <Link to="/privacy">Privacy Statement</Link></p>
        <Link 
          to="/request-password-reset" 
          className="small">
          I forgot my password
        </Link>
      </form>
    );
  }  
}

export default withRouter(
  reduxForm({
    form: 'LoginForm'
  })(LoginForm)
);