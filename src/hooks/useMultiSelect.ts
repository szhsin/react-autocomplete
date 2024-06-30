import type { MultiSelectProps, AdapterProps } from '../common';
import { adaptGetItemValue } from '../utils/adaptGetItemValue';
import { useAutocomplete } from './useAutocomplete';

const useMultiSelect = <T, FeatureYield extends object>({
  getItemValue,
  selected,
  onSelectChange: _onSelectChange = () => {},
  flipOnSelect,
  ...passthrough
}: MultiSelectProps<T, FeatureYield>) => {
  const removeItem = (item: T) => _onSelectChange(selected.filter((s) => s !== item));
  const removeSelect: AdapterProps<T>['removeSelect'] = (item) => {
    if (item) {
      removeItem(item);
    } else {
      _onSelectChange(selected.slice(0, selected.length - 1));
    }
  };

  return {
    ...useAutocomplete({
      ...passthrough,
      getItemValue: adaptGetItemValue(getItemValue),
      getSelectedValue: () => '',
      onSelectChange: (item) => {
        if (!item) return;

        if (selected.includes(item)) {
          if (flipOnSelect) removeItem(item);
        } else {
          _onSelectChange([...selected, item]);
        }
      },
      removeSelect
    }),
    removeSelect
  };
};

export { useMultiSelect };
