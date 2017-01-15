import React from 'react';

const SelectFormGroup = (field) => {
  const { input, label, type, meta, options } = field;
  const error = meta.touched && meta.error;

  return (
    <div className={"form-group " + (error && "has-error has-feedback")}>
      <label className="col-sm-2" htmlFor={input.name}>
        <b>{label}</b>
      </label>
      <div className="col-sm-10">
        <select 
          className="form-control" 
          id={input.name}
          {...input}>
          <option value="">Select {label}</option>
          {options.map((option) => {
            const [id, text] = option.split(" - ");
            return (
              <option key={id} value={id}>{text}</option>
            );
          })}
        </select>
        {error && <span className="text-danger">{meta.error}</span>}
      </div>
    </div>
  );
};

export default SelectFormGroup;