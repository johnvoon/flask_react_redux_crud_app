import React from 'react';
import moment from 'moment';

const TableDate = (val, row) => { //eslint-disable-line no-unused-vars
  const created = moment(val, "ddd DD-MMM-YYYY HH:mm:ss").format('DD/MM/YYYY');

  return <time>{created}</time>;
};

export default TableDate;