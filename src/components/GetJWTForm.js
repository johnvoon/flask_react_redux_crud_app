import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from  'redux-form';
import InputFormGroup from './InputFormGroup';
import ErrorAlert from './ErrorAlert';
import { required } from '../utils';

class GetJWTForm extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  render() {
    const { onGetJWT, JWTExpired, handleSubmit, pristine, reset, submitting } = this.props;
    const { errorMessage } = this.state;
    if (JWTExpired) {
      this.setState(
        {errorMessage: "Sorry your authentication token has expired. Please re-enter your username and password"}
      )
    } 
    
    return (
      <form className="form-horizontal">
        <p>Please enter your username and password:</p>
        <Field 
          name="username"
          type="text"
          component={InputFormGroup}
          label="Username or Email"
          validate={required}/>
        <Field 
          name="password"
          type="password"
          component={InputFormGroup}
          label="Password"
          validate={required}/>
        {errorMessage && <ErrorAlert message={errorMessage}/>}
        <div className="btn-toolbar">
          <button 
            className="btn btn-primary pull-right" 
            type="button" 
            disabled={pristine || submitting} 
            onClick={reset}>
            Reset
          </button>
          <button
            className="btn btn-primary pull-right" 
            type="submit" 
            disabled={submitting}
            onClick={handleSubmit(data => {
              onGetJWT(data)
              .catch(({message, response}) => {
                const { status, data } = response;
                if (status === 401) {
                  this.setState({errorMessage: data.description})  
                } else {
                  this.setState({errorMessage: message})
                }
              });
            })}>
            Save
          </button>
        </div>
      </form>
    );
  }
}

GetJWTForm.propTypes = {
  onGetJWT: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'AddPost',
  destroyOnUnmount: false
})(GetJWTForm);