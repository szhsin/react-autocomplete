import type { MultiSelectProps } from '../common';
import { adaptGetItemValue } from '../utils/adaptGetItemValue';
import { useAutocomplete } from './useAutocomplete';

const useMultiSelect = <T, FeatureYield extends object>({
  getItemValue,
  selected,
  onSelectChange,
  flipOnSelect,
  ...passthrough
}: MultiSelectProps<T, FeatureYield>) =>
  useAutocomplete({
    ...passthrough,
    getItemValue: adaptGetItemValue(getItemValue),
    getSelectedValue: () => '',
    onSelectChange: (item?: T | undefined) => {
      if (!item) return;

      if (selected.includes(item)) {
        if (flipOnSelect) onSelectChange?.(selected.filter((s) => s !== item));
      } else {
        onSelectChange?.([...selected, item]);
      }
    }
  });

export { useMultiSelect };
