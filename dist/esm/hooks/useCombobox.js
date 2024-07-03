import { defaultEqual } from '../common.js';
import { adaptGetItemValue } from '../utils/adaptGetItemValue.js';
import { useAutocomplete } from './useAutocomplete.js';

const useCombobox = ({
  isEqual = defaultEqual,
  getItemValue: _getItemValue,
  selected,
  onSelectChange,
  flipOnSelect,
  ...passthrough
}) => {
  const getItemValue = adaptGetItemValue(_getItemValue);
  return useAutocomplete({
    ...passthrough,
    isEqual,
    getItemValue,
    getSelectedValue: () => getItemValue(selected),
    onSelectChange: newItem => {
      if (!isEqual(newItem, selected)) {
        onSelectChange == null || onSelectChange(newItem);
      } else if (flipOnSelect) {
        onSelectChange == null || onSelectChange();
      }
    }
  });
};

export { useCombobox };
