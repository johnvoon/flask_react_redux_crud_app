import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from  'redux-form';
import { loadFormData as load } from './actions';
import ErrorAlert from '../components/ErrorAlert';
import InputFormGroup from '../components/InputFormGroup';
import InputGroupFormGroup from '../components/InputGroupFormGroup';
import MultiselectFormGroup from '../components/MultiselectFormGroup';
import DatePickerFormGroup from '../components/DatePickerFormGroup';
import { required, createOptionsList } from '../utils';
import { removeJWT } from '../Authentication/actions';
import { addMatter } from '../Entities/MattersActions';
import _ from 'lodash';

const mapStateToProps = (state) => {
  const { entities, adminPages, authentication } = state;
  console.log(state.form);
  return {
    ...entities,
    ...adminPages,
    ...authentication
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddMatter: (JWT, content) => {
      return dispatch(addMatter(JWT, content));
    },

    onJWTExpired: () => {
      dispatch(removeJWT());
    },
  };
};

class AddMatterForm extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  _handleSubmit(data) {
    const { onAddMatter, JWT, onHide, onJWTExpired, changeMatterFieldValue } = this.props;
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };

    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    onAddMatter(config, formData)
    .then(({matterId}) => {
      changeMatterFieldValue && 
      changeMatterFieldValue(matterId);
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

  render() {
    console.log(this.props);
    const { practiceAreas, handleSubmit, hideAddMatterForm, pristine, reset, submitting } = this.props;
    const { errorMessage } = this.state;
    const practiceAreaOptions = createOptionsList(practiceAreas, "area");
    
    return (
      <form>
        <div className="row">
          <div className="col-sm-6">
            <Field
              name="fileOpen"
              component={DatePickerFormGroup}
              label="File Open Date"
              validate={required}/>
          </div>
          <div className="col-sm-6">
            <Field
              name="costsOnAccount"
              component={InputFormGroup}
              label="Costs on account ($)"/>
          </div>
        </div>
        <Field 
          name="practiceAreas"
          component={MultiselectFormGroup}
          label="Practice Areas"
          options={practiceAreaOptions}
          placeholder="Select one or more practice areas"/>
        <Field
          name="description"
          component={InputFormGroup}
          label="Description"
          validate={required}/>
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

AddMatterForm.propTypes = {
  onAddMatter: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

AddMatterForm = reduxForm({
  form:  'AddMatterForm',
  destroyOnUnmount: false,
})(AddMatterForm);

AddMatterForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMatterForm)

export default AddMatterForm;