import React, { PropTypes } from 'react';

const SuccessAlert = ({message}) => {
  return (
    <div className="alert alert-success" role="alert">
      <span className="" aria-hidden="true"/>
      <span className="sr-only">Success:</span>
      {message}
    </div>
  );
};

SuccessAlert.propTypes = {
  message: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
  getJWT: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired
};

export default SuccessAlert;