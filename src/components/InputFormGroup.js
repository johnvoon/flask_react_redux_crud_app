import React from 'react';

const InputFormGroup = (field) => {
  const { input, label, type, meta } = field;
  const error = meta.touched && meta.error;
  
  return (
    <div className={"form-group " + (error && "has-error has-feedback")}>
      <label className="col-sm-2" htmlFor={input.name}>
        <b>{label}</b>
      </label>
      <div className="col-sm-10">
        <input 
          className="form-control"
          id={input.name}
          type={type}
          value={input.value}
          {...input}/>
        {error && <span className="text-danger">{meta.error}</span>}
      </div>
    </div>
  );
};

export default InputFormGroup;