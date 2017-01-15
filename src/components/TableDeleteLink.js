import React from 'react';

const TableDeleteLink = (props) => {
  return (
    <button 
      className="btn btn-danger btn-sm"
      onClick={props.handleClick}>
      <span className="delete"/>
    </button>
  );
};

export default TableDeleteLink;