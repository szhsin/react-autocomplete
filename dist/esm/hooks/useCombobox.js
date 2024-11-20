import { defaultEqual } from '../common.js';
import { useAutocomplete } from './useAutocomplete.js';

const useCombobox = ({
  isEqual = defaultEqual,
  selected,
  onSelectChange,
  flipOnSelect,
  ...passthrough
}) => useAutocomplete({
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

export { useCombobox };
