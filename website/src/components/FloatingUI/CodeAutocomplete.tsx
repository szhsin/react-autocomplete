import { useState } from 'react';
import { useCombobox, autocomplete } from '@szhsin/react-autocomplete';
import { useFloating, autoUpdate, size } from '@floating-ui/react-dom';
import STATES from '../../data/states';

const Autocomplete = () => {
  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<string>();
  const items = value
    ? STATES.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
    : STATES;

  // highlight-start
  const { refs, floatingStyles } = useFloating<HTMLInputElement>({
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [
      size({
        padding: 16,
        apply({ availableHeight, elements }) {
          // This allows the autocomplete list to take up all the available height.
          elements.floating.style.maxHeight = `${availableHeight}px`;
        }
      })
    ]
  });
  // highlight-end

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
    // Provide the `inputRef` prop with the reference returned from the `useFloating` hook
    // highlight-next-line
    inputRef: refs.reference,
    items,
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
        <input
          placeholder="Select or type..."
          {...getInputProps()}
          // Set the reference element to the input field,
          // which should always come after {...getInputProps()}
          // highlight-next-line
          ref={refs.setReference}
        />
        {!isInputEmpty && <button {...getClearProps()}>X</button>}
        <button {...getToggleProps()}>{open ? '↑' : '↓'}</button>
      </div>

      {open && (
        <ul
          // Set the floating element to the autocomplete list
          // highlight-next-line
          ref={refs.setFloating}
          {...getListProps()}
          style={{
            listStyle: 'none',
            color: '#000',
            background: '#fff',
            margin: 0,
            padding: 0,
            overflow: 'auto',
            // Apply floating positioning styles to the autocomplete list
            // highlight-next-line
            ...floatingStyles
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
      )}
    </div>
  );
};

export default Autocomplete;
