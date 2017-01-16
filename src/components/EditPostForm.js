import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from  'redux-form';
import InputFormGroup from './InputFormGroup';
import SelectFormGroup from './SelectFormGroup';
import TextAreaFormGroup from './TextAreaFormGroup';
import StaticFormGroup from './StaticFormGroup';
import FileUploadFormGroup from './FileUploadFormGroup';
import ErrorAlert from './ErrorAlert';
import { required, maxLength, createOptionsList } from '../utils';
import moment from 'moment';
import _ from 'lodash';

class EditPostForm extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    const { post, postAuthors, practiceAreas } = this.props;
    const { initialize } = this.props;
    const postBody = (post.body || []).map((paragraph) => 
      paragraph).join('\n\n');
    const initData = {
      "title": post.title,
      "author": _.findKey(postAuthors, (val) => val.name === post.author),
      "body": postBody,
      "summary": post.summary,
      "practiceArea": _.findKey(practiceAreas, (val) => val.name === practiceAreas.area)
    };

    initialize(initData);
  }

  render() {
    const { onEdit, onHide, onJWTExpired } = this.props;
    const { post, postAuthors, practiceAreas } = this.props;
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const { errorMessage } = this.state;
    const practiceAreaOptions = createOptionsList(practiceAreas, "area");
    const postAuthorOptions = createOptionsList(postAuthors, "name");
    const postCreated = moment(post.created, "ddd DD-MMM-YYYY HH:mm:ss").format('DD/MM/YY HH:mm:ss');
    const postUpdated = moment(post.updated, "ddd DD-MMM-YYYY HH:mm:ss").format('DD/MM/YY HH:mm:ss');

    return (
      <form className="form-horizontal">
        <StaticFormGroup 
          label="Created"
          text={postCreated}/>
        <StaticFormGroup 
          label="Updated"
          text={postUpdated}/>
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
          options={postAuthorOptions}/>
        <Field 
          name="body"
          component={TextAreaFormGroup}
          label="Body"
          validate={required}
          rows="20"/>
        <Field 
          name="summary"
          component={TextAreaFormGroup}
          label="Summary"
          validate={[ required, maxLength(100) ]}
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
          label="Image Source"
          validate={required}/>
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
            onClick={handleSubmit(data => {
              let formData = new FormData();
              Object.keys(data).forEach((key) => {
                key === 'file' && formData.append('file', data[key][0]);
                formData.append(key, data[key]);
              });
              onEdit(formData, post.id)
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
            })}>
            Save
          </button>
        </div>
      </form>
    );
  }
}

EditPostForm.propTypes = {
  initialize: PropTypes.object.isRequired,
  onEdit: PropTypes.object.isRequired,
  onHide: PropTypes.object.isRequired,
  handleSubmit: PropTypes.object.isRequired,
  pristine: PropTypes.object.isRequired,
  reset: PropTypes.object.isRequired,
  submitting: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  postAuthors: PropTypes.object.isRequired,
  practiceAreas: PropTypes.object.isRequired
};

export default reduxForm({
  form: 'EditPostForm'
})(EditPostForm);
