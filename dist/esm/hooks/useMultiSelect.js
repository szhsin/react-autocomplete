import { adaptGetItemValue } from '../utils/adaptGetItemValue.js';
import { useAutocomplete } from './useAutocomplete.js';

const useMultiSelect = ({
  getItemValue,
  selected,
  onSelectChange,
  ...passthrough
}) => useAutocomplete({
  ...passthrough,
  getItemValue: adaptGetItemValue(getItemValue),
  getSelectedValue: () => '',
  onSelectChange: item => {
    if (!item) return;
    if (!selected.includes(item)) onSelectChange == null || onSelectChange([...selected, item]);
  }
});

export { useMultiSelect };
