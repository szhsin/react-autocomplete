'use strict';

var common = require('../../common.cjs');

const label = () => ({
  id
}) => {
  const inputId = common.getId(id, 'i');
  const labelId = common.getId(id, 'a');
  return {
    getLabelProps: () => ({
      id: labelId,
      htmlFor: inputId
    }),
    getInputProps: () => ({
      id: inputId
    }),
    getListProps: () => ({
      'aria-labelledby': labelId
    })
  };
};

exports.label = label;
