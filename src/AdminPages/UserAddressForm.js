import React, { Component } from 'react';
import { Field } from 'redux-form';
import GeosuggestFormGroup from '../components/GeosuggestFormGroup';
import InputFormGroup from '../components/InputFormGroup';
import classNames from 'classnames';

export default class UserAddressForm extends Component {  
  render() {
    const { isDisplayed, fillInAddress } = this.props;

    return (
      <div className={classNames({
        hidden: !isDisplayed
      })}>
        <Field 
          name="addressSearch"
          type="text"
          component={GeosuggestFormGroup}
          label="Address Search"
          placeholder="Enter your address to search"
          fillInAddress={fillInAddress}/>
        <div className="row">
          <div className="col-sm-2">
            <Field 
              name="unitNumber"
              type="text"
              component={InputFormGroup}
              label="Unit Number"/>
          </div>
          <div className="col-sm-5">
            <Field 
              name="streetAddress"
              type="text"
              component={InputFormGroup}
              label="Street Address"/>
          </div>
          <div className="col-sm-5">
            <Field 
              name="suburb"
              type="text"
              component={InputFormGroup}
              label="Suburb"/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2">
            <Field 
              name="postcode"
              type="text"
              component={InputFormGroup}
              label="Postcode"/>
          </div>
          <div className="col-sm-5">
            <Field 
              name="state"
              type="text"
              component={InputFormGroup}
              label="State"/>
          </div>
          <div className="col-sm-5">
            <Field 
              name="country"
              type="text"
              component={InputFormGroup}
              label="Country"/>
          </div>
        </div>
      </div>
    );
  }
}
