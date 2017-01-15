import React, { PropTypes } from 'react';

const ErrorAlert = ({message}) => {
  return (
    <div className="alert alert-danger" role="alert">
      <span className="" aria-hidden="true"/>
      <span className="sr-only">Error:</span>
      {message}
    </div>
  );
};

ErrorAlert.propTypes = {
  message: PropTypes.string.isRequired
};

export default ErrorAlert;