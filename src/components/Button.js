import React from 'react';

const Button = ({ onLoadMore }) => {
  const loadMoreEvent = (ev) => {
    ev.preventDefault();
    onLoadMore();
  };

  return (
    <div className="text-center">
      <button
        className="btn"
        onClick={loadMoreEvent.bind(null)}
      >
        Load More...
      </button>
    </div>
  );
};

export default Button;