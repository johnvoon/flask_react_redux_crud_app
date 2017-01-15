import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from  'redux-form';
import InputFormGroup from './InputFormGroup';
import SelectFormGroup from './SelectFormGroup';
import TextAreaFormGroup from './TextAreaFormGroup';
import StaticFormGroup from './StaticFormGroup';
import ErrorAlert from './ErrorAlert';
import { required, maxLength, createOptionsList } from '../utils';
import moment from 'moment';
import _ from 'lodash';

class EditPostForm extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    }
  }

  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    const { post, postAuthors, practiceAreas } = this.props;
    const postBody = (post.body || []).map((paragraph) => 
      paragraph).join('\n\n');
    const initData = {
      "title": post.title,
      "author": _.findKey(postAuthors, (val) => val.name === post.author),
      "body": postBody,
      "summary": post.summary,
      "practiceArea": _.findKey(practiceAreas, (val) => val.name === practiceAreas.area),
      "imgSrc": post.imgSrc.split("/").pop()
    };

    this.props.initialize(initData);
  }

  render() {
    const { post, postAuthors, practiceAreas, onEdit, onHide,
            handleSubmit, pristine, reset, submitting } = this.props;
    const { errorMessage } = this.state;

    const practiceAreaOptions = createOptionsList(practiceAreas, "area");
    const postAuthorOptions = createOptionsList(postAuthors, "name");
    const postCreated = moment(post.created, "ddd DD-MMM-YYYY HH:mm:ss").format('DD/MM/YY HH:mm:ss');
    const postUpdated = moment(post.updated, "ddd DD-MMM-YYYY HH:mm:ss").format('DD/MM/YY HH:mm:ss');

    return (
      <form onClick={handleSubmit((data) => {
        onEdit(data, post.id)
        .then(() => onHide())
        .catch(error => this.setState({
          errorMessage: {error}
        }))
      })}>
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
          value={post.title}
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
          name="imgSrc"
          type="text"
          component={InputFormGroup}
          label="Image Filename"
          validate={required}/>
        {errorMessage && <ErrorAlert message={errorMessage}/>}
        <div className="btn-toolbar">
          <button className="btn btn-primary pull-right" type="button" disabled={ pristine || submitting} onClick={reset}>
            Reset
          </button>
          <button 
            className="btn btn-primary pull-right" type="submit" disabled={submitting}>
            Save
          </button>
        </div>
      </form>
    );
  }
}

EditPostForm.propTypes = {
  post: PropTypes.object.isRequired,
  postAuthors: PropTypes.object.isRequired,
  practiceAreas: PropTypes.object.isRequired
};

export default reduxForm({
  form: 'EditPostForm'
})(EditPostForm)
