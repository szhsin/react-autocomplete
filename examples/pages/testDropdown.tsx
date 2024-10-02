import { useState } from 'react';
import { useCombobox, dropdown } from '@szhsin/react-autocomplete';
import { US_STATES_STRING } from '../../src/__tests__/utils/data';

const filterItems = (value?: string) =>
  value
    ? US_STATES_STRING.filter((item) => item.toLowerCase().startsWith(value.toLowerCase()))
    : US_STATES_STRING;

export default function () {
  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<string>();
  const items = filterItems(value);

  const {
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
    items,
    value,
    onChange: setValue,
    selected,
    onSelectChange: setSelected,
    feature: dropdown()
  });

  const displayList = !!(open && items.length);

  return (
    <div>
      <div>
        value: <span data-testid="value">{value}</span>
      </div>
      <div>
        selected: <span data-testid="selected">{selected}</span>
      </div>

      <div>
        <button {...getToggleProps()}>Select</button>
      </div>

      {displayList && (
        <div
          {...getListProps()}
          style={{
            position: 'absolute'
          }}
        >
          <div>
            <input {...getInputProps()} />
            {!isInputEmpty && <button {...getClearProps()}>Clear</button>}
          </div>
          <ul
            style={{
              overflow: 'auto',
              maxHeight: 300
            }}
          >
            <li data-testid="header">header</li>
            {items.map((item, index) => (
              <li
                key={item}
                style={{
                  backgroundColor: focusIndex === index ? 'red' : 'transparent',
                  textDecoration: isItemSelected(item) ? 'underline' : 'none'
                }}
                {...getItemProps({ item, index })}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
