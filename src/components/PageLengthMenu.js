import React, { Component, PropTypes } from 'react';

export default class PageLengthMenu extends Component {
  render() {
    const { 
      pageLength,
      pageLengthOptions, 
      onPageLengthChange,
    } = this.props;

    return (
      <form className="form-inline">
        <div className="form-group">
          <label>
            Page length:
          </label>
          <select
            className="form-control"
            value={pageLength}
            onChange={onPageLengthChange}>
            {pageLengthOptions.map(option =>
              <option key={option} value={option}>
                {option === 0 ? 'All' : option}
              </option>
            )}
          </select>
        </div>
      </form>    
    );
  }
}

PageLengthMenu.propTypes = {
  onPageLengthChange: PropTypes.func.isRequired,
  pageLength: PropTypes.number.isRequired,
  pageLengthOptions: PropTypes.array.isRequired
};
