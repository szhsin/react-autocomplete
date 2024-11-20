'use strict';

var common = require('../common.js');
var useAutocomplete = require('./useAutocomplete.js');

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
