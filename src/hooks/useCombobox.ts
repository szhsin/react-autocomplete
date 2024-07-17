import type { ComboboxProps } from '../types';
import { defaultEqual } from '../common';
import { adaptGetItemValue } from '../utils/adaptGetItemValue';
import { useAutocomplete } from './useAutocomplete';

const useCombobox = <T, FeatureYield extends object>({
  isEqual = defaultEqual,
  getItemValue: _getItemValue,
  selected,
  onSelectChange,
  flipOnSelect,
  ...passthrough
}: ComboboxProps<T, FeatureYield>) => {
  const getItemValue = adaptGetItemValue(_getItemValue);
  return useAutocomplete({
    ...passthrough,
    isEqual,
    getItemValue,
    getSelectedValue: () => getItemValue(selected),
    onSelectChange: (newItem) => {
      if (!isEqual(newItem, selected)) {
        onSelectChange?.(newItem);
      } else if (flipOnSelect) {
        onSelectChange?.();
      }
    }
  });
};

export { useCombobox };
