import React from 'react';
import classNames from 'classnames';

const AsyncValidationFormGroup = (field) => {
  const { input, label, type, meta, placeholder } = field;
  const error = meta.touched && meta.error;

  return (
    <div className={classNames(
      {"async-validating": meta.asyncValidating})}>
      {label ? (
        <label className={classNames(
          "input-label",
          {"text-error": error})}>
          {label}
          <span/>
        </label>
      ) : null}
      <input
        className={classNames(
          "form-control",
          {"bg-error": error})}
        placeholder={placeholder}
        type={type}
        {...input}/>
      {error && <span className="text-error">{meta.error}</span>}
    </div>
  );
};

export default AsyncValidationFormGroup;