import React, { PropTypes } from 'react';

const SearchField = ({ filterValues, onFilter }) => {
  return (
    <div className="form-group">
      <div className="input-group">
        <input
          className="form-control"
          type="search"
          value={filterValues}
          onChange={onFilter}
          placeholder="Search blog posts by keyword"/>
        <span className="input-group-addon search"></span>        
      </div>
    </div>    
  );
};

SearchField.propTypes = {
  onFilter: PropTypes.func.isRequired,
  filterValues: PropTypes.string.isRequired,
};

export default SearchField;