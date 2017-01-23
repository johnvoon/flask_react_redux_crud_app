import React from 'react';
import Geosuggest from 'react-geosuggest';

const GeosuggestFormGroup = (field) => {
  const { input, label, type, meta, placeholder, fillInAddress, geolocate } = field;
  const error = meta.touched && meta.error;
  
  return (
    <div className={"form-group " + (error && "has-error has-feedback")}>
      <label className="col-sm-2" htmlFor={input.name}>
        <b>{label}</b>
      </label>
      <div className="col-sm-10">
        <Geosuggest 
          inputClassName="form-control"
          types={["geocode"]}
          country="AU"
          placeholder={placeholder}
          onSuggestSelect={fillInAddress}
          {...input}/>
        {error && <span className="text-danger">{meta.error}</span>}
      </div>
    </div>
  );
};

export default GeosuggestFormGroup;