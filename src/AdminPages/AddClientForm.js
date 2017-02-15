import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from  'redux-form';
import { loadFormData as load } from './actions';
import UserParticularsForm from './UserParticularsForm';
import ErrorAlert from '../components/ErrorAlert';
import InputFormGroup from '../components/InputFormGroup';
import SelectFormGroup from '../components/SelectFormGroup';
import GeosuggestFormGroup from '../components/GeosuggestFormGroup';
import AsyncValidationFormGroup from '../components/AsyncValidationFormGroup';
import { required, createOptionsList, asyncValidateUserIdentity as asyncValidate } from '../utils';
import _ from 'lodash';

class AddClientForm extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      showAddMatterForm: false
    };
  }

  _handleSubmit(data) {
    const { onAddUser, onAddClient, onHide, onJWTExpired, addedRecord } = this.props;
    const userEntityFields = [
      'email', 'username', 'password', 'lastName', 'firstName', 'middleName', 
      'phoneNumber', 'unitNumber', 'streetAddress', 'suburb', 'postcode',
      'state', 'country', 'photo'
    ];
    let userFormData = new FormData();
    let clientFormData = new FormData();
    Object.keys(data).forEach((key) => {
      userEntityFields.includes(key) &&
      userFormData.append(key, data[key]);
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

  hideAddMatterForm() {
    this.setState({
      showAddMatterForm: false
    })
  }

  handleClickAddMatter() {
    this.setState({
      showAddMatterForm: true
    })
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

  render() {
    this.hideAddMatterForm = this.hideAddMatterForm.bind(this);
    this.handleClickAddMatter = this.handleClickAddMatter.bind(this);
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const { errorMessage, showAddMatterForm } = this.state;
    const matterOptions = createOptionsList(matters, "matter");

    return (
      <form>
        <UserParticularsForm 
          fillInAddress={(value) => this.fillInAddress(value)}
          passwordValue={passwordValue}/>
        <Field 
          name="matters"
          component={MultiselectFormGroup}
          label="Matters"
          options={matterOptions}
          placeholder="Select one or more matters"/>
        <button 
          className="btn btn-primary text-uppercase" 
          type="button"  
          onClick={this.handleClickAddMatter}>
          <span className="plus"/>
          Add a Matter
        </button>
        {showAddMatterForm && 
          <AddMatterForm
            practiceAreas={practiceAreas}
            hideAddMatterForm={this.hideAddMatterForm}/>}
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
      </form>
    );
  }
}

AddClientForm.propTypes = {
  onAddUser: PropTypes.func.isRequired,
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

    return {
      passwordValue,
      initialValues: state.adminPages.formData
    };
  },
  { loadFormData: load }
)(AddClientForm)

export default AddClientForm;