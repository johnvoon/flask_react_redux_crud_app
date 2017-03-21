import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from  'redux-form';
import InputFormGroup from 'components/InputFormGroup';
import ErrorAlert from 'components/ErrorAlert';
import { required } from 'utils';
import { getJWT } from 'Authentication/actions';
import { hideModal } from './actions';
import ButtonToolbar from 'components/ButtonToolbar';

const mapStateToProps = (state) => {
  const { authentication } = state;
  
  return {
    ...authentication
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetJWT: (data) => {
      return dispatch(getJWT(data));
    },

    onHideModal: () => {
      dispatch(hideModal());
    }
  };
};

class GetJWTForm extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  _handleSubmit(data) {
    const { onGetJWT } = this.props;

    onGetJWT(data)
    .catch(({message, response}) => {
      const { status, data } = response;
      if (status === 401) {
        this.setState({errorMessage: data.description});
      } else {
        this.setState({errorMessage: message});
      }
    });
  }

  render() {
    const { onHideModal, JWTExpired, handleSubmit, pristine, reset, submitting } = this.props;
    const { errorMessage } = this.state;
    JWTExpired && this.setState(
      {errorMessage: "Sorry your authentication token has expired. Please re-enter your username and password"}
    );
    
    return (
      <form>
        <p>Please enter your username and password:</p>
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
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
          </div>       
        </div>
        {errorMessage && <ErrorAlert message={errorMessage}/>}
        <ButtonToolbar
          onHideModal={onHideModal}
          pristine={pristine}
          submitting={submitting}
          reset={reset}
          handleSubmit={handleSubmit(data => this._handleSubmit(data))}/>
      </form>
    );
  }
}

GetJWTForm.propTypes = {
  onGetJWT: PropTypes.func.isRequired,
  onHideModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  JWTExpired: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'GetJWTForm'
})(GetJWTForm));
