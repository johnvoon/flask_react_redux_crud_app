import React from 'react';
import Geosuggest from 'react-geosuggest';
import classNames from 'classnames';

const GeosuggestFormGroup = (field) => {
  const { input, label, meta, placeholder, fillInAddress, geolocate } = field;
  const error = meta.touched && meta.error;
  
  return (
    <div className="form-group">
      <label className={classNames(
        "input-label",
        {"text-error": error})}>
        {label}
        <span/>
      </label>      
      <Geosuggest 
        inputClassName="form-control"
        types={["geocode"]}
        country="AU"
        placeholder={placeholder}
        onSuggestSelect={fillInAddress}
        {...input}/>
      {error && <span className="text-danger">{meta.error}</span>}
    </div>
  );
};

export default GeosuggestFormGroup;