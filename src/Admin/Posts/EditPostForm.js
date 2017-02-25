import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from  'redux-form';
import moment from 'moment';
import _ from 'lodash';
import { required, maxLength, createOptionsList } from 'utils';
import { removeJWT } from 'Authentication/actions';
import { editPost } from 'Entities/PostsActions';
import { hideModal } from 'Admin/actions';
import InputFormGroup from 'components/InputFormGroup';
import SelectFormGroup from 'components/SelectFormGroup';
import TextAreaFormGroup from 'components/TextAreaFormGroup';
import StaticFormGroup from 'components/StaticFormGroup';
import FileUploadFormGroup from 'components/FileUploadFormGroup';
import TextEditorFormGroup from 'components/TextEditorFormGroup';
import ErrorAlert from 'components/ErrorAlert';
import Button from 'components/Button';

const mapStateToProps = (state) => {
  const { entities, adminPages, authentication } = state;

  return {
    ...entities,
    ...adminPages,
    ...authentication
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEditPost: (JWT, content, postId) => {
      return dispatch(editPost(JWT, content, postId));
    },

    onJWTExpired: () => {
      dispatch(removeJWT());
    },

    onHideModal: () => {
      dispatch(hideModal());
    }
  };
};

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
    const { selectedRecord, staff, practiceAreas } = this.props;
    const { initialize } = this.props;
    const postBody = (selectedRecord.body || []).map((paragraph) => {
      return `<p>${paragraph}</p>`;
    }).join('\n');
    const initData = {
      "title": selectedRecord.title,
      "author": _.findKey(staff, (val) => val.name === selectedRecord.author),
      "body": postBody,
      "summary": selectedRecord.summary,
      "practiceArea": _.findKey(practiceAreas, (val) => val.name === practiceAreas.area)
    };

    initialize(initData);
  }

  _handleSubmit(data) {
    const { selectedRecord, onEditPost, onHideModal, onJWTExpired, JWT } = this.props;
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

    onEditPost(config, formData, selectedRecord.id)
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
    const { onHideModal, selectedRecord, staff, practiceAreas } = this.props;
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const { errorMessage } = this.state;
    const practiceAreaOptions = createOptionsList(practiceAreas, "area");
    const postAuthorOptions = createOptionsList(staff, "name");
    const postCreated = moment(selectedRecord.created, "ddd DD-MMM-YYYY HH:mm:ss").format('DD/MM/YY HH:mm:ss');
    const postUpdated = moment(selectedRecord.updated, "ddd DD-MMM-YYYY HH:mm:ss").format('DD/MM/YY HH:mm:ss');

    return (
      <form>
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
          validate={[ required, maxLength(100) ]}
          rows="4"/>
        <Field 
          name="body"
          component={TextEditorFormGroup}
          label="Body"/>
        <Field 
          name="file"
          component={FileUploadFormGroup}
          label="Image Source"/>
        {errorMessage && <ErrorAlert message={errorMessage}/>}
        <div className="btn-toolbar">
          <Button
            customClassNames="btn-danger pull-right" 
            type="button" 
            handleClick={onHideModal}>
            Close
          </Button>
          <Button 
            customClassNames="btn-danger pull-right" 
            type="button" 
            disabled={pristine || submitting} 
            handleClick={reset}>
            Reset
          </Button>
          <Button 
            customClassNames="btn btn-primary pull-right" 
            type="submit"
            disabled={submitting}
            handleClick={handleSubmit(data => this._handleSubmit(data))}>
            Save
          </Button>
        </div>
      </form>
    );
  }
}

EditPostForm.propTypes = {
  initialize: PropTypes.object.isRequired,
  onEditPost: PropTypes.object.isRequired,
  onHideModal: PropTypes.object.isRequired,
  onJWTExpired: PropTypes.func.isRequired,
  handleSubmit: PropTypes.object.isRequired,
  pristine: PropTypes.object.isRequired,
  reset: PropTypes.object.isRequired,
  submitting: PropTypes.object.isRequired,
  selectedRecord: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired,
  practiceAreas: PropTypes.object.isRequired,
  JWT: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'EditPostForm',
  destroyOnUnmount: false
})(EditPostForm));
