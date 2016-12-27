import _ from 'lodash';

export function sort({prop, order}, data) {
  return _.orderBy(data, prop, order === 'descending' ? 'desc' : 'asc');
}

export function sortByDate(data, order) {
  return data.sort((a, b) => {
    if (order === 'ascending') {
      return new Date(a.created) - new Date(b.created);
    } else {
      return new Date(b.created) - new Date(a.created);  
    }
  });
}

export function filter(filterValues, data) {
  return data.filter((record) => {
    return _.some(record, containsIgnoreCase.bind(null, filterValues));
  });
}

export function containsIgnoreCase(filterValues, record) {
  filterValues = String(filterValues).toLowerCase().trim();
  record = String(record).toLowerCase().trim();

  return record.indexOf(filterValues) >= 0;
}