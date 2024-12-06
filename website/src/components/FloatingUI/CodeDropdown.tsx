import { useState, useRef } from 'react';
import { useCombobox, dropdown } from '@szhsin/react-autocomplete';
import { useFloating, autoUpdate, size } from '@floating-ui/react-dom';
import STATES from '../../data/states';

const Dropdown = () => {
  // highlight-next-line
  const listRef = useRef<HTMLUListElement>(null);
  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<string>();
  const items = value
    ? STATES.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
    : STATES;

  // highlight-start
  const { refs, floatingStyles } = useFloating<HTMLButtonElement>({
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [
      size({
        padding: 16,
        apply({ availableHeight }) {
          // This allows the dropdown list to take up all the available height.
          if (listRef.current && inputRef.current) {
            listRef.current.style.maxHeight = `${availableHeight - inputRef.current.getBoundingClientRect().height}px`;
          }
        }
      })
    ]
  });
  // highlight-end

  const {
    getInputProps,
    getClearProps,
    getToggleProps,
    getListProps,
    getItemProps,
    open,
    focusIndex,
    isInputEmpty,
    inputRef
  } = useCombobox({
    items,
    value,
    onChange: setValue,
    selected,
    onSelectChange: setSelected,
    feature: dropdown({
      // Provide the `toggleRef` prop with the reference returned from the `useFloating` hook
      // highlight-next-line
      toggleRef: refs.reference
    })
  });

  return (
    <div>
      <button
        {...getToggleProps()}
        // Set the reference element to the toggle button,
        // which should always come after {...getToggleProps()}
        // highlight-next-line
        ref={refs.setReference}
      >
        {selected || 'Select a state'}
      </button>

      {open && (
        <div
          {...getListProps()}
          // Set the floating element to the dropdown list
          // highlight-next-line
          ref={refs.setFloating}
          style={{
            color: '#000',
            background: '#fff',
            // Apply floating positioning styles to the dropdown list
            // highlight-next-line
            ...floatingStyles
          }}
        >
          <div>
            <input placeholder="Type to search..." {...getInputProps()} />
            {!isInputEmpty && <button {...getClearProps()}>X</button>}
          </div>
          <ul
            // highlight-next-line
            ref={listRef}
            style={{
              overflow: 'auto',
              listStyle: 'none',
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
              <li>No options</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
