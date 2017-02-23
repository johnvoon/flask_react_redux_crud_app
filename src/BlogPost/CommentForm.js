import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import { required, passwordRequired } from '../utils';
import TextAreaFormGroup from '../components/TextAreaFormGroup';
import ErrorAlert from '../components/ErrorAlert';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    }
  }

  _handleSubmit(data) {
    const { onAddComment, onHide, postId } = this.props;
    let formData = new FormData();

    formData.append('content', data.content);
    formData.append('postId', postId);
    onAddComment(formData)
    .then(() => onHide())
    .catch(({response, message}) => {
      const { status, data } = response;
      if (status >= 400 && status < 500) {
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
    const { name, submitting, handleSubmit } = this.props;
    const { errorMessage } = this.state;

    return (
      <form>
        <Field 
          name="content"
          component={TextAreaFormGroup}
          rows={3}
          label=""/>
        <div className="form-group">
          <button
            className="btn btn-primary text-uppercase"
            type="submit"
            disabled={submitting}
            onClick={handleSubmit(data => this._handleSubmit(data))}>
            Submit Comment
          </button>            
        </div>
      </form>
    );
  }  
}

export default reduxForm({
  form: 'CommentForm'
})(CommentForm);