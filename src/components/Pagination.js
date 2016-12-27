import React, { Component } from 'react';
import _ from 'lodash'

const preventDefault = e => e.preventDefault();

export default class Pagination extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.totalPages !== nextProps.totalPages ||
      this.props.currentPage !== nextProps.currentPage ||
      this.props.pageNavLength !== nextProps.pageNavLength;
  }

  onChange(pageNumber, ev) {    
    ev.preventDefault();
    this.props.onPageNumberChange(pageNumber);
  }

  render() {
    const { totalPages, 
            pageNavLength, 
            currentPage } = this.props;

    if (totalPages === 0) return null

    let pagesFromCenter = Math.floor(pageNavLength / 2);
    let start = Math.max(currentPage - pagesFromCenter, 0);
    let end = Math.min(start + pageNavLength, totalPages);

    if (totalPages >= pageNavLength && end >= totalPages) {
      start = totalPages - pageNavLength;
    }

    let buttons = [];
    let btnEvent;
    let isCurrent;

    // Page number button handlers 
    _.range(start, end, 1).forEach(page => {
      isCurrent = currentPage === page;
      btnEvent = isCurrent ? preventDefault : this.onChange.bind(this, page);
      buttons.push(
        <li key={page} className={isCurrent ? 'active' : null}>
          <a role="button" href="#" onClick={btnEvent} tabIndex="0">
            <span>{page + 1}</span>
          </a>
        </li>
      );
    });

    // First and prev page button handlers
    let firstPage = preventDefault;
    let prevPage = preventDefault;
    let isFirst = currentPage === 0;
    if (!isFirst) {
      firstPage = this.onChange.bind(this, 0);
      prevPage = this.onChange.bind(this, currentPage - 1)
    }

    buttons = [
      <li key="first" className={isFirst ? 'disabled' : null}>
        <a role="button" href="#" tabIndex="0" onClick={firstPage}>
          <span className="fa fa-angle-double-left"></span>
        </a>
      </li>,
      <li key="prev" className={isFirst ? 'disabled' : null}>
        <a role="button" href="#" tabIndex="0" onClick={prevPage}>
          <span className="fa fa-angle-left"></span>
        </a>
      </li>
    ].concat(buttons);

    // Next and last page button handlers
    let nextPage = preventDefault;
    let lastPage = preventDefault;
    let isLast = currentPage === (totalPages - 1);
    if (!isLast) {
      nextPage = this.onChange.bind(this, currentPage + 1);
      lastPage = this.onChange.bind(this, totalPages - 1);
    }

    buttons = buttons.concat([
      <li key="next" className={isLast ? 'disabled' : null}>
        <a role="button" href="#" tabIndex="0" onClick={nextPage}>
          <span className="fa fa-angle-right"></span>
        </a>
      </li>,
      <li key="last" className={isLast ? 'disabled' : null}>
        <a role="button" href="#" tabIndex="0" onClick={lastPage}>
          <span className="fa fa-angle-double-right"></span>
        </a>
      </li>
    ]);

    return (
      <ul className={this.props.className}>
        {buttons}
      </ul>
    );
  }
}