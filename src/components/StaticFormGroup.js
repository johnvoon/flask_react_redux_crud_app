import React, { PropTypes } from 'react';

const StaticFormGroup = (props) => {
  const { label, text } = props;
  
  return (
    <div className="form-group">
      <label className="input-label col-sm-2">
        {label}
      </label>
      <p className="col-sm-10 form-control-static">
        {text}
      </p>
    </div>
  )
};

StaticFormGroup.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default StaticFormGroup;