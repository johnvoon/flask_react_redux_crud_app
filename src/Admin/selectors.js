import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';
import { sort, sortByDate, filter } from 'utils';

export const selectEditUserForm = formValueSelector('EditUserForm');

export const selectAddPublicUserForm = formValueSelector('AddPublicUserForm');

export const selectAddStaffForm = formValueSelector('AddStaffForm');

export const selectAddClientForm = formValueSelector('AddClientForm');

export const selectAdminPages = (state) =>
  state.adminPages;

export const selectData = createSelector(
  selectAdminPages,
  (adminPages) => adminPages.data
);

export const selectPageLength = createSelector(
  selectAdminPages,
  (adminPages) => adminPages.pageLength
);

export const selectCurrentPage = createSelector(
  selectAdminPages,
  (adminPages) => adminPages.currentPage
);
      
export const selectSortBy = createSelector(
  selectAdminPages,
  (adminPages) => adminPages.sortBy
);

export const selectFilterValues = createSelector(
  selectAdminPages,
  (adminPages) => adminPages.filterValues
);

export const selectFilteredData = createSelector(
  [selectData, selectFilterValues],
  (data, filterValues) => {
    return filter(filterValues, data);
  }
);

export const selectSortedData = createSelector(
  [selectData, selectFilteredData, selectSortBy],
  (data, filteredData, { prop, order }) => {
    if (prop === 'created') {
      return sortByDate(data, filteredData, order);
    } else {
      return sort(data, filteredData, prop, order);  
    }
  }
);

export const selectPageData = createSelector(
  [selectSortedData, selectPageLength, selectCurrentPage, selectSortBy],
  (sortedData, pageLength, currentPage, sortBy) => { //eslint-disable-line no-unused-vars
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
      Math.ceil(sortedData.length / pageLength);
  }
);