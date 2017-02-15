import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import ErrorAlert from '../components/ErrorAlert';

class DeleteRecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  render() {
    const { onDelete, onHide, onJWTExpired } = this.props;
    const { handleSubmit, submitting } = this.props;
    const { errorMessage } = this.state;

    return (
      <div>
        <p>Are you sure you want to delete this record? 
          WARNING: This action is irreversible</p> 
        <form>
          {errorMessage && <ErrorAlert message={errorMessage}/>}
          <div className="btn-toolbar">
            <button
              className="btn btn-primary pull-right" 
              type="submit"
              disabled={submitting}
              onClick={handleSubmit(() => {
                onDelete()
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
              Yes
            </button>        
          </div>
        </form>
      </div>
    );    
  }
}

DeleteRecordForm.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'DeleteRecordForm'
})(DeleteRecordForm);