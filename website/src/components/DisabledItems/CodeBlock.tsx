import { useState } from 'react';
import { useCombobox, autocomplete } from '@szhsin/react-autocomplete';
import FRUITS from '../../data/fruits';

// highlight-next-line
const isItemDisabled = (item: string) => item.includes('berry');

const DisabledItems = () => {
  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<string>();
  const items = value
    ? FRUITS.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
    : FRUITS;

  const {
    getFocusCaptureProps,
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
    // highlight-next-line
    isItemDisabled,
    value,
    onChange: setValue,
    selected,
    onSelectChange: setSelected,
    feature: autocomplete({ select: true })
  });

  return (
    <div>
      <label {...getLabelProps()} {...getFocusCaptureProps()}>
        Fruit (no berries)
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
          margin: 0,
          padding: 0
        }}
      >
        {items.length ? (
          items.map((item, index) => (
            <li
              style={{
                background: focusIndex === index ? '#ddd' : 'none',
                textDecoration: selected === item ? 'underline' : 'none',
                // highlight-next-line
                color: isItemDisabled(item) ? '#999' : '#000'
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
  );
};

export default DisabledItems;
