import React from 'react';

const TableUserInfoLink = (props) => {
  return (
    <a onClick={props.handleClick}>{props.username}</a>
  );
};

export default TableUserInfoLink