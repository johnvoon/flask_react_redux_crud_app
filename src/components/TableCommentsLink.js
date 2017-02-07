import React from 'react';

const TableCommentsLink = (props) => {
  const { data } = props;

  return (
    <Link 
      to={`/admin/posts/${data.id}/comments`}
      className="btn btn-primary btn-sm"
      onClick={props.handleClick}>
      <span className="comments"/>
    </Link>
  );
};

export default TableCommentsLink;
