import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import classNames from 'classnames';

const DatePickerFormGroup = (field) => {
  const { input, meta, label } = field;
  const { onChange, ...inputProps } = input;
  const error = meta.touched && meta.error;
  const dateTimeFormat = new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format;
  
  return (
    <div className="form-group">
      <label className={classNames(
        "input-label",
        {"text-error": error})}>
        {label}
        <span/>
      </label>    
      <DatePicker
        className="form-control"
        textFieldStyle={{height: '100%', "borderWidth": "0"}}
        container="inline"
        fullWidth={true}
        formatDate={dateTimeFormat}
        onChange={(event, date) => onChange(date)}
        {...inputProps}
        />
       {error && <span className="text-error">{meta.error}</span>}
    </div>
  );
};

export default DatePickerFormGroup;