'use strict';

var common = require('../common.js');
var adaptGetItemValue = require('../utils/adaptGetItemValue.js');
var useAutocomplete = require('./useAutocomplete.js');

const useCombobox = ({
  isEqual = common.defaultEqual,
  getItemValue: _getItemValue,
  selected,
  onSelectChange,
  flipOnSelect,
  ...passthrough
}) => {
  const getItemValue = adaptGetItemValue.adaptGetItemValue(_getItemValue);
  return useAutocomplete.useAutocomplete({
    ...passthrough,
    isEqual,
    isItemSelected: item => isEqual(item, selected),
    getItemValue,
    getSelectedValue: () => getItemValue(selected),
    onSelectChange: newItem => {
      if (!isEqual(newItem, selected)) {
        onSelectChange?.(newItem);
      } else if (flipOnSelect) {
        onSelectChange?.();
      }
    }
  });
};

exports.useCombobox = useCombobox;
