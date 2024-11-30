import { useState } from 'react';
import { useCombobox, autocompleteLite } from '@szhsin/react-autocomplete';
import STATES from '../../data/states';

// Simulate obtaining data from a remote server
let id = 0;
const fetchData = (value?: string) => {
  clearTimeout(id);
  if (!value || !value.trim()) return;

  return new Promise<string[]>((res) => {
    id = window.setTimeout(
      () =>
        res(STATES.filter((item) => item.toLowerCase().includes(value.toLowerCase().trim()))),
      500
    );
  });
};

const AsyncExample = () => {
  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<string>();
  const [items, setItems] = useState<string[]>();

  const {
    getInputProps,
    getClearProps,
    getListProps,
    getItemProps,
    open,
    focusIndex,
    isInputEmpty
  } = useCombobox({
    items: items || [],
    value,
    // highlight-start
    // Whenever the user types in the input, fetch data remotely and update the items.
    onChange: async (newValue) => {
      setValue(newValue);
      setItems(await fetchData(newValue));
    },
    // highlight-end
    selected,
    onSelectChange: setSelected,
    feature: autocompleteLite({
      select: true // or false
    })
  });

  return (
    <div>
      <div>
        <input placeholder="Type to search..." {...getInputProps()} />
        {!isInputEmpty && <button {...getClearProps()}>X</button>}
      </div>

      {open && items && (
        <ul
          {...getListProps()}
          style={{
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
                key={item}
                style={{
                  background: focusIndex === index ? '#ddd' : 'none',
                  textDecoration: selected === item ? 'underline' : 'none'
                }}
                {...getItemProps({ item, index })}
              >
                {item}
              </li>
            ))
          ) : (
            <li>No options</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AsyncExample;
