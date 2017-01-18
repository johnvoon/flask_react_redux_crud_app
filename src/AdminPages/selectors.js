import { createSelector } from 'reselect';
import _ from 'lodash';
import { sort, sortByDate, filter } from '../utils';

const selectAdminPages = (state) =>
  state.adminPages

const selectRecordIds = createSelector(
  selectAdminPages,
  (adminPages) => adminPages.recordIds
)

const selectData = createSelector(
  selectAdminPages,
  (adminPages) => adminPages.data
)

const selectPageLength = createSelector(
  selectAdminPages,
  (adminPages) => adminPages.pageLength
) 

const selectCurrentPage = createSelector(
  selectAdminPages,
  (adminPages) => adminPages.currentPage
)
      
const selectSortBy = createSelector(
  selectAdminPages,
  (adminPages) => adminPages.sortBy
)

const selectFilterValues = createSelector(
  selectAdminPages,
  (adminPages) => adminPages.filterValues
)

const selectFilteredData = createSelector(
  [selectData, selectFilterValues],
  (data, filterValues) => {
    return filter(filterValues, data);
  }
)

const selectSortedData = createSelector(
  [selectData, selectFilteredData, selectSortBy],
  (data, filteredData, { prop, order }) => {
    if (prop === 'created') {
      return sortByDate(data, filteredData, order);
    } else {
      return sort(data, filteredData, prop, order);  
    }
  }
)

export const selectPageData = createSelector(
  [selectSortedData, selectPageLength, selectCurrentPage, selectSortBy],
  (sortedData, pageLength, currentPage, sortBy) => {
  // sortBy must be included to tell reselect to recompute
    if (pageLength === 0) return sortedData;
    
    const start = pageLength * currentPage;
    return sortedData.slice(start, start + pageLength);
  }
);

export const selectTotalPages = createSelector(
  [selectSortedData, selectPageLength],
  (sortedData, pageLength) => {
    return pageLength === 0 ? 0 : 
      Math.ceil(sortedData.length / pageLength)
  }
)