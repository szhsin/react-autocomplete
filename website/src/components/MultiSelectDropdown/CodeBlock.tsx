import { useState } from 'react';
import { useMultiSelect, multiSelectDropdown } from '@szhsin/react-autocomplete';
import STATES from '../../data/states';

const MultiSelectDropdown = () => {
  const [value, setValue] = useState<string>();
  // You can set a few items to be selected initially
  const [selected, setSelected] = useState<string[]>(['Alaska', 'Florida']);
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
    isItemSelected,
    removeSelect,
    open,
    focusIndex,
    isInputEmpty
  } = useMultiSelect({
    // highlight-next-line
    flipOnSelect: true, // or false
    items,
    value,
    onChange: setValue,
    selected,
    onSelectChange: setSelected,
    // highlight-next-line
    feature: multiSelectDropdown({
      // Options: rovingText, closeOnSelect
      rovingText: true,
      closeOnSelect: false
    })
  });

  return (
    <div>
      <button {...getToggleProps()}>{selected.length} selected</button>
      {open && (
        <div
          {...getListProps()}
          style={{
            position: 'absolute',
            color: '#000',
            background: '#fff',
            maxWidth: 320
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              border: '2px solid #aaa',
              gap: 6,
              padding: 6
            }}
          >
            {selected.map((item) => (
              <button key={item} onClick={() => removeSelect(item)}>
                {item}
              </button>
            ))}
            <div>
              <input placeholder="Type..." {...getInputProps()} />
              {!isInputEmpty && <button {...getClearProps()}>X</button>}
            </div>
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
                    background: focusIndex === index ? '#ddd' : 'none'
                  }}
                  key={item}
                  {...getItemProps({ item, index })}
                >
                  {item}
                  {isItemSelected(item) && '✔️'}
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

export default MultiSelectDropdown;
