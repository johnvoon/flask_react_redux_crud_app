import React, { Component } from 'react';
import { Field } from  'redux-form';
import { required } from 'utils';
import InputFormGroup from 'components/InputFormGroup';
import FileUploadFormGroup from 'components/FileUploadFormGroup';
import TextAreaFormGroup from 'components/TextAreaFormGroup';

export default class PracticeAreaParticularsForm extends Component {
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
    );
  }
}
