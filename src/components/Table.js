import React, { Component } from 'react';

const buildSortProps = (column, sortBy, onSort) => {
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
}

const isEmpty = value => value === null || value === '';

const getCellValue = ({ prop, defaultContent, render }, row) =>
  !isEmpty(prop) && isEmpty(row[prop]) ? defaultContent :
    render ? render(row[prop], row) :
    row[prop];

export default class Table extends Component {
  render() {
    const { onSort, columns, trKey, pageData, 
            sortBy } = this.props;
    const getUniqueKey = (row, key) => row[key];
    
    const headers = columns.map((column, idx) => {
      let sortProps;
      let order;
      // Add sorting event if:-
      // onSort mapped to props;
      // column's `sortable` property not `false`; and
      // column has `prop` value assigned to it
      if (onSort && column.sortable !== false && 'prop' in column) {
        sortProps = buildSortProps(column, sortBy, onSort);
        order = sortProps['aria-sort']
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

    const rows = pageData.map(row => {
      return (
        <tr key={getUniqueKey(row, trKey)}>
          {columns.map((column, idx) =>
            <td key={idx}>
              {getCellValue(column, row)}
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


