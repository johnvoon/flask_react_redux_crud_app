import React from 'react';
import classNames from 'classnames';
import RichTextHTML from 'components/RichTextHTML';


const TextEditorFormGroup = (field) => {
  const { input, label, meta } = field;
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
