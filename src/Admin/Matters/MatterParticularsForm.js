import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field } from  'redux-form';
import classNames from 'classnames';
import { required, createOptionsList } from 'utils';
import DatePickerFormGroup from 'components/DatePickerFormGroup';
import InputFormGroup from 'components/InputFormGroup';
import MultiselectFormGroup from 'components/MultiselectFormGroup';

const mapStateToProps = (state) => {
  const { entities } = state;
  
  return {
    ...entities
  };
};

class MatterParticularsForm extends Component {
  render() {
    const { isDisplayed, practiceAreas, staff } = this.props;
    const practiceAreaOptions = createOptionsList(practiceAreas, "area");
    const staffOptions = createOptionsList(staff, "name")

    return (
      <div className={classNames({
        hidden: !isDisplayed
      })}>
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
          name="handlingStaff"
          component={MultiselectFormGroup}
          label="Handling Staff"
          options={staffOptions}
          placeholder="Select one or more handling staff"/>
        <Field
          name="description"
          component={InputFormGroup}
          label="Description"
          validate={required}/>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  null
)(MatterParticularsForm);