import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm, Field, FormSection, formValueSelector } from  'redux-form';
import UserAccountDetailsForm from'./UserAccountDetailsForm';
import UserParticularsForm from './UserParticularsForm';
import UserAddressForm from './UserAddressForm';
import StaffDetailsForm from './StaffDetailsForm';
import { hideModal, loadFormData as load } from 'Admin/actions';
import { selectAddStaffForm } from 'Admin/selectors';
import { removeJWT } from 'Authentication/actions';
import { addUser } from 'Entities/UsersActions';
import { addStaff } from 'Entities/StaffActions';
import Button from 'components/Button';
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
  asyncValidateUserIdentity as asyncValidate } from 'utils';

const mapStateToProps = (state) => {
  const { authentication } = state;
  return {
    passwordValue: selectAddStaffForm(state, 'password'),
    initialValues: state.adminPages.formData
    ...authentication
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFormData: load,

    onAddUser: (JWT, content) => {
      return dispatch(addUser(JWT, content));
    },

    onAddStaff: (JWT, content) => {
      return dispatch(addStaff(JWT, content));
    },

    onJWTExpired: () => {
      dispatch(removeJWT());
    },

    onHideModal: () => {
      dispatch(hideModal());
    }
  };
};

class AddStaffForm extends Component { 
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      errorMessage: '',
      currentTab: 'Account Details'
    };
  }

  _handleSubmit(data) {
    console.log(data);
    const { onAddUser, onAddStaff, onHideModal, onJWTExpired, JWT } = this.props;
    const userEntityFields = [
      'email', 'username', 'password', 'lastName', 'firstName', 'middleName', 
      'phoneNumber', 'unitNumber', 'streetAddress', 'suburb', 'postcode',
      'state', 'country', 'photo'
    ];
    const staffEntityFields = [
      'dateJoined', 'position', 'practiceAreas', 'matters', 'description'
    ];
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };
    let userFormData = new FormData();
    let staffFormData = new FormData();
    Object.keys(data).forEach((key) => {
      userEntityFields.includes(key) &&
      userFormData.append(key, data[key]);
      staffEntityFields.includes(key) &&
      staffFormData.append(key, data[key]);
    });
    userFormData.append('role', 'staff');

    onAddUser(config, userFormData)
    .then(({addedRecordId}) => {
      staffFormData.append('userId', addedRecordId);
      onAddStaff(config, staffFormData);
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

  render() {
    const { onHideModal, passwordValue, handleSubmit, pristine, reset, submitting } = this.props;
    const { errorMessage, currentTab } = this.state;
    const tabLabels = ["Account Details", "Particulars", "Address", "Staff Details"];
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
        <StaffDetailsForm
          isDisplayed={currentTab === tabLabels[3]}/>
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
            className="btn-primary pull-right" 
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

AddStaffForm.propTypes = {
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
  form:  'AddStaffForm',
  asyncValidate,
  asyncBlurFields: ['username', 'email'],
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(AddStaffForm))
