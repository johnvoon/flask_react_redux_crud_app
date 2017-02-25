import React, { PropTypes } from 'react';

const TableUserInfoLink = (props) => {
  const { handleClick, username } = props;

  return (
    <a onClick={handleClick}>
      {username}
    </a>
  );
};

export default TableUserInfoLink;

TableUserInfoLink.propTypes = {
  handleClick: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
};