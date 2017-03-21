import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import classNames from 'classnames';
import moment from 'moment';
import StaticFormGroup from 'components/StaticFormGroup';
import SelectFormGroup from 'components/SelectFormGroup';
import UserParticularsForm from './UserParticularsForm';
import { required } from 'utils';


const mapStateToProps = (state) => {
  const { adminPages } = state;
  
  return {
    ...adminPages
  };
};

class EditUserParticularsForm extends Component {
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
              label="Created">
              {userCreated}
            </StaticFormGroup>
          </div>
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Updated">
              {userUpdated}
            </StaticFormGroup>
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
                label="Role">
                {selectedRecord.role}
              </StaticFormGroup>
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
              label="Username">
              {selectedRecord.username}
            </StaticFormGroup>
          </div>
          <div className="col-sm-4">
            <StaticFormGroup 
              label="Email">
              {selectedRecord.email}
            </StaticFormGroup>
          </div>
        </div>
        <UserParticularsForm
          isDisplayed={true}/>
      </div>
    );    
  }
}

export default connect(
  mapStateToProps,
  null
)(EditUserParticularsForm);

EditUserParticularsForm.propTypes = {
  selectedRecord: PropTypes.object.isRequired,
  isDisplayed: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};