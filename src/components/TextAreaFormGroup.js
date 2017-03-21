import React from 'react';
import TextArea from 'react-textarea-autosize';
import classNames from 'classnames';

const TextAreaFormGroup = (field) => {
  const { input, label, meta, rows, placeholder } = field;
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
      <TextArea
        className={classNames(
          "form-control",
          {"bg-error": error})}
        minRows={rows}
        defaultValue={placeholder}
        {...input}/>
      {error && <span className="text-error">{meta.error}</span>}
    </div>
  );
};

export default TextAreaFormGroup;
