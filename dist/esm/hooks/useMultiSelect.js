import { defaultEqual } from '../common.js';
import { useAutocomplete } from './useAutocomplete.js';

const useMultiSelect = ({
  isEqual = defaultEqual,
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
    ...useAutocomplete({
      ...passthrough,
      selected,
      isEqual,
      isItemSelected,
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

export { useMultiSelect };
