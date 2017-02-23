import React, { Component } from 'react';
import { Field } from 'redux-form';
import classNames from 'classnames';
import moment from 'moment';
import StaticFormGroup from 'components/StaticFormGroup';
import SelectFormGroup from 'components/SelectFormGroup';
import { required } from 'utils';


const mapStateToProps = (state) => {
  const { adminPages } = state;
  
  return {
    ...adminPages
  };
};

export default class EditUserParticularsForm extends Component {
  render() {
    const { selectedRecord, isDisplayed, handleChange } = this.props;
    const userCreated = moment(selectedRecord.created, "ddd DD-MMM-YYYY HH:mm:ss").format('DD/MM/YY HH:mm:ss');
    const userUpdated = moment(selectedRecord.updated, "ddd DD-MMM-YYYY HH:mm:ss").format('DD/MM/YY HH:mm:ss');
    const activeOptions = ["1 - Active", "2 - Disabled"];
    const roleOptions = ["client - Client", "staff - Staff", "public - Public"];
    
    return (
      <div className={classNames({
        hidden: !isDisplayed
      })}>
        <div className="row">
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Created"
              text={userCreated}/>
          </div>
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Updated"
              text={userUpdated}/>
          </div>
          <div className="col-sm-4">
            <Field 
              name="active"
              component={SelectFormGroup}
              label="Status"
              validate={required}
              options={activeOptions}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            {selectedRecord.role === 'staff' || selectedRecord.role === 'client' ? (
              <StaticFormGroup 
                label="Role"
                text={selectedRecord.role}/>
            ) : (
              <Field 
                name="role"
                component={SelectFormGroup}
                label="Role"
                options={roleOptions}
                handleChange={handleChange}/>
            )}
          </div>
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Username"
              text={selectedRecord.username}/>
          </div>
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Email"
              text={selectedRecord.email}/>
          </div>
        </div>
        <UserParticularsForm
          isDisplayed={true}/>
      </div>
    );    
  }
}
