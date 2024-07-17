import type { MultiSelectProps, AdapterProps } from '../types';
import { defaultEqual } from '../common';
import { adaptGetItemValue } from '../utils/adaptGetItemValue';
import { useAutocomplete } from './useAutocomplete';

const useMultiSelect = <T, FeatureYield extends object>({
  isEqual = defaultEqual,
  getItemValue,
  selected,
  onSelectChange: _onSelectChange = () => {},
  flipOnSelect,
  ...passthrough
}: MultiSelectProps<T, FeatureYield>) => {
  const removeItem = (itemToRemove: T) =>
    _onSelectChange(selected.filter((item) => !isEqual(itemToRemove, item)));

  const removeSelect: AdapterProps<T>['removeSelect'] = (item) => {
    if (item) {
      removeItem(item);
    } else {
      selected.length && _onSelectChange(selected.slice(0, selected.length - 1));
    }
  };

  return {
    ...useAutocomplete({
      ...passthrough,
      isEqual,
      getItemValue: adaptGetItemValue(getItemValue),
      getSelectedValue: () => '',
      onSelectChange: (newItem) => {
        if (!newItem) return;

        if (selected.findIndex((item) => isEqual(item, newItem)) < 0) {
          _onSelectChange([...selected, newItem]);
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
