import React, { PropTypes } from 'react';

const StaticFormGroup = (props) => {
  const { label, children } = props;
  
  return (
    <div className="form-group">
      <label className="input-label">
        {label}
      </label>
      <p className="form-control-static">
        {children}
      </p>
    </div>
  );
};

StaticFormGroup.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default StaticFormGroup;