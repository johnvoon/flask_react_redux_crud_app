import React, { PropTypes } from 'react';
import Button from 'components/Button';

const TableDeleteLink = (props) => {
  return (
    <Button 
      customClassNames="btn-danger btn-sm"
      type="button"
      handleClick={props.handleClick}>
      <span className="delete"/>
    </Button>
  );
};

export default TableDeleteLink;

TableDeleteLink.propTypes = {
  handleClick: PropTypes.func.isRequired,
};