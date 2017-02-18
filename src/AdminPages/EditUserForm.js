import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from  'redux-form';
import EditUserFormParticulars from './EditUserFormParticulars';
import EditUserFormAddress from './EditUserFormAddress';
import EditUserFormStaffDetails from './EditUserFormStaffDetails';
import ErrorAlert from '../components/ErrorAlert';
import NavTab from '../components/NavTab';
import { required, email, username, asyncValidateUserIdentity as asyncValidate } from '../utils';
import { loadFormData as load } from './actions';
import _ from 'lodash';

class EditUserForm extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      currentTab: 'Particulars'
    }
  }

  componentDidMount() {
    const { user } = this.props;

    this.handleInitializeUserData();
    if (user.role === 'staff') {
      this.handleInitializeStaffData();
    } else if (user.role === 'client') {
      this.handleInitializeClientData();
    }
  }

  handleInitializeUserData() {
    const { user, loadFormData } = this.props;
    const initData = {
      "active": user.active === "Active" ? "1" : "0",
      "role": user.role,
      "firstName": user.firstName,
      "middleName": user.middleName,
      "lastName": user.lastName,
      "phoneNumber": user.phoneNumber,
      "unitNumber": user.unitNumber,
      "streetAddress": user.streetAddress,
      "suburb": user.suburb,
      "postcode": user.postcode,
      "state": user.state,
      "country": user.country
    };

    loadFormData(initData);
  }

  handleInitializeStaffData() {
    const { user, staff, matters, practiceAreas, loadFormData } = this.props;
    const staffUser = staff[user.staffId];
    console.log(staffUser);
    const mattersList = staffUser.mattersHandled.map(id => {
      return {
        value: String(id), 
        label: matters[id].area
      }
    });
    const practiceAreasList = staffUser.practiceAreas.map(id => {
      return {
        value: String(id), 
        label: practiceAreas[id].area
      }
    });
    const description = (staffUser.description || []).map((paragraph) => {
      return paragraph;
    }).join('\n\n')

    const initData = {
      "dateJoined": staffUser.dateJoined,
      "matters": mattersList,
      "position": staffUser.position,
      "description": description,
      "practiceAreas": practiceAreasList
    };

    loadFormData(initData);    
  }

  handleInitializeClientData() {
    console.log("under construction");
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

  _handleSubmit(data) {
    console.log(data);
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({
      currentTab: event.target.textContent
    });
  }

  render() {
    this.handleClick = this.handleClick.bind(this);
    const { user, practiceAreas, matters, staff } = this.props;
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const { errorMessage, currentTab } = this.state;
    const tabLabels = ["Particulars", "Address", "Staff Details"];
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
      <form>
        <ul className="nav nav-tabs">
          {navTabs}   
        </ul>
        <EditUserFormParticulars
          user={user}
          isDisplayed={currentTab === tabLabels[0]}/>
        <EditUserFormAddress
          fillInAddress={(value) => this.fillInAddress(value)}
          isDisplayed={currentTab === tabLabels[1]}/>
        <EditUserFormStaffDetails
          practiceAreas={practiceAreas}
          matters={matters}
          isDisplayed={currentTab === tabLabels[2]}/>
        {errorMessage && <ErrorAlert message={errorMessage}/>}
        <div className="btn-toolbar">
          <button 
            className="btn btn-danger pull-right" 
            type="button" 
            disabled={ pristine || submitting} 
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
      </form>
    );
  }
}

EditUserForm.propTypes = {
  initialize: PropTypes.object.isRequired,
  onEdit: PropTypes.object.isRequired,
  onHide: PropTypes.object.isRequired,
  handleSubmit: PropTypes.object.isRequired,
  pristine: PropTypes.object.isRequired,
  reset: PropTypes.object.isRequired,
  submitting: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

EditUserForm = reduxForm({
  form: 'EditUserForm',
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(EditUserForm);

EditUserForm = connect(
  state => {
    return {initialValues: state.adminPages.formData}
  },
  { loadFormData: load }
)(EditUserForm)

export default EditUserForm;
