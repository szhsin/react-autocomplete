import type { MultiSelectProps } from '../common';
import { adaptGetItemValue } from '../utils/adaptGetItemValue';
import { useAutocomplete } from './useAutocomplete';

const useMultiSelect = <T, FeatureYield extends object>({
  getItemValue,
  selected,
  onSelectChange,
  ...passthrough
}: MultiSelectProps<T, FeatureYield>) =>
  useAutocomplete({
    ...passthrough,
    getItemValue: adaptGetItemValue(getItemValue),
    getSelectedValue: () => '',
    onSelectChange: (item?: T | undefined) => {
      if (!item) return;
      if (!selected.includes(item)) onSelectChange?.([...selected, item]);
    }
  });

export { useMultiSelect };
