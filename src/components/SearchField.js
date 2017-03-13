import React, { PropTypes } from 'react';

const SearchField = ({ filterValues, onFilter, placeholder }) => {
  return (
    <div className="form-group">
      <div className="input-group">
        <input
          className="form-control"
          type="search"
          value={filterValues}
          onChange={onFilter}
          placeholder={placeholder}/>
        <span className="input-group-addon search"/>
      </div>
    </div>    
  );
};

SearchField.propTypes = {
  onFilter: PropTypes.func.isRequired,
  filterValues: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default SearchField;