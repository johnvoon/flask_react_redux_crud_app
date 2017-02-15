import React from 'react';
import Select from 'react-select'
import classNames from 'classnames';

const MultiselectFormGroup = (field) => {
  const { input, label, meta, placeholder, options } = field;
  const { onChange, onBlur, ...inputProps } = input;
  const error = meta.touched && meta.error;
  const multiselectOptions = (options || []).map((option) => {
    const [id, text] = option.split(" - ");
    return { value: id, label: text };
  });
  
  return (
    <div className="form-group">
      <label className={classNames(
        "input-label",
        {"text-error": error})}>
        {label}
        <span/>
      </label>
      <Select 
        placeholder={placeholder}
        value={input.value}
        options={multiselectOptions}
        multi={true}
        clearable={true}
        simpleValue
        onChange={(value) => input.onChange(value)}
        onBlur={() => input.onBlur(input.value)}
        {...inputProps}/>
      {error && <span className="text-danger">{meta.error}</span>}
    </div>
  );
};

export default MultiselectFormGroup;