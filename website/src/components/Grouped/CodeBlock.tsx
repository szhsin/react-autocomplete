import React, { useState } from 'react';
import { useCombobox, autocomplete, mergeGroupedItems } from '@szhsin/react-autocomplete';
import GROUPED from '../../data/states-grouped';

const Grouped = () => {
  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<string>();

  // It's up to you how to filter items based on the input value
  const groups = value
    ? GROUPED.map(({ initial, states }) => ({
        initial,
        states: states.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
      })).filter((group) => group.states.length > 0)
    : GROUPED;

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
    // The main hook always expects a one-dimensional array,
    // and we provide a `mergeGroupedItems` utility to merge the groups.
    // highlight-next-line
    items: mergeGroupedItems({ groups, getItemsInGroup: (group) => group.states }),
    value,
    onChange: setValue,
    selected,
    onSelectChange: setSelected,
    feature: autocomplete({ select: true })
  });

  // highlight-next-line
  let itemIndex = -1;

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
          color: '#000',
          background: '#fff',
          overflow: 'auto',
          maxHeight: 300,
          margin: 0,
          padding: 0
        }}
      >
        {groups.length ? (
          groups.map(({ initial, states }) => (
            <React.Fragment key={initial}>
              <li>{initial}</li>
              {states.map((item) => {
                // `itemIndex` should be the index within the flattened array of items.
                // highlight-next-line
                itemIndex++;
                return (
                  <li
                    key={item}
                    {...getItemProps({ item, index: itemIndex })}
                    style={{
                      background: focusIndex === itemIndex ? '#ddd' : 'none',
                      textDecoration: selected === item ? 'underline' : 'none'
                    }}
                  >
                    {item}
                  </li>
                );
              })}
            </React.Fragment>
          ))
        ) : (
          <li>No options</li>
        )}
      </ul>
    </div>
  );
};

export default Grouped;
