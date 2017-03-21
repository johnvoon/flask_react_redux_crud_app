import React, { Component, PropTypes } from 'react';
import ButtonBlock from 'components/ButtonBlock';

export default class RoleSelectForm extends Component {
  render() {
    const { handleClick } = this.props;
    
    return (
      <form>
        <p>Choose a user type</p>
        <div className="row">
          <div className="col-sm-4">
            <ButtonBlock
              customClassNames="btn-primary"
              type="button"
              handleClick={handleClick}>
              Staff
            </ButtonBlock>
          </div>
          <div className="col-sm-4">
            <ButtonBlock
              customClassNames="btn-primary"
              type="button"
              handleClick={handleClick}>
              Client
            </ButtonBlock>
          </div>
          <div className="col-sm-4">
            <ButtonBlock
              customClassNames="btn-primary"
              type="button"
              handleClick={handleClick}>
              Public
            </ButtonBlock>
          </div>
        </div>
      </form>
    );
  }
}

RoleSelectForm.propTypes = {
  handleClick: PropTypes.func.isRequired 
};