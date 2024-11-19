import { useState } from 'react';
import { type ComboboxProps, useCombobox, autocomplete, supercomplete } from '../..';
import type { AutocompleteFeatureProps } from '../../types';
import { autocompleteFocus } from './autocompleteFocus';
import { US_STATES } from './data';

type Item = { name: string; abbr: string };
const getItemValue = (item: Item) => item.name;

const filterItems = (value?: string) =>
  value
    ? US_STATES.filter((item) => item.name.toLowerCase().startsWith(value.toLowerCase()))
    : US_STATES;

export const Autocomplete = ({
  isSupercomplete,
  isAutoFocus,
  ...props
}: Partial<ComboboxProps<Item>> &
  AutocompleteFeatureProps<Item> & { isSupercomplete?: boolean; isAutoFocus?: boolean }) => {
  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<Item>();
  const items = filterItems(value);

  const {
    getLabelProps,
    getInputProps,
    getToggleProps,
    getClearProps,
    getListProps,
    getItemProps,
    open,
    focusIndex,
    isInputEmpty,
    isItemSelected
  } = useCombobox({
    ...props,
    getItemValue,
    items,
    value,
    onChange: setValue,
    selected,
    onSelectChange: setSelected,
    feature:
      isSupercomplete || isAutoFocus
        ? (isSupercomplete ? supercomplete : autocompleteFocus)({
            ...props,
            onRequestItem: ({ value: newValue }, res) => {
              const items = filterItems(newValue);
              if (items.length) {
                res({ index: 0, item: items[0] });
              }
            }
          })
        : autocomplete(props)
  });

  const displayList = !!(open && items.length);

  return (
    <div>
      <div>
        value: <span data-testid="value">{value}</span>
      </div>
      <div>
        selected: <span data-testid="selected">{selected?.name}</span>
      </div>

      <div>
        <label {...getLabelProps()}>State</label>
      </div>
      <input {...getInputProps()} />
      {!isInputEmpty && <button {...getClearProps()}>Clear</button>}
      <button {...getToggleProps()}>{open ? 'Close' : 'Open'}</button>

      <ul
        {...getListProps()}
        style={{
          display: displayList ? 'block' : 'none',
          position: 'absolute',
          overflow: 'auto',
          maxHeight: 300
        }}
      >
        <li data-testid="header">header</li>
        {items.map((item, index) => (
          <li
            key={item.abbr}
            style={{
              color: props.isItemDisabled?.(item) ? 'gray' : 'white',
              backgroundColor: focusIndex === index ? 'red' : 'transparent',
              textDecoration: isItemSelected(item) ? 'underline' : 'none'
            }}
            {...getItemProps({ item, index })}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
