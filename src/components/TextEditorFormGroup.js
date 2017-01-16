import React from 'react';
import RichTextHTML from './RichTextHTML';

const TextEditorFormGroup = (field) => {
  const { input, label, type, meta } = field;
  const error = meta.touched && meta.error;

  return (
    <div className={"form-group " + (error && "has-error has-feedback")}>
      <label className="col-sm-2" htmlFor={input.name}>
        <b>{label}</b>
      </label>
      <div className="col-sm-10">
        <RichTextHTML
          {...input}/>
        {error && <span className="text-danger">{meta.error}</span>}
      </div>
    </div>
  );
};

export default TextEditorFormGroup;
