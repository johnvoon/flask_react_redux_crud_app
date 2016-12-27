import React from 'react';

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
  )
}

export default SearchField;