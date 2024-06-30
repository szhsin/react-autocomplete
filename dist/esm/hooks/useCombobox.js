import { adaptGetItemValue } from '../utils/adaptGetItemValue.js';
import { useAutocomplete } from './useAutocomplete.js';

const useCombobox = ({
  getItemValue: _getItemValue,
  selected,
  onSelectChange,
  flipOnSelect,
  ...passthrough
}) => {
  const getItemValue = adaptGetItemValue(_getItemValue);
  return useAutocomplete({
    ...passthrough,
    getItemValue,
    getSelectedValue: () => getItemValue(selected),
    onSelectChange: newItem => {
      if (newItem !== selected) {
        onSelectChange == null || onSelectChange(newItem);
      } else if (flipOnSelect) {
        onSelectChange == null || onSelectChange();
      }
    }
  });
};

export { useCombobox };
