import { useState } from 'react';
import { useCombobox, autocomplete } from '@szhsin/react-autocomplete';
import STATES from '../../data/states';

const Autocomplete = () => {
  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<string>();

  // It's up to you how to filter items based on the input value
  const items = value
    ? STATES.filter((item) => item.toLowerCase().startsWith(value.toLowerCase()))
    : STATES;

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
    feature: autocomplete({
      // The `select` option controls autocomplete in free or select mode
      // highlight-next-line
      select: true // or false
      // Other options: rovingText, deselectOnClear, deselectOnChange, closeOnSelect
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
          margin: 0,
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

export default Autocomplete;
