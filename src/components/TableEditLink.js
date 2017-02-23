import React from 'react';
import Button from 'components/Button'

const TableEditLink = (props) => {
  return (
    <Button 
      customClassNames="btn-primary btn-sm"
      type="button"
      handleClick={props.handleClick}>
      <span className="edit"/>
    </Button>
  );
};

export default TableEditLink;
