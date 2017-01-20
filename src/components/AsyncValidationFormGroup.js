import React from 'react';

const AsyncValidationFormGroup = (field) => {
  const { input, label, type, meta, placeholder } = field;
  const error = meta.touched && meta.error;

  return (
    <div className={"form-group " + (error && "has-error has-feedback")}>
      <label className="col-sm-2" htmlFor={input.name}>
        <b>{label}</b>
      </label>
      <div className={"col-sm-10 " + (meta.asyncValidating ? 'async-validating' : '')}>
        <input 
          className="form-control"
          id={input.name}
          type={type}
          value={input.value}
          placeholder={placeholder}
          {...input}/>
        {error && <span className="text-danger">{meta.error}</span>}
      </div>
    </div>
  );
};

export default AsyncValidationFormGroup;