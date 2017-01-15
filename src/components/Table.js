import React, { Component, PropTypes } from 'react';

const buildSortProps = (data, column, sortBy, onSort) => {
  // set order (ascending or descending) if:
  // `sortBy` is not null; and 
  // `column` has a `prop` value.
  const order = sortBy && sortBy.prop === column.prop ? sortBy.order : 'none';
  const nextOrder = order === 'ascending' ? 'descending' : 'ascending';
  const sortEvent = onSort.bind(null, { prop: column.prop, order: nextOrder });

  return {
    'onClick': sortEvent,
    'onMouseDown': ev => ev.preventDefault(),
    'tabIndex': 0,
    'aria-sort': order
  };
};

const isEmpty = value => value === null || value === '';

const getCellValue = ({ prop, defaultContent, component }, row) => {
  return !isEmpty(prop) && isEmpty(row[prop]) ? defaultContent :
    component ? component(row[prop], row) : row[prop];
};

export default class Table extends Component {
  render() {
    const { onSort, columns, pageData, 
            sortBy, data } = this.props;
    
    const headers = columns.map((column, idx) => {
      let sortProps;
      let order;
      // Add sorting event if:-
      // onSort mapped to props;
      // column's `sortable` property not `false`; and
      // column has `prop` value assigned to it
      if (onSort && column.sortable !== false && 'prop' in column) {
        sortProps = buildSortProps(data, column, sortBy, onSort);
        order = sortProps['aria-sort'];
      }

      return (
        <th
          key={idx}
          // can specify column `width` prop if desired
          style={{width: column.width}}
          role="columnheader"
          scope="col"
          className="col-header"
          {...sortProps}>
          <span>{column.title}</span>
          {!order ? null :
            <span className={`sort ${order}`} aria-hidden="true" />}
        </th>
      );
    });
    const rows = pageData.map(id => {
      return (
        <tr key={id}>
          {columns.map((column, idx) =>
            <td key={idx}>
              {getCellValue(column, data[id])}
            </td>
          )}
        </tr>
      );
    });

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            {headers}
          </tr>
        </thead>
        <tbody>
          {rows.length ? rows : (
            <tr>
              <td colSpan={columns.length} className="text-center">No data to display</td>
            </tr>)}
        </tbody>
      </table>       
    );
  }  
}

Table.propTypes = {
  onSort: PropTypes.func.isRequired,
  sortBy: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  pageData: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired
};
