import React, { PropTypes } from 'react';
import Button from 'components/Button';

const ButtonToolbar = (props) => {
  const { onHideModal, pristine, submitting, 
    reset, handleSubmit } = props;

  return (
    <div className="btn-toolbar">
      <Button
        customClassNames="btn-default pull-right" 
        type="button" 
        handleClick={onHideModal}>
        Close
      </Button>
      <Button 
        customClassNames="btn-danger pull-left" 
        type="button" 
        disabled={pristine || submitting} 
        handleClick={reset}>
        Reset
      </Button>
      <Button 
        customClassNames="btn-primary pull-right" 
        type="submit"
        disabled={submitting}
        handleClick={handleSubmit}>
        Save
      </Button>
    </div>
  );
};

ButtonToolbar.propTypes = {
  onHideModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default ButtonToolbar;