import React, { Component } from 'react';
import Button from '../components/Button';

export default class RoleSelectForm extends Component {
  render() {
    const { handleClick } = this.props;
    
    return (
      <form>
        <p>Choose a user type</p>
        <div className="row">
          <div className="col-sm-4">
            <Button
              customClassNames="btn-primary"
              handleClick={handleClick}
              value="staff">
              Staff
            </Button>
          </div>
          <div className="col-sm-4">
            <Button
              customClassNames="btn-primary"
              handleClick={handleClick}
              value="client">
              Client
            </Button>
          </div>
          <div className="col-sm-4">
            <Button
              customClassNames="btn-primary"
              handleClick={handleClick}
              value="public">
              Public
            </Button>
          </div>
        </div>
      </form>
    )
  }
}
