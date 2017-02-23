import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from  'redux-form';
import _ from 'lodash';
import moment from 'moment';
import EditUserParticularsForm from './EditUserParticularsForm';
import UserAddressForm from './UserAddressForm';
import StaffDetailsForm from './StaffDetailsForm';
import ClientDetailsForm from './ClientDetailsForm';
import { removeJWT } from 'Authentication/actions';
import { required, email, username, 
  asyncValidateUserIdentity as asyncValidate } from '../../utils';
import { editUser } from 'Entities/UsersActions';
import { addStaff, editStaff } from 'Entities/StaffActions';
import { addClient, editClient } from 'Entities/ClientsActions';
import { hideModal, loadFormData as load } from 'Admin/actions';
import { selectEditUserForm } from 'Admin/selectors';
import ErrorAlert from 'components/ErrorAlert';
import NavTab from 'components/NavTab';

const mapStateToProps = (state) => {
  const { entities, adminPages, authentication } = state;
  
  return {
    roleValue: selectEditUserForm(state, 'role'),
    initialValues: state.adminPages.formData,
    ...entities,
    ...adminPages,
    ...authentication
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFormData: load,

    onEditUser: (JWT, content, id) => {
      return dispatch(editUser(JWT, content, id));
    },

    onAddStaff: (JWT, content) => {
      return dispatch(addStaff(JWT, content));
    },

    onEditStaff: (JWT, content, id) => {
      return dispatch(editStaff(JWT, content, id));
    },

    onAddClient: (JWT, content) => {
      return dispatch(addClient(JWT, content));
    },

    onEditClient: (JWT, content, id) => {
      return dispatch(editClient(JWT, content, id));
    },

    onJWTExpired: () => {
      dispatch(removeJWT());
    },

    onHideModal: () => {
      dispatch(hideModal());
    }
  };
};

class EditUserForm extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      currentTab: 'Particulars',
    }
  }

  componentDidMount() {
    const { selectedRecord } = this.props;

    this.handleInitializeUserData();
    if (selectedRecord.role === 'staff') {
      this.handleInitializeStaffData();
    } else if (selectedRecord.role === 'client') {
      this.handleInitializeClientData();
    }
  }

  handleInitializeUserData() {
    const { selectedRecord, loadFormData } = this.props;
    const initData = {
      "active": selectedRecord.active === "Active" ? "1" : "0",
      "role": selectedRecord.role,
      "firstName": selectedRecord.firstName,
      "middleName": selectedRecord.middleName,
      "lastName": selectedRecord.lastName,
      "phoneNumber": selectedRecord.phoneNumber,
      "unitNumber": selectedRecord.unitNumber,
      "streetAddress": selectedRecord.streetAddress,
      "suburb": selectedRecord.suburb,
      "postcode": selectedRecord.postcode,
      "state": selectedRecord.state,
      "country": selectedRecord.country
    };

    loadFormData(initData);
  }

  handleInitializeStaffData() {
    const { selectedRecord, staffUsers, loadFormData } = this.props;
    const staffUser = staffUsers[selectedRecord.id];
    const mattersList = staffUser.mattersHandled.join(',');
    const practiceAreasList = staffUser.practiceAreas.join(',');
    // const mattersList = staffUser.mattersHandled.map(id => {
    //   return String(id)
    // });
    // const practiceAreasList = staffUser.practiceAreas.map(id => {
    //   return String(id)
    // });
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
    const { selectedRecord, clientUsers, matters, loadFormData } = this.props;
    const clientUser = clientUsers[selectedRecord.id];
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
    const { selectedRecord, onAddStaff, onAddClient, 
      onEditUser, onEditStaff, onEditClient, 
      onHideModal, onJWTExpired, roleValue } = this.props;
    const userEntityFields = [
      'active', 'lastName', 'firstName', 'middleName', 'phoneNumber', 
      'unitNumber', 'streetAddress', 'suburb', 'postcode',
      'state', 'country', 'photo'
    ];
    const staffEntityFields = [
      'dateJoined', 'position', 'practiceAreas', 'matters', 'description'
    ];
    const clientEntityFields = ['matters'];
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };
    let userFormData = new FormData();

    Object.keys(data).forEach((key) => {
      userEntityFields.includes(key) &&
      userFormData.append(key, data[key]);
      if ((selectedRecord.role === 'staff' || roleValue === 'staff') 
        && staffEntityFields.includes(key)) {
        let staffFormData = new FormData();
        staffFormData.append(key, data[key]);
      }
      if ((selectedRecord.role === 'client' || roleValue === 'client') 
        && clientEntityFields.includes(key)) {
        let clientFormData = new FormData();
        clientFormData.append(key, data[key]);
      }
    });

    onEditUser(config, userFormData, selectedRecord.id)
    .then(({addedRecordId}) => {
      if (selectedRecord.role === 'staff') {
        onEditStaff(config, staffFormData, addedRecordId);  
      } else if (selectedRecord.role === 'client') {
        onEditClient(config, clientFormData, addedRecordId);
      } else if (selectedRecord.role === 'public') {
        if (roleValue === 'staff') {
          onAddStaff(config, staffFormData);
        } else if (roleValue === 'client')
          onAddClient(config, clientFormData);
        } else return;
      }
    )
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

  handleClick(event) {
    event.preventDefault();
    this.setState({
      currentTab: event.target.textContent
    });
  }

  render() {
    this.handleClick = this.handleClick.bind(this);
    const { selectedRecord } = this.props;
    const { roleValue, handleSubmit, pristine, reset, submitting } = this.props;
    const { errorMessage, currentTab } = this.state;
    const tabLabels = ["Particulars", "Address"];
    if (selectedRecord.role === 'staff' || roleValue === 'staff') {
      tabLabels.splice(2, 1, "Staff Details");
    } else if (selectedRecord.role === 'client' || roleValue === 'client') {
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
          isDisplayed={currentTab === tabLabels[0]}
          handleChange={this.handleChange}/>
        <UserAddressForm
          fillInAddress={(value) => this.fillInAddress(value)}
          isDisplayed={currentTab === tabLabels[1]}/>
        {selectedRecord.role === 'staff' || roleValue === 'staff' ? (
          <StaffDetailsForm
            isDisplayed={currentTab === tabLabels[2]}/>
        ) : selectedRecord.role === 'client' || roleValue === 'client' ? (
          <ClientDetailsForm
            isDisplayed={currentTab === tabLabels[2]}/>
        ) : null}
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
            disabled={ pristine || submitting} 
            handleClick={reset}>
            Reset
          </Button>
          <Button 
            customClassNames="btn-primary pull-right" 
            type="submit" 
            disabled={submitting}
            handleClick={handleSubmit(data => this._handleSubmit(data))}>
            Save
          </Button>
        </div>
      </form>
    );
  }
}

EditUserForm.propTypes = {
  initialize: PropTypes.object.isRequired,
  onEdit: PropTypes.object.isRequired,
  onHideModal: PropTypes.object.isRequired,
  handleSubmit: PropTypes.object.isRequired,
  pristine: PropTypes.object.isRequired,
  reset: PropTypes.object.isRequired,
  submitting: PropTypes.object.isRequired,
  selectedRecord: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'EditUserForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(EditUserForm))
