import { useState } from 'react';
import { useCombobox, dropdown } from '@szhsin/react-autocomplete';
import STATES from '../../data/states';

const Dropdown = () => {
  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<string>();
  // It's up to you how to filter items based on the input value
  const items = value
    ? STATES.filter((item) => item.toLowerCase().startsWith(value.toLowerCase()))
    : STATES;

  const {
    getInputProps,
    getClearProps,
    getToggleProps,
    getListProps,
    getItemProps,
    open,
    focusIndex,
    isInputEmpty
  } = useCombobox({
    // flipOnSelect: true or false,
    items,
    value,
    onChange: setValue,
    selected,
    onSelectChange: setSelected,
    // highlight-next-line
    feature: dropdown({
      // Options: rovingText, closeOnSelect
      rovingText: true
    })
  });

  return (
    <div>
      <button {...getToggleProps()}>{selected || 'Select a state'}</button>

      {open && (
        <div
          {...getListProps()}
          style={{
            position: 'absolute',
            color: '#000',
            background: '#fff'
          }}
        >
          <div>
            <input placeholder="Type to search..." {...getInputProps()} />
            {!isInputEmpty && <button {...getClearProps()}>X</button>}
          </div>
          <ul
            style={{
              listStyle: 'none',
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
              <li>No options</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
