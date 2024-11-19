import { useState } from 'react';
import { useCombobox, supercomplete } from '@szhsin/react-autocomplete';
import STATES from '../../data/states';

const filterItems = (value?: string) =>
  value ? STATES.filter((item) => item.toLowerCase().startsWith(value.toLowerCase())) : STATES;

const Supercomplete = () => {
  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<string>();
  const items = filterItems(value);

  const {
    getLabelProps,
    getInputProps,
    getClearProps,
    getToggleProps,
    getListProps,
    getItemProps,
    open,
    focusIndex,
    isInputEmpty
  } = useCombobox({
    items,
    value,
    onChange: setValue,
    selected,
    onSelectChange: setSelected,
    feature: supercomplete({
      // highlight-start
      requestItem: (newValue) => {
        const items = filterItems(newValue);
        if (items.length > 0) return { index: 0, item: items[0] };
      },
      // highlight-end

      // The `select` option controls autocomplete in free or select mode
      select: false // or true
      // Other options: deselectOnClear, deselectOnChange, closeOnSelect
    })
  });

  return (
    <div>
      <label {...getLabelProps()}>State</label>
      <div>
        <input placeholder="Select or type..." {...getInputProps()} />
        {!isInputEmpty && <button {...getClearProps()}>X</button>}
        <button {...getToggleProps()}>{open ? '↑' : '↓'}</button>
      </div>

      <ul
        {...getListProps()}
        style={{
          display: open ? 'block' : 'none',
          position: 'absolute',
          listStyle: 'none',
          color: '#000',
          background: '#fff',
          overflow: 'auto',
          maxHeight: 300,
          padding: 0
        }}
      >
        {items.length ? (
          items.map((item, index) => (
            <li
              style={{
                background: focusIndex === index ? '#ddd' : 'none',
                textDecoration: selected === item ? 'underline' : 'none'
              }}
              key={item}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))
        ) : (
          <li>No results</li>
        )}
      </ul>
    </div>
  );
};

export default Supercomplete;
