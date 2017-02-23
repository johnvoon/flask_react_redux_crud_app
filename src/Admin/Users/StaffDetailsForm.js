import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import classNames from 'classnames';
import DatePickerFormGroup from 'components/DatePickerFormGroup';
import InputFormGroup from 'components/InputFormGroup';
import MultiselectFormGroup from 'components/MultiselectFormGroup';
import TextAreaFormGroup from 'components/TextAreaFormGroup';
import { required, maxLength, createOptionsList } from 'utils';


const mapStateToProps = (state) => {
  const { entities } = state;
  
  return {
    ...entities
  };
};

export default class StaffDetailsForm extends Component {
  render() {
    const { practiceAreas, matters, isDisplayed } = this.props;
    const practiceAreaOptions = createOptionsList(practiceAreas, "area");
    const matterOptions = createOptionsList(matters, "description");

    return (
      <div className={classNames({
        hidden: !isDisplayed
      })}>
        <div className="row">
          <div className="col-sm-6">
            <Field 
              name="dateJoined"
              component={DatePickerFormGroup}
              label="Date Joined"/>
          </div>
          <div className="col-sm-6">
            <Field 
              name="position"
              type="text"
              component={InputFormGroup}
              label="Position"/>
          </div>
        </div>
        <Field 
          name="practiceAreas"
          component={MultiselectFormGroup}
          label="Practice Areas"
          options={practiceAreaOptions}
          placeholder="Select one or more practice areas"/>
        <Field 
          name="matters"
          component={MultiselectFormGroup}
          label="Matters Handled"
          options={matterOptions}
          placeholder="Select one or more matters"/>
        <Field 
          name="description"
          component={TextAreaFormGroup}
          label="Description"
          validate={[ required, maxLength(1000) ]}
          rows="4"/>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  null
)(StaffDetailsForm);