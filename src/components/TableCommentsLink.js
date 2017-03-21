import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const TableCommentsLink = (props) => {
  const { data } = props;

  return (
    <Link 
      to={`/admin/posts/${data.id}/comments`}
      className="btn btn-primary btn-sm">
      <span className="comments"/>
    </Link>
  );
};

export default TableCommentsLink;

TableCommentsLink.propTypes = {
  data: PropTypes.object.isRequired
};