import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, FormSection, formValueSelector } from  'redux-form';
import UserAccountDetailsForm from'./UserAccountDetailsForm';
import UserParticularsForm from './UserParticularsForm';
import UserAddressForm from './UserAddressForm';
import ClientDetailsForm from './ClientDetailsForm';
import ErrorAlert from '../components/ErrorAlert';
import NavTab from '../components/NavTab';
import AsyncValidationFormGroup from '../components/AsyncValidationFormGroup';
import GeosuggestFormGroup from '../components/GeosuggestFormGroup';
import InputFormGroup from '../components/InputFormGroup';
import SelectFormGroup from '../components/SelectFormGroup';
import TextAreaFormGroup from '../components/TextAreaFormGroup';
import MultiselectFormGroup from '../components/MultiselectFormGroup';
import DatePickerFormGroup from '../components/DatePickerFormGroup';
import { required, email, username, maxLength, asyncValidateUserIdentity as asyncValidate, createOptionsList } from '../utils';
import { loadFormData as load } from './actions';
import _ from 'lodash';

class AddClientForm extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      currentTab: 'Account Details'
    };
  }

  _handleSubmit(data) {
    const { onAddUser, onAddClient, onHide, onJWTExpired, addedRecord } = this.props;
    const userEntityFields = [
      'email', 'username', 'password', 'lastName', 'firstName', 'middleName', 
      'phoneNumber', 'unitNumber', 'streetAddress', 'suburb', 'postcode',
      'state', 'country', 'photo'
    ];
    const clientEntityFields = ['matters'];
    let userFormData = new FormData();
    let clientFormData = new FormData();
    Object.keys(data).forEach((key) => {
      userEntityFields.includes(key) &&
      userFormData.append(key, data[key]);
      clientEntityFields.includes(key) &&
      clientFormData.append(key, data[key]);
    });
    userFormData.append('role', 'client');

    onAddUser(userFormData)
    .then(({addedRecordId}) => {
      clientFormData.append('userId', addedRecordId);
      onAddClient(clientFormData);
    })
    .then(() => onHide())
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
    this.handleClick = this.handleClick.bind(this);
    this.changeMatterFieldValue = this.changeMatterFieldValue.bind(this);
    const { practiceAreas, matters, passwordValue, handleSubmit, pristine, reset, submitting } = this.props;
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
          practiceAreas={practiceAreas}
          matters={matters}
          isDisplayed={currentTab === tabLabels[3]}
          changeMatterFieldValue={this.changeMatterFieldValue}/>
        {errorMessage && <ErrorAlert message={errorMessage}/>}
        <div className="btn-toolbar">
          <button 
            className="btn btn-danger pull-right" 
            type="button" 
            disabled={pristine || submitting} 
            onClick={reset}>
            Reset
          </button>
          <button 
            className="btn btn-primary pull-right" 
            type="submit"
            disabled={submitting}
            onClick={handleSubmit(data => this._handleSubmit(data))}>
            Save
          </button>
        </div>
      </div>
    );
  }
}

AddClientForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const selector = formValueSelector('AddClientForm');

AddClientForm = reduxForm({
  form:  'AddClientForm',
  asyncValidate,
  asyncBlurFields: ['username', 'email'],
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(AddClientForm);

AddClientForm = connect(
  state => {
    const passwordValue = selector(state, 'password');
    const mattersValue = selector(state, 'matters');

    return {
      passwordValue,
      mattersValue,
      initialValues: state.adminPages.formData
    };
  },
  { loadFormData: load }
)(AddClientForm)

export default AddClientForm;