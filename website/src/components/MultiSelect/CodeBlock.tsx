import { useState } from 'react';
import { useMultiSelect, multiSelect } from '@szhsin/react-autocomplete';
import STATES from '../../data/states';

const MultiSelect = () => {
  const [value, setValue] = useState<string>();
  // You can set a few items to be selected initially
  const [selected, setSelected] = useState<string[]>(['Alaska', 'Florida']);
  // It's up to you how to filter items based on the input value
  const items = value
    ? STATES.filter((item) => item.toLowerCase().startsWith(value.toLowerCase()))
    : STATES;

  const {
    getLabelProps,
    getFocusCaptureProps,
    getInputProps,
    getClearProps,
    getToggleProps,
    getListProps,
    getItemProps,
    isItemSelected,
    removeSelect,
    focused,
    open,
    focusIndex,
    isInputEmpty
    // highlight-next-line
  } = useMultiSelect({
    // flipOnSelect: true or false,
    items,
    value,
    onChange: setValue,
    selected,
    onSelectChange: setSelected,
    // highlight-next-line
    feature: multiSelect({
      // Options: rovingText, closeOnSelect
      rovingText: true
    })
  });

  return (
    <div>
      <label {...getLabelProps()} {...getFocusCaptureProps()}>
        State
      </label>
      <div
        {...getFocusCaptureProps()}
        style={{
          border: '2px solid',
          borderColor: focused ? '#007bff' : '#aaa',
          borderRadius: 4,
          display: 'flex',
          flexWrap: 'wrap',
          maxWidth: 320,
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
  );
};

export default MultiSelect;
