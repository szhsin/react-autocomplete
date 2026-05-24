'use strict';

var common = require('../common.cjs');
var useAutocomplete = require('./useAutocomplete.cjs');

const useCombobox = ({
  isEqual = common.defaultEqual,
  selected,
  onSelectChange,
  flipOnSelect,
  ...passthrough
}) => useAutocomplete.useAutocomplete({
  ...passthrough,
  selected,
  isEqual,
  isItemSelected: item => isEqual(item, selected),
  onSelectChange: newItem => {
    if (!isEqual(newItem, selected)) {
      onSelectChange?.(newItem);
    } else if (flipOnSelect) {
      onSelectChange?.();
    }
  }
});

exports.useCombobox = useCombobox;
