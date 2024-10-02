import { useState } from 'react';
import { useCombobox, supercomplete } from '@szhsin/react-autocomplete';
import { US_STATES } from '../../src/__tests__/utils/data';

type Item = { name: string; abbr: string };
const getItemValue = (item: Item) => item.name;

const filterItems = (value?: string) =>
  value
    ? US_STATES.filter((item) => item.name.toLowerCase().startsWith(value.toLowerCase()))
    : US_STATES;

export default function () {
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
    flipOnSelect: true,
    getItemValue,
    items,
    value,
    onChange: setValue,
    selected,
    onSelectChange: setSelected,
    feature: supercomplete({
      requestItem: (newValue) => {
        const items = filterItems(newValue);
        if (items.length) return { index: 0, item: items[0] };
      }
    })
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

      {true && (
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
                backgroundColor: focusIndex === index ? 'red' : 'transparent',
                textDecoration: isItemSelected(item) ? 'underline' : 'none'
              }}
              {...getItemProps({ item, index })}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
