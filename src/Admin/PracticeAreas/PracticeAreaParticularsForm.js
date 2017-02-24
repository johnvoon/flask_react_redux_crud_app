import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field } from  'redux-form';
import _ from 'lodash';
import { required } from 'utils';
import InputFormGroup from 'components/InputFormGroup';
import FileUploadFormGroup from 'components/FileUploadFormGroup';
import TextAreaFormGroup from 'components/TextAreaFormGroup';

const mapStateToProps = (state) => {
  const { entities } = state;
  
  return {
    ...entities
  };
};

class PracticeAreaParticularsForm extends Component {
  render() {
    return (
      <div>
        <Field
          name="area"
          component={InputFormGroup}
          label="Practice Area Name"
          validate={required}/>
        <Field 
          name="file"
          component={FileUploadFormGroup}
          label="Background Image"/>
        <Field 
          name="description"
          component={TextAreaFormGroup}
          label="Description"
          rows="4"/>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  null
)(PracticeAreaParticularsForm);