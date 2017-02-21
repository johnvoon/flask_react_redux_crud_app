import React from 'react';
import classNames from 'classnames';

const SelectFormGroup = (field) => {
  const { input, label, meta, options, handleChange } = field;
  const error = meta.touched && meta.error;

  return (
    <div className="form-group">
      {label ? (
        <label className={classNames(
          "input-label",
          {"text-error": error})}>
          {label}
          <span/>
        </label>
      ) : null}
      <select
        className={classNames(
          "form-control",
          {"bg-error": error})}
        {...input}>
        <option value="">Select {label}</option>
        {options.map((option) => {
          const [id, text] = option.split(" - ");
          return (
            <option key={id} value={id}>{text}</option>
          );
        })}
      </select>
      {error && <span className="text-error">{meta.error}</span>}
    </div>
  );
};

export default SelectFormGroup;