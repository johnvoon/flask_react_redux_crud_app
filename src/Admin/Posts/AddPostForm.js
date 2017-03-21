import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from  'redux-form';
import { required, maxLength, createOptionsList, 
  asyncValidatePostTitle as asyncValidate } from 'utils';
import { addPost } from 'Entities/PostsActions';
import { removeJWT } from 'Authentication/actions';
import { hideModal } from 'Admin/actions';
import ErrorAlert from 'components/ErrorAlert';
import InputFormGroup from 'components/InputFormGroup';
import SelectFormGroup from 'components/SelectFormGroup';
import TextAreaFormGroup from 'components/TextAreaFormGroup';
import FileUploadFormGroup from 'components/FileUploadFormGroup';
import TextEditorFormGroup from 'components/TextEditorFormGroup';
import ButtonToolbar from 'components/ButtonToolbar';


const mapStateToProps = (state) => {
  const { entities, authentication } = state;

  return {
    ...entities,
    ...authentication
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPost: (JWT, content) => {
      return dispatch(addPost(JWT, content));
    },

    onJWTExpired: () => {
      dispatch(removeJWT());
    },

    onHideModal: () => {
      dispatch(hideModal());
    }
  };
};

class AddPostForm extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  _handleSubmit(data) {
    const { onAddPost, onHideModal, onJWTExpired, JWT } = this.props;
    const config = {
      headers: {
        'Authorization': `JWT ${JWT}`
      }
    };

    let formData = new FormData();
    
    Object.keys(data).forEach((key) => {
      key === 'file' && formData.append('file', data[key][0]);
      formData.append(key, data[key]);
    });

    onAddPost(config, formData)
    .then(() => onHideModal())
    .catch(({response, message}) => {
      const { status, data } = response;
      if (status === 401) {
        onJWTExpired();
      } else if (status === 404) {
        this.setState({
          errorMessage: data.message
        });
      } else {
        this.setState({
          errorMessage: message
        });
      }
    });
  }

  render() {
    const { onHideModal, staff, practiceAreas, handleSubmit, 
      pristine, reset, submitting } = this.props;
    const { errorMessage } = this.state;
    const postAuthorOptions = createOptionsList(staff, "name");
    const practiceAreaOptions = createOptionsList(practiceAreas, "area");

    return (
      <form>
        <Field 
          name="title"
          type="text"
          component={InputFormGroup}
          label="Title"
          validate={required}/>
        <div className="row">
          <div className="col-sm-6">
            <Field 
              name="author"
              component={SelectFormGroup}
              label="Author"
              validate={required}
              options={postAuthorOptions}/>
          </div>
          <div className="col-sm-6">
            <Field 
              name="practiceArea"
              component={SelectFormGroup}
              label="Practice Area"
              validate={required}
              options={practiceAreaOptions}/>
          </div>
        </div>
        <Field 
          name="summary"
          component={TextAreaFormGroup}
          label="Summary"
          validate={[ required, maxLength(300) ]}
          rows={4}/>
        <Field 
          name="body"
          component={TextEditorFormGroup}
          label="Body"
          validate={required}/>
        <Field 
          name="file"
          component={FileUploadFormGroup}
          label="Image Source"/>
        {errorMessage && <ErrorAlert message={errorMessage}/>}
        <ButtonToolbar
          onHideModal={onHideModal}
          pristine={pristine}
          submitting={submitting}
          reset={reset}
          handleSubmit={handleSubmit(data => this._handleSubmit(data))}/>
      </form>
    );
  }
}

AddPostForm.propTypes = {
  onAddPost: PropTypes.func.isRequired,
  onHideModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  staff: PropTypes.object.isRequired,
  practiceAreas: PropTypes.object.isRequired,
  JWT: PropTypes.string.isRequired,
  onJWTExpired: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'AddPostForm',
  asyncValidate,
  asyncBlurFields: ['title'],
  destroyOnUnmount: false
})(AddPostForm));
