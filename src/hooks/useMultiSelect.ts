import type { MultiSelectProps, AdapterProps } from '../types';
import { defaultEqual } from '../common';
import { adaptGetItemValue } from '../utils/adaptGetItemValue';
import { useAutocomplete } from './useAutocomplete';

const useMultiSelect = <T, FeatureYield extends object>({
  isEqual = defaultEqual,
  getItemValue,
  selected,
  onSelectChange,
  flipOnSelect,
  ...passthrough
}: MultiSelectProps<T, FeatureYield>) => {
  const removeItem = (itemToRemove: T) =>
    onSelectChange?.(selected.filter((item) => !isEqual(itemToRemove, item)));

  const removeSelect: AdapterProps<T>['removeSelect'] = (item) => {
    if (item) {
      removeItem(item);
    } else {
      selected.length && onSelectChange?.(selected.slice(0, selected.length - 1));
    }
  };

  const isItemSelected = (item: T) => selected.findIndex((s) => isEqual(item, s)) >= 0;

  return {
    ...useAutocomplete({
      ...passthrough,
      isEqual,
      isItemSelected,
      getItemValue: adaptGetItemValue(getItemValue),
      getSelectedValue: () => '',
      onSelectChange: (newItem) => {
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
