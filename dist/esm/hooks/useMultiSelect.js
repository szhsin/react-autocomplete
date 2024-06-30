import { adaptGetItemValue } from '../utils/adaptGetItemValue.js';
import { useAutocomplete } from './useAutocomplete.js';

const useMultiSelect = ({
  getItemValue,
  selected,
  onSelectChange: _onSelectChange = () => {},
  flipOnSelect,
  ...passthrough
}) => {
  const removeItem = item => _onSelectChange(selected.filter(s => s !== item));
  const removeSelect = item => {
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
      onSelectChange: item => {
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
