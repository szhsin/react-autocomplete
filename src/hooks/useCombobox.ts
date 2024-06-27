import type { ComboboxProps } from '../common';
import { adaptGetItemValue } from '../utils/adaptGetItemValue';
import { useAutocomplete } from './useAutocomplete';

const useCombobox = <T, FeatureYield extends object>({
  getItemValue: _getItemValue,
  selected,
  onSelectChange,
  ...passthrough
}: ComboboxProps<T, FeatureYield>) => {
  const getItemValue = adaptGetItemValue(_getItemValue);
  return useAutocomplete({
    ...passthrough,
    getItemValue,
    getSelectedValue: () => getItemValue(selected),
    onSelectChange: (newItem?: T | undefined) => newItem !== selected && onSelectChange?.(newItem)
  });
};

export { useCombobox };
