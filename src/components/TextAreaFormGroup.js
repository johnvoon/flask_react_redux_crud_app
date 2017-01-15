import React from 'react';

const TextAreaFormGroup = (field) => {
  const { input, label, type, meta, rows } = field;
  const error = meta.touched && meta.error;

  return (
    <div className={"form-group " + (error && "has-error has-feedback")}>
      <label className="col-sm-2" htmlFor={input.name}>
        <b>{label}</b>
      </label>
      <div className="col-sm-10">
        <textarea 
          className="form-control"
          id={input.name}
          rows={rows}
          {...input}/>
        {error && <span className="text-danger">{meta.error}</span>}
      </div>
    </div>
  );
};

export default TextAreaFormGroup;
