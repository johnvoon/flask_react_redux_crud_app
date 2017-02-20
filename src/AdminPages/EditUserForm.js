import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from  'redux-form';
import EditUserParticularsForm from './EditUserParticularsForm';
import UserAddressForm from './UserAddressForm';
import StaffDetailsForm from './StaffDetailsForm';
import ClientDetailsForm from './ClientDetailsForm';
import ErrorAlert from '../components/ErrorAlert';
import NavTab from '../components/NavTab';
import { required, email, username, asyncValidateUserIdentity as asyncValidate } from '../utils';
import { loadFormData as load } from './actions';
import _ from 'lodash';
import moment from 'moment';

class EditUserForm extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      currentTab: 'Particulars',
      roleSelected: ''
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
    const { user, staff, staffUsers, matters, practiceAreas, loadFormData } = this.props;
    const staffUser = staffUsers[user.id];
    const mattersList = staffUser.mattersHandled.map(id => {
      return String(id)
    });
    const practiceAreasList = staffUser.practiceAreas.map(id => {
      return String(id)
    });
    const description = (staffUser.description || []).map((paragraph) => {
      return paragraph;
    }).join('\r\n\r\n')

    const initData = {
      "dateJoined": moment(staffUser.dateJoined).format('DD/MM/YYYY'),
      "matters": mattersList,
      "position": staffUser.position,
      "description": description,
      "practiceAreas": practiceAreasList
    };

    loadFormData(initData);    
  }

  handleInitializeClientData() {
    const { user, clientUsers, matters, loadFormData } = this.props;
    const clientUser = clientUsers[user.id];
    const mattersList = clientUser.mattersHandled.map(id => {
      return String(id)
    });

    const initData = {
      "matters": mattersList,
    };

    loadFormData(initData);   
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

  _handleSubmit(data, role) {
    const { user, onAddStaff, onAddClient, onEditUser, onEditStaff, 
      onEditClient, onHide, onJWTExpired, addedRecord } = this.props;
    const userEntityFields = [
      'active', 'lastName', 'firstName', 'middleName', 'phoneNumber', 
      'unitNumber', 'streetAddress', 'suburb', 'postcode',
      'state', 'country', 'photo'
    ];
    const staffEntityFields = [
      'dateJoined', 'position', 'practiceAreas', 'matters', 'description'
    ];
    const clientEntityFields = ['matters']
    let userFormData = new FormData();

    Object.keys(data).forEach((key) => {
      userEntityFields.includes(key) &&
      userFormData.append(key, data[key]);
      if ((user.role === 'staff' || roleSelected === 'staff') && staffEntityFields.includes(key)) {
        let staffFormData = new FormData();
        staffFormData.append(key, data[key]);
      }
      if ((user.role === 'client' || roleSelected === 'client') && clientEntityFields.includes(key)) {
        let clientFormData = new FormData();
        clientFormData.append(key, data[key]);
      }
    });

    onEditUser(userFormData)
    .then(({addedRecordId}) => {
      if (user.role === 'staff') {
        onEditStaff(staffFormData);  
      } else if (user.role === 'client') {
        onEditClient(clientFormData);
      } else if (user.role === 'public') {
        if (roleSelected === 'staff') {
          onAddStaff(staffFormData);
        } else if (roleSelected === 'client')
          onAddClient(clientFormData);
        } else return;
      }
    )
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

  handleClick(event) {
    event.preventDefault();
    this.setState({
      currentTab: event.target.textContent
    });
  }

  handleChange({target: {value}}) {
    this.setState({
      roleSelected: value
    })
  }

  render() {
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    const { user, practiceAreas, matters, staff } = this.props;
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const { errorMessage, currentTab, roleSelected } = this.state;
    const tabLabels = ["Particulars", "Address"];
    if (user === 'staff' || roleSelected === 'staff') {
      tabLabels.splice(2, 1, "Staff Details");
    } else if (user === 'client' || roleSelected === 'client') {
      tabLabels.splice(2, 1, "Client Details");
    }
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
        <EditUserParticularsForm
          user={user}
          isDisplayed={currentTab === tabLabels[0]}
          handleChange={this.handleChange}/>
        <UserAddressForm
          fillInAddress={(value) => this.fillInAddress(value)}
          isDisplayed={currentTab === tabLabels[1]}/>
        {user.role === 'staff' || roleSelected === 'staff' ? (
          <StaffDetailsForm
            practiceAreas={practiceAreas}
            matters={matters}
            isDisplayed={currentTab === tabLabels[2]}/>
        ) : user.role === 'client' || roleSelected === 'client' ? (
          <ClientDetailsForm
            matters={matters}
            isDisplayed={currentTab === tabLabels[2]}/>
        ) : null}
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
