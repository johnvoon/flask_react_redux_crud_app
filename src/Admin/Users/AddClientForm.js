import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, FormSection, formValueSelector } from  'redux-form';
import UserAccountDetailsForm from'./UserAccountDetailsForm';
import UserParticularsForm from './UserParticularsForm';
import UserAddressForm from './UserAddressForm';
import ClientDetailsForm from './ClientDetailsForm';
import ErrorAlert from 'components/ErrorAlert';
import NavTab from 'components/NavTab';
import AsyncValidationFormGroup from 'components/AsyncValidationFormGroup';
import GeosuggestFormGroup from 'components/GeosuggestFormGroup';
import InputFormGroup from 'components/InputFormGroup';
import SelectFormGroup from 'components/SelectFormGroup';
import TextAreaFormGroup from 'components/TextAreaFormGroup';
import MultiselectFormGroup from 'components/MultiselectFormGroup';
import DatePickerFormGroup from 'components/DatePickerFormGroup';
import { required, email, username, maxLength, 
  asyncValidateUserIdentity as asyncValidate, 
  createOptionsList } from 'utils';
import { hideModal, loadFormData as load } from 'Admin/actions';
import { selectAddClientForm } form 'Admin/selectors';
import { removeJWT } from 'Authentication/actions';
import { addUser } from 'Entities/UsersActions';
import { addClient } from 'Entities/ClientActions';
import _ from 'lodash';

const mapStateToProps = (state) => {
  const { entities, authentication } = state;
  return {
    passwordValue: selectAddClientForm(state, 'password'),
    mattersValue: selectAddClientForm(state, 'matters');
    initialValues: state.adminPages.formData,
    ...entities,
    ...authentication
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFormData: load,

    onAddUser: (JWT, content) => {
      return dispatch(addUser(JWT, content));
    },

    onAddClient: (JWT, content) => {
      return dispatch(addClient(JWT, content));
    },

    onJWTExpired: () => {
      dispatch(removeJWT());
    },

    onHideModal: () => {
      dispatch(hideModal());
    }
  };
};

class AddClientForm extends Component { 
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.changeMatterFieldValue = this.changeMatterFieldValue.bind(this);
    this.state = {
      errorMessage: '',
      currentTab: 'Account Details'
    };
  }

  _handleSubmit(data) {
    const { onAddUser, onAddClient, onHideModal, onJWTExpired, JWT } = this.props;
    const userEntityFields = [
      'email', 'username', 'password', 'lastName', 'firstName', 'middleName', 
      'phoneNumber', 'unitNumber', 'streetAddress', 'suburb', 'postcode',
      'state', 'country', 'photo'
    ];
    const clientEntityFields = ['matters'];
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };
    let userFormData = new FormData();
    let clientFormData = new FormData();
    Object.keys(data).forEach((key) => {
      userEntityFields.includes(key) &&
      userFormData.append(key, data[key]);
      clientEntityFields.includes(key) &&
      clientFormData.append(key, data[key]);
    });
    userFormData.append('role', 'client');

    onAddUser(config, userFormData)
    .then(({addedRecordId}) => {
      clientFormData.append('userId', addedRecordId);
      onAddClient(config, clientFormData);
    })
    .then(() => onHideModal())
    .catch(({response, message}) => {
      const { status, data } = response;
      if (status === 401) {
        onJWTExpired();
      } else if (status === 404) {
        this.setState({
          errorMessage: data.message
        })
      } else {
        this.setState({
          errorMessage: message
        })
      }
    });
  }

  fillInAddress(value) {
    const { loadFormData } = this.props;
    const { gmaps } = value;
    const { address_components } = gmaps;
    const addressComponents = {}
    address_components.forEach((component) => {
      const addressType = component.types[0];
      const value = component.long_name;
      addressComponents[addressType] = value
    });
    const initData = {
      unitNumber: _.get(addressComponents, 'subpremise', ''),
      streetAddress: _.get(addressComponents, 'street_number', '') + ' ' + _.get(addressComponents, 'route', ''),
      suburb: _.get(addressComponents, 'locality', ''),
      postcode: _.get(addressComponents, 'postal_code', ''),
      state: _.get(addressComponents, 'administrative_area_level_1', ''),
      country: _.get(addressComponents, 'country', '')
    };

    loadFormData(initData);
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({
      currentTab: event.target.textContent
    });    
  }

  changeMatterFieldValue(matterId) {
    matterId = String(matterId)
    const { mattersValue, change } = this.props;
    change('matters', !mattersValue ? matterId : mattersValue.concat(`,${matterId}`))
  }

  render() {
    const { passwordValue, handleSubmit, pristine, reset, submitting } = this.props;
    const { errorMessage, currentTab } = this.state;
    const matterOptions = createOptionsList(matters, "description");
    const tabLabels = ["Account Details", "Particulars", "Address", "Client Details"];
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
        <ClientDetailsForm
          isDisplayed={currentTab === tabLabels[3]}
          changeMatterFieldValue={this.changeMatterFieldValue}/>
        {errorMessage && <ErrorAlert message={errorMessage}/>}
        <div className="btn-toolbar">
          <Button
            customClassNames="btn-danger pull-right" 
            type="button"
            handleClick={onHideModal()}>
            Close
          </Button>
          <Button 
            customClassNames="btn-danger pull-right" 
            type="button" 
            disabled={pristine || submitting} 
            handleClick={reset}>
            Reset
          </Button>
          <Button 
            customClassNames="btn btn-primary pull-right" 
            type="submit"
            disabled={submitting}
            handleClick={handleSubmit(data => this._handleSubmit(data))}>
            Save
          </Button>
        </div>
      </div>
    );
  }
}

AddClientForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onHideModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form:  'AddClientForm',
  asyncValidate,
  asyncBlurFields: ['username', 'email'],
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(AddClientForm))
