import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import { required, passwordRequired } from 'utils';
import { loginUser, fetchCurrentUser } from './actions';
import InputFormGroup from 'components/InputFormGroup';
import ErrorAlert from 'components/ErrorAlert';
import ButtonBlock from 'components/ButtonBlock';

const mapDispatchToProps = (dispatch) => ({
  onLoginUser: (formData) => {
    return dispatch(loginUser(formData));
  },
  onFetchCurrentUser: () => {
    return dispatch(fetchCurrentUser());
  }
});

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  _handleSubmit(data) {
    const { onFetchCurrentUser, onLoginUser, 
      router, location } = this.props;
    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    onLoginUser(formData)
    .then(() => onFetchCurrentUser())
    .then(({currentUser}) => {
      if (location.query.next) {
        router.push(location.query.next);
      } else if (currentUser.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/portal');
      }
    })
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
        <ButtonBlock
          customClassNames="btn-primary"
          type="submit"
          disabled={submitting}
          handleClick={handleSubmit(data => this._handleSubmit(data))}>
          <span className="lock"/>
          Log In
        </ButtonBlock>
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
  connect(
    null,
    mapDispatchToProps
  )(reduxForm({
    form: 'LoginForm'
  })(LoginForm))
);

LoginForm.propTypes = {
  onFetchCurrentUser: PropTypes.func.isRequired,
  onLoginUser: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired, 
  location: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
};