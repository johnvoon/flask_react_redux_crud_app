import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from  'redux-form';
import ErrorAlert from './ErrorAlert';
import InputFormGroup from './InputFormGroup';
import SelectFormGroup from './SelectFormGroup';
import TextAreaFormGroup from './TextAreaFormGroup';
import FileUploadFormGroup from './FileUploadFormGroup';
import TextEditorFormGroup from './TextEditorFormGroup';
import { required, maxLength, createOptionsList, asyncValidatePostTitle as asyncValidate } from '../utils';


class AddPostForm extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  _handleSubmit(data) {
    const { onAdd, onHide, onJWTExpired } = this.props;
    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      key === 'file' && formData.append('file', data[key][0]);
      formData.append(key, data[key]);
    });
    onAdd(formData)
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
    const { postAuthors, practiceAreas } = this.props; 
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const { errorMessage } = this.state;
    const postAuthorOptions = createOptionsList(postAuthors, "name");
    const practiceAreaOptions = createOptionsList(practiceAreas, "area");

    return (
      <form className="form-horizontal">
        <Field 
          name="title"
          type="text"
          component={InputFormGroup}
          label="Title"
          validate={required}/>
        <Field 
          name="author"
          component={SelectFormGroup}
          label="Author"
          validate={required}
          options={postAuthorOptions}>
        </Field>
        <Field 
          name="body"
          component={TextEditorFormGroup}
          label="Body"
          validate={required}/>
        <Field 
          name="summary"
          component={TextAreaFormGroup}
          label="Summary"
          validate={[ required, maxLength(200) ]}
          rows="4"/>
        <Field 
          name="practiceArea"
          component={SelectFormGroup}
          label="Practice Area"
          validate={required}
          options={practiceAreaOptions}/>
        <Field 
          name="file"
          component={FileUploadFormGroup}
          label="Image Source"/>
        {errorMessage && <ErrorAlert message={errorMessage}/>}
        <div className="btn-toolbar">
          <button 
            className="btn btn-primary pull-right" 
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

AddPostForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  postAuthors: PropTypes.object.isRequired,
  practiceAreas: PropTypes.object.isRequired
};

export default reduxForm({
  form: 'AddPostForm',
  asyncValidate,
  asyncBlurFields: ['title'],
  destroyOnUnmount: false
})(AddPostForm);