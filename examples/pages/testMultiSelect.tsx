import { useState } from 'react';
import { useMultiSelect, multiSelect } from '@szhsin/react-autocomplete';
import { US_STATES } from '../../src/__tests__/utils/data';

type Item = { name: string; abbr: string };
const getItemValue = (item: Item) => item.name;

const filterItems = (value?: string) =>
  value
    ? US_STATES.filter((item) => item.name.toLowerCase().startsWith(value.toLowerCase()))
    : US_STATES;

export default function () {
  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<Item[]>([]);
  const items = filterItems(value);

  const {
    getLabelProps,
    getInputProps,
    getListProps,
    getItemProps,
    getToggleProps,
    getClearProps,
    getInputWrapperProps,
    removeSelect,
    isItemSelected,
    open,
    focusIndex,
    isInputEmpty,
    focused
  } = useMultiSelect({
    flipOnSelect: true,
    getItemValue,
    items,
    value,
    onChange: setValue,
    selected,
    onSelectChange: setSelected,
    feature: multiSelect({ closeOnSelect: false })
  });

  const displayList = !!(open && items.length);

  return (
    <div>
      <div>
        value: <span data-testid="value">{value}</span>
      </div>

      <div>
        <label {...getLabelProps()}>State</label>
      </div>
      <div
        {...getInputWrapperProps()}
        style={{ border: '1px solid', borderColor: focused ? 'red' : 'white' }}
      >
        {selected.map((item) => (
          <button key={item.abbr} onClick={() => removeSelect(item)}>
            {item.name}
          </button>
        ))}
        <input {...getInputProps()} />
        {!isInputEmpty && <button {...getClearProps()}>Clear</button>}
        <button {...getToggleProps()}>{open ? 'Close' : 'Open'}</button>
      </div>

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
    </div>
  );
}
