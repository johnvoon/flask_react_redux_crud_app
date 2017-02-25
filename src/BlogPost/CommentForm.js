import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { addComment } from 'Entities/CommentsActions';
import TextAreaFormGroup from 'components/TextAreaFormGroup';
import ErrorAlert from 'components/ErrorAlert';
import Button from 'components/Button';

const mapDispatchToProps = (dispatch) => ({
  onAddComment: (formData) => {
    return dispatch(addComment(formData));
  }
});

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  _handleSubmit(data) {
    const { onAddComment, onHideCommentForm, postId } = this.props;
    let formData = new FormData();

    formData.append('content', data.content);
    formData.append('postId', postId);
    onAddComment(formData)
    .then(() => onHideCommentForm())
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
    const { submitting, handleSubmit } = this.props;
    const { errorMessage } = this.state;

    return (
      <form>
        <Field 
          name="content"
          component={TextAreaFormGroup}
          rows={3}
          label=""/>
        {errorMessage && <ErrorAlert message={errorMessage}/>}
        <Button
          className="btn-primary"
          type="submit"
          disabled={submitting}
          handleClick={handleSubmit(data => this._handleSubmit(data))}>
          Submit Comment
        </Button>
      </form>
    );
  }  
}

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({
  form: 'CommentForm'
})(CommentForm));

CommentForm.propTypes = {
  onAddComment: PropTypes.func.isRequired, 
  onHideCommentForm: PropTypes.func.isRequired, 
  postId: PropTypes.string.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};