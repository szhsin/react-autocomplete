import React, { useState, useEffect } from 'react';
import {
  useCombobox,
  dropdown,
  mergeGroupedItems,
  useAutoHeight
} from '@szhsin/react-autocomplete';
import styles from '@/styles/Home.module.css';
import { LIST_GROUP_PLAIN, KEYED_GROUP_PLAIN, LIST_GROUP, KEYED_GROUP } from '../data';

type Item = { name: string; abbr: string };
const getItemValue = (item: Item) => item.name;
const isItemDisabled = ({ abbr }: Item) => abbr.startsWith('CO');

const filterGroupedItems = (value: string = '') =>
  LIST_GROUP.map((group) => ({
    ...group,
    states: group.states.filter((item) =>
      item.name.toLowerCase().startsWith(value.toLowerCase())
    )
  })).filter((group) => !!group.states.length);

export default function Dropdown() {
  const [rovingText, setRovingText] = useState(false);
  const [selectOnBlur, setSelectOnBlur] = useState(true);
  const [closeOnSelect, setCloseOnSelect] = useState(true);
  const [value, setValue] = useState<string | undefined>('');
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();

  const groupedItems = filterGroupedItems(value);

  const {
    getInputProps,
    getListProps,
    getItemProps,
    getToggleProps,
    getClearProps,
    isInputEmpty,
    open,
    focusIndex,
    inputRef
    // inlineComplete
  } = useCombobox({
    // traversal: linearTraversal({
    //   items,
    //   traverseInput: true
    // }),
    flipOnSelect: true,
    getItemValue,
    isItemDisabled,
    value,
    onChange: (value) => {
      console.log('onChange', value);
      setValue(value);
      // const item = US_STATES.filter((item) =>
      //   item.name.toLowerCase().startsWith(value.toLowerCase())
      // ).find((item) => !isItemDisabled(item));
      // // setItems(items);
      // const item = filterGroupedItems(value)[0]?.states.find((item) => !isItemDisabled(item));
      // item && inlineComplete({ item });
    },
    selected: selectedItem,
    onSelectChange: setSelectedItem,
    // feature: autocomplete({ constricted, rovingText }),
    feature: dropdown({ rovingText, selectOnBlur, closeOnSelect }),
    items: mergeGroupedItems({
      groups: groupedItems,
      getItemsInGroup: (group) => group.states
    })
  });

  const [maxHeight] = useAutoHeight({ anchorRef: inputRef, show: open, margin: 30 });
  let itemIndex = 0;

  return (
    <div className={styles.wrapper}>
      <div>Current value: {value}</div>
      <div>Selected item: {selectedItem?.name}</div>
      <div>focusIndex: {focusIndex}</div>
      <input placeholder="test" />

      <div>
        <label>
          rovingText
          <input
            type="checkbox"
            checked={rovingText}
            onChange={(e) => setRovingText(e.target.checked)}
          />
        </label>
      </div>

      <div>
        <label>
          selectOnBlur
          <input
            type="checkbox"
            checked={selectOnBlur}
            onChange={(e) => setSelectOnBlur(e.target.checked)}
          />
        </label>
      </div>

      <div>
        <label>
          closeOnSelect
          <input
            type="checkbox"
            checked={closeOnSelect}
            onChange={(e) => setCloseOnSelect(e.target.checked)}
          />
        </label>
      </div>

      <button {...getToggleProps()}>{selectedItem?.name || 'Select'}</button>
      <div
        {...getListProps()}
        style={{
          position: 'absolute',
          border: '1px solid',
          // display: open && items.length ? 'block' : 'none'
          display: open ? 'block' : 'none'
        }}
      >
        <div style={{ padding: 20 }}>
          <input
            className={styles.input}
            {...getInputProps()}
            placeholder="Search a state..."
          />
          {!isInputEmpty && (
            <button
              className={styles.clearButton}
              style={{ position: 'absolute', transform: 'translate(-120%, 10%)' }}
              {...getClearProps()}
            >
              ❎
            </button>
          )}
        </div>

        {/* {items.map((item) => (
          <li
            className={isItemDisabled(item) ? styles.disabled : styles.option}
            key={item.abbr}
            style={{ background: focusItem === item ? '#0a0' : 'none' }}
            {...getItemProps({ item })}
          >
            {item.name}
          </li>
        ))} */}

        <ul style={{ overflow: 'auto', maxHeight }}>
          <li>
            <h3>US STATES</h3>
          </li>
          {groupedItems.map(({ groupKey: key, states: group }) => (
            <React.Fragment key={key}>
              <li>
                <h4 style={{ color: 'lightskyblue', margin: '10px 0' }}>{key}</h4>
              </li>
              {group.map((item) => (
                <li
                  className={isItemDisabled(item) ? styles.disabled : styles.option}
                  key={item.abbr}
                  style={{
                    background: focusIndex === itemIndex ? '#0a0' : 'none',
                    textDecoration: selectedItem === item ? 'underline' : 'none'
                  }}
                  {...getItemProps({ item, index: itemIndex++ })}
                >
                  {item.name}
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      </div>
      <button>next</button>
    </div>
  );
}
