import { useState } from 'react';
import { useCombobox, autocomplete } from '@szhsin/react-autocomplete';
import FRUITS from '../../data/fruits';

// highlight-next-line
type Item = { value: string; creatable?: boolean };

const ActionItems = () => {
  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<Item>();

  const [fruits, setFruit] = useState(FRUITS);
  const items: Item[] = fruits
    .filter((fruit) => fruit.toLowerCase().includes((value || '').toLowerCase()))
    .map((fruit) => ({ value: fruit }));
  // highlight-start
  // If the value does not exist in the list of items, add a creatable action to the end.
  if (value && !items.find((item) => !item.creatable && item.value === value)) {
    items.push({ value, creatable: true });
  }
  // highlight-end

  const {
    getFocusCaptureProps,
    getLabelProps,
    getInputProps,
    getClearProps,
    getToggleProps,
    getListProps,
    getItemProps,
    isItemSelected,
    open,
    focusIndex,
    isInputEmpty
  } = useCombobox({
    items,
    getItemValue: (item) => item.value,
    isEqual: (a, b) => a?.value === b?.value,
    // highlight-start
    // Specify how to determine if an item is an action,
    isItemAction: (item) => !!item.creatable,
    // and what happens after the action is triggered.
    onAction: (item) => {
      if (item.creatable) {
        setSelected({ value: item.value });
        setFruit([item.value, ...fruits]);
      }
    },
    // highlight-end
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
        <input placeholder="Select or create..." {...getInputProps()} />
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
              {...getItemProps({ item, index })}
              key={item.value}
              style={{
                background: focusIndex === index ? '#ddd' : 'none',
                textDecoration: isItemSelected(item) ? 'underline' : 'none'
              }}
            >
              {/* highlight-next-line */}
              {item.creatable ? `Create "${item.value}"` : item.value}
            </li>
          ))
        ) : (
          <li>No options</li>
        )}
      </ul>
    </div>
  );
};

export default ActionItems;
