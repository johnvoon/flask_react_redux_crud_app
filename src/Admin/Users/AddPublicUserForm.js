import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from  'redux-form';
import UserAccountDetailsForm from'./UserAccountDetailsForm';
import UserParticularsForm from './UserParticularsForm';
import UserAddressForm from './UserAddressForm';
import ErrorAlert from 'components/ErrorAlert';
import NavTab from 'components/NavTab';
import { asyncValidateUserIdentity as asyncValidate } from 'utils';
import { hideModal } from 'Admin/actions';
import { removeJWT } from 'Authentication/actions';
import { addUser } from 'Entities/UsersActions';
import { selectAddPublicUserForm } from 'Admin/selectors';
import _ from 'lodash';
import ButtonToolbar from 'components/ButtonToolbar';

const mapStateToProps = (state) => {
  const { entities, authentication } = state;
  return {
    passwordValue: selectAddPublicUserForm(state, 'password'),
    initialValues: state.adminPages.formData,
    ...entities,
    ...authentication
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddUser: (JWT, content) => {
      return dispatch(addUser(JWT, content));
    },

    onJWTExpired: () => {
      dispatch(removeJWT());
    },

    onHideModal: () => {
      dispatch(hideModal());
    }
  };
};

class AddPublicUserForm extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      currentTab: 'Account Details'
    };
  }

  _handleSubmit(data) {
    const { onAddUser, onHideModal, onJWTExpired, 
      JWT, destroy } = this.props;
    const userEntityFields = [
      'email', 'username', 'password', 'lastName', 'firstName', 'middleName', 
      'phoneNumber', 'unitNumber', 'streetAddress', 'suburb', 'postcode',
      'state', 'country', 'photo'
    ];
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };
    let userFormData = new FormData();
    Object.keys(data).forEach((key) => {
      userEntityFields.includes(key) &&
      userFormData.append(key, data[key]);
    });
    userFormData.append('role', 'public');

    onAddUser(config, userFormData)
    .then(() => {
      destroy();
      onHideModal();
    })
    .catch(({response, message}) => {
      const { status, data } = response;
      if (status === 401) {
        onJWTExpired();
      } else if (status === 404) {
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

  fillInAddress(value) {
    const { change } = this.props;
    const { gmaps } = value;
    const { address_components } = gmaps;
    const addressComponents = {};
    address_components.forEach((component) => {
      const addressType = component.types[0];
      const value = component.long_name;
      addressComponents[addressType] = value;
    });

    change('unitNumber', _.get(addressComponents, 'subpremise', ''));
    change('streetAddress', _.get(addressComponents, 'street_number', '') + ' ' + 
      _.get(addressComponents, 'route', ''));
    change('suburb', _.get(addressComponents, 'locality', ''));
    change('postcode', _.get(addressComponents, 'postal_code', ''));
    change('state', _.get(addressComponents, 'administrative_area_level_1', ''));
    change('country', _.get(addressComponents, 'country', ''));
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({
      currentTab: event.target.textContent
    });    
  }

  render() {
    this.handleClick = this.handleClick.bind(this);
    const { onHideModal, passwordValue, handleSubmit, pristine, reset, submitting } = this.props;
    const { errorMessage, currentTab } = this.state;
    const tabLabels = ["Account Details", "Particulars", "Address"];
    const navTabs = tabLabels.map((tab, idx) => {
      return (
        <NavTab
          key={idx}
          isActive={currentTab === tab}
          text={tab}
          handleClick={this.handleClick}/>
      );
    });    

    return (
      <div>
        <ul className="nav nav-tabs">
          {navTabs}
        </ul>
        <UserAccountDetailsForm
          isDisplayed={currentTab === tabLabels[0]}
          passwordValue={passwordValue}/>
        <UserParticularsForm
          isDisplayed={currentTab === tabLabels[1]}/>
        <UserAddressForm
          fillInAddress={(value) => this.fillInAddress(value)}
          isDisplayed={currentTab === tabLabels[2]}/>
        {errorMessage && <ErrorAlert message={errorMessage}/>}
        <ButtonToolbar
          onHideModal={onHideModal}
          pristine={pristine}
          submitting={submitting}
          reset={reset}
          handleSubmit={handleSubmit(data => this._handleSubmit(data))}/>
      </div>
    );
  }
}

AddPublicUserForm.propTypes = {
  onAddUser: PropTypes.func.isRequired,
  onJWTExpired: PropTypes.func.isRequired,
  onHideModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  JWT: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  destroy: PropTypes.func.isRequired,
  passwordValue: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form:  'AddPublicUserForm',
  asyncValidate,
  asyncBlurFields: ['username', 'email'],
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(AddPublicUserForm));
