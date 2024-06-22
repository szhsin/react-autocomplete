import { adaptGetItemValue } from '../utils/adaptGetItemValue.js';
import { useAutocomplete } from './useAutocomplete.js';

const useCombobox = ({
  getItemValue: _getItemValue,
  selected,
  onSelectChange,
  ...passthrough
}) => {
  const getItemValue = adaptGetItemValue(_getItemValue);
  return useAutocomplete({
    ...passthrough,
    getItemValue,
    getSelectedValue: () => getItemValue(selected),
    onSelectChange: newItem => newItem !== selected && (onSelectChange == null ? void 0 : onSelectChange(newItem))
  });
};

export { useCombobox };
