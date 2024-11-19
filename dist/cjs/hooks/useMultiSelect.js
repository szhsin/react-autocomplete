'use strict';

var common = require('../common.js');
var adaptGetItemValue = require('../utils/adaptGetItemValue.js');
var useAutocomplete = require('./useAutocomplete.js');

const useMultiSelect = ({
  isEqual = common.defaultEqual,
  getItemValue,
  selected,
  onSelectChange,
  flipOnSelect,
  ...passthrough
}) => {
  const removeItem = itemToRemove => onSelectChange?.(selected.filter(item => !isEqual(itemToRemove, item)));
  const removeSelect = item => {
    if (item) {
      removeItem(item);
    } else {
      selected.length && onSelectChange?.(selected.slice(0, selected.length - 1));
    }
  };
  const isItemSelected = item => selected.findIndex(s => isEqual(item, s)) >= 0;
  return {
    ...useAutocomplete.useAutocomplete({
      ...passthrough,
      isEqual,
      isItemSelected,
      getItemValue: adaptGetItemValue.adaptGetItemValue(getItemValue),
      getSelectedValue: () => '',
      onSelectChange: newItem => {
        if (!newItem) return;
        if (!isItemSelected(newItem)) {
          onSelectChange?.([...selected, newItem]);
        } else if (flipOnSelect) {
          removeItem(newItem);
        }
      },
      removeSelect
    }),
    removeSelect
  };
};

exports.useMultiSelect = useMultiSelect;
