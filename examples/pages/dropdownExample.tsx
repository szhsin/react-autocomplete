import React, { useState, useEffect } from 'react';
import {
  useAutocomplete,
  autocomplete,
  dropdown,
  Feature,
  supercomplete,
  linearTraversal,
  groupedTraversal,
  useAutoHeight
} from '@szhsin/react-autocomplete';
import styles from '@/styles/Home.module.css';
import { LIST_GROUP_PLAIN, KEYED_GROUP_PLAIN, LIST_GROUP, KEYED_GROUP } from '../data';

type Item = { name: string; abbr: string };
const getItemValue = (item: Item) => item.name;
const isItemDisabled = ({ abbr }: Item) => abbr.startsWith('CO');

const getGroupedItems = (value: string) =>
  LIST_GROUP.map((group) => ({
    ...group,
    states: group.states.filter((item) => item.name.toLowerCase().startsWith(value.toLowerCase()))
  })).filter((group) => !!group.states.length);

export default function Dropdown() {
  const [constricted, setConstricted] = useState(false);
  const [rovingText, setRovingText] = useState(false);
  const [value, setValue] = useState('');
  // const items = US_STATES.filter((item) => item.name.toLowerCase().startsWith(value.toLowerCase()));
  // const [myinput, setmyinput] = useState('');
  // const [items, setItems] = useState(US_STATES);
  // const feature = supercomplete<{ name: string; abbr: string }>();

  const groupedItems = getGroupedItems(value);

  const {
    getInputProps,
    getListProps,
    getItemProps,
    getToggleProps,
    open,
    focusItem,
    selectedItem
    // inlineComplete
  } = useAutocomplete({
    // traversal: linearTraversal({
    //   items,
    //   traverseInput: true
    // }),
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
      // const item = getGroupedItems(value)[0]?.states.find((item) => !isItemDisabled(item));
      // item && inlineComplete({ item });
    },
    // feature: autocomplete({ constricted, rovingText }),
    feature: dropdown({ rovingText }),
    traversal: groupedTraversal({
      traverseInput: true,
      groupedItems,
      getItemsInGroup: (gp) => gp.states
    })
  });

  // useEffect(() => {
  //   items.length && inlineComplete({ index: 0, value: items[0] });
  // }, [items, inlineComplete]);

  const inputProps = getInputProps();

  // useEffect(() => {
  //   if (open) {
  //     console.log('inputProps.ref.current useEffect', inputProps.ref.current);
  //     inputProps.ref.current?.focus();
  //   }
  // }, [open]);

  const [maxHeight] = useAutoHeight({ anchorRef: inputProps.ref, show: open, margin: 30 });

  return (
    <div className={styles.wrapper}>
      <div>Current value: {value}</div>
      <div>Current item: {selectedItem?.name}</div>
      <div>Focus item: {focusItem?.name}</div>
      <input placeholder="test" />
      <div>
        <label>
          Constricted
          <input
            type="checkbox"
            checked={constricted}
            onChange={(e) => setConstricted(e.target.checked)}
          />
        </label>
      </div>
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
          <input className={styles.input} {...inputProps} />
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
                    background: focusItem === item ? '#0a0' : 'none',
                    textDecoration: item === selectedItem ? 'underline' : 'none'
                  }}
                  {...getItemProps({ item })}
                >
                  {item.name}
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}
