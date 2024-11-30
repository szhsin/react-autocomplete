import { useState } from 'react';
import { useCombobox, autocomplete } from '@szhsin/react-autocomplete';
import { US_STATES_PLAIN as STATES } from '../data';
import { createRoot } from 'react-dom/client';

const ShadowDom = () => {
  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<string>();

  const items = value
    ? STATES.filter((item) => item.toLowerCase().startsWith(value.toLowerCase()))
    : STATES;

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
    value,
    onChange: setValue,
    selected,
    onSelectChange: setSelected,
    feature: autocomplete({ select: true })
  });

  return (
    <div>
      <h3>Shadow DOM</h3>
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
          <li>No results</li>
        )}
      </ul>
    </div>
  );
};

if (typeof document !== 'undefined' && !document.getElementById('shadow-container')) {
  const domElement = document.getElementById('__next');
  const container = document.createElement('div');
  container.id = 'shadow-container';
  domElement?.appendChild(container);
  const shadow = container.attachShadow({ mode: 'open' });

  const nestedContainer = document.createElement('div');
  nestedContainer.id = 'nested-shadow-container';
  const nestedShadow = nestedContainer.attachShadow({ mode: 'closed' });
  shadow.appendChild(nestedContainer);

  createRoot(nestedShadow).render(<ShadowDom />);
}

export default function Example() {
  return null;
}
