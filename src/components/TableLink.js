import React, { PropTypes } from 'react';

const TableLink = (props) => {
  const { handleClick, text } = props;

  return (
    <a onClick={handleClick}>
      {text}
    </a>
  );
};

export default TableLink;

TableLink.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};