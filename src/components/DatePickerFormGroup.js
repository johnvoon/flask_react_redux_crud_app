import React from 'react';
import { DateField } from 'react-date-picker';
import classNames from 'classnames';

const DatePickerFormGroup = (field) => {
  const { input, meta, label } = field;
  const { onChange, ...inputProps } = input;
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
      <DateField
        className="form-control"
        dateFormat="DD/MM/YYYY"
        updateOnDateClick={true}
        collapseOnDateClick={true}
        onChange={(date) => onChange(date)}
        {...inputProps}
        />
       {error && <span className="text-error">{meta.error}</span>}
    </div>
  );
};

export default DatePickerFormGroup;