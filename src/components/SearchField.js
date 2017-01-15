import React, { PropTypes } from 'react';

const SearchField = ({ filterValues, onFilter }) => {
  return (
    <div>
      <input
        className="form-control"
        type="search"
        value={filterValues}
        onChange={onFilter}
        placeholder="Search blog posts by keyword"
      />
    </div>    
  );
};

SearchField.propTypes = {
  onFilter: PropTypes.func.isRequired,
  filterValues: PropTypes.string.isRequired,
};

export default SearchField;