import React from 'react';

const TableEditLink = (props) => {
  return (
    <button 
      className="btn btn-primary btn-sm"
      onClick={props.handleClick}>
      <span className="edit"/>
    </button>
  );
};

export default TableEditLink;
