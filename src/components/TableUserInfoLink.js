import React from 'react';

const TableUserInfoLink = (val, row) => {
  return (
    <a onClick={(event) => {
         event.preventDefault();
         this.setState({
         currentUser: row,
         showUserInfoModal: true
       })}}/>
  );
};

export default TableUserInfoLink