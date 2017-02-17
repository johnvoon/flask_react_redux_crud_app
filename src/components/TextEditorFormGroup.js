import React from 'react';
import RichTextHTML from './RichTextHTML';
import classNames from 'classnames';

const TextEditorFormGroup = (field) => {
  const { input, label, type, meta } = field;
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
      <RichTextHTML
        {...input}/>
      {error && <span className="text-danger small">{meta.error}</span>}
    </div>
  );
};

export default TextEditorFormGroup;
