import React from 'react';
import { DateField } from 'react-date-picker';
import classNames from 'classnames';
import moment from 'moment';

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
      {label ? (
        <label className={classNames(
          "input-label",
          {"text-error": error})}>
          {label}
          <span/>
        </label>
      ) : null}    
      <DateField
        className="form-control"
        dateFormat="DD/MM/YYYY"
        updateOnDateClick={true}
        collapseOnDateClick={true}
        onChange={(date) => onChange(date)}
        // monthsShown={2}
        {...inputProps}
        />
       {error && <span className="text-error">{meta.error}</span>}
    </div>
  );
};

export default DatePickerFormGroup;