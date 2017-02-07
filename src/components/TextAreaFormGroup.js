import React from 'react';
import classNames from 'classnames';

const TextAreaFormGroup = (field) => {
  const { input, label, meta, rows, placeholder } = field;
  const error = meta.touched && meta.error;

  return (
    <div className="form-group">
      <label className={classNames(
        "input-label",
        {"text-error": error})}>
        {label}
        <span/>
      </label>
      <textarea
        className={classNames(
          "form-control",
          {"bg-error": error})}
        rows={rows}
        placeholder={placeholder}
        {...input}/>
      {error && <span className="text-error">{meta.error}</span>}
    </div>
  );
};

export default TextAreaFormGroup;
