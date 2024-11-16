import { useState } from 'react';
import { useCombobox, autocomplete } from '@szhsin/react-autocomplete';
import STATES from '../../data/states-obj';

const ObjectItems = () => {
  const [value, setValue] = useState<string>();
  // highlight-next-line
  const [selected, setSelected] = useState<{ name: string; abbr: string }>();
  const items = value
    ? STATES.filter((item) => item.name.toLowerCase().startsWith(value.toLowerCase()))
    : STATES;

  const {
    getFocusCaptureProps,
    getLabelProps,
    getInputProps,
    getClearProps,
    getToggleProps,
    getListProps,
    getItemProps,
    // highlight-next-line
    isItemSelected,
    open,
    focusIndex,
    isInputEmpty
  } = useCombobox({
    items,
    // When items are objects, you must specify how to retrieve the text value from the item.
    // highlight-next-line
    getItemValue: (item) => item.name,

    // If item references change on each render, you should define how items are equal.
    // By default, it compares object references if `isEqual` is not provided.
    // highlight-next-line
    isEqual: (item1, item2) => item1?.abbr === item2?.abbr,

    value,
    onChange: setValue,
    selected,
    onSelectChange: setSelected,
    feature: autocomplete({ select: true })
  });

  return (
    <div>
      <label {...getLabelProps()} {...getFocusCaptureProps()}>
        State
      </label>

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
                // Use `isItemSelected` to check if an item has been selected
                // highlight-next-line
                textDecoration: isItemSelected(item) ? 'underline' : 'none'
              }}
              key={item.abbr}
              {...getItemProps({ item, index })}
            >
              {item.name}
            </li>
          ))
        ) : (
          <li>No results</li>
        )}
      </ul>
    </div>
  );
};

export default ObjectItems;
