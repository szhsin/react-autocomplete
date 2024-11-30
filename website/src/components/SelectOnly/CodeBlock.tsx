import { useState } from 'react';
import { useCombobox, autocomplete } from '@szhsin/react-autocomplete';
import FRUITS from '../../data/fruits';

const SelectOnly = () => {
  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<string>();

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
    // items are fixed
    // highlight-next-line
    items: FRUITS,
    value,
    onChange: setValue,
    selected,
    onSelectChange: setSelected,
    feature: autocomplete({ select: true })
  });

  return (
    <div>
      <label {...getLabelProps()} {...getFocusCaptureProps()}>
        Fruit
      </label>

      <div>
        <input
          // Make the input readonly
          // highlight-next-line
          readOnly
          placeholder="Select..."
          {...getInputProps()}
        />
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
        {FRUITS.map((item, index) => (
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
        ))}
      </ul>
    </div>
  );
};

export default SelectOnly;
