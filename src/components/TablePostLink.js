import React from 'react';
import { Link } from 'react-router';

const TablePostLink = (val, row) => {
  return (
    <Link to={`/blog/${row.id}`}>
      {val}
    </Link>
  );
};

export default TablePostLink;