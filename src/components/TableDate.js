import React from 'react';
import moment from 'moment';

const TableDate = (val, row) => {
  const created = moment(val, "ddd DD-MMM-YYYY HH:mm:ss").format('DD/MM/YYYY');

  return <time>{created}</time>;
};

export default TableDate;