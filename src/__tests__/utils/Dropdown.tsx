import { useState } from 'react';
import { useCombobox, dropdown } from '../..';
import type { ComboboxProps } from '../../types';
import { US_STATES_STRING } from './data';

const filterItems = (value?: string) =>
  value
    ? US_STATES_STRING.filter((item) => item.toLowerCase().startsWith(value.toLowerCase()))
    : US_STATES_STRING;

export const Dropdown = (
  props: Partial<ComboboxProps<string>> & Parameters<typeof dropdown<string>>[0]
) => {
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
    isInputEmpty
  } = useCombobox({
    ...props,
    flipOnSelect: true,
    items,
    value,
    onChange: setValue,
    selected,
    onSelectChange: setSelected,
    feature: dropdown(props)
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
                key={index}
                style={{
                  backgroundColor: focusIndex === index ? 'red' : 'transparent',
                  textDecoration: selected === item ? 'underline' : 'none'
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
};
