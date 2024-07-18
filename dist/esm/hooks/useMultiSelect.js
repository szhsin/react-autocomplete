import { defaultEqual } from '../common.js';
import { adaptGetItemValue } from '../utils/adaptGetItemValue.js';
import { useAutocomplete } from './useAutocomplete.js';

const useMultiSelect = ({
  isEqual = defaultEqual,
  getItemValue,
  selected,
  onSelectChange: _onSelectChange = () => {},
  flipOnSelect,
  ...passthrough
}) => {
  const removeItem = itemToRemove => _onSelectChange(selected.filter(item => !isEqual(itemToRemove, item)));
  const removeSelect = item => {
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
      isItemSelected: item => selected.findIndex(s => isEqual(item, s)) >= 0,
      getItemValue: adaptGetItemValue(getItemValue),
      getSelectedValue: () => '',
      onSelectChange: newItem => {
        if (!newItem) return;
        if (selected.findIndex(item => isEqual(item, newItem)) < 0) {
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
