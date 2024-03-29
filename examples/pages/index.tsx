import React, { useState, useEffect } from 'react';
import {
  useAutocomplete,
  autocomplete,
  Feature,
  supercomplete,
  linearTraversal,
  groupedTraversal
} from '@szhsin/react-autocomplete';
import styles from '@/styles/Home.module.css';
import { LIST_GROUP_PLAIN, KEYED_GROUP_PLAIN, LIST_GROUP, KEYED_GROUP } from './data';

type Item = { name: string; abbr: string };
const getItemValue = (item: Item) => item.name;
const isItemDisabled = ({ abbr }: { abbr: string }) => true || abbr.startsWith('CO');

export default function Home() {
  const [value, setValue] = useState('');
  // const items = US_STATES.filter((item) => item.name.toLowerCase().startsWith(value.toLowerCase()));
  // const [myinput, setmyinput] = useState('');
  // const [items, setItems] = useState(US_STATES);
  // const feature = supercomplete<{ name: string; abbr: string }>();

  const groupedItems = KEYED_GROUP;
  console.log('render main');

  const {
    getInputProps,
    getListProps,
    getItemProps,
    setInputValue,
    open,
    focusItem,
    inlineComplete
  } = useAutocomplete({
    // traversal: linearTraversal({
    //   items,
    //   traverseInput: true
    // }),

    getItemValue,
    isItemDisabled,
    onChange: (value, meta) => {
      console.log('onChange', meta);
      setValue(value);
      // const item = US_STATES.filter((item) =>
      //   item.name.toLowerCase().startsWith(value.toLowerCase())
      // ).find((item) => !isItemDisabled(item));
      // // setItems(items);
      // item && inlineComplete({ item });
    },
    feature: supercomplete<Item>(),
    traversal: groupedTraversal({
      traverseInput: false,
      groupedItems
      // getItemsInGroup: g=>g.states
    })
  });

  // useEffect(() => {
  //   items.length && inlineComplete({ index: 0, value: items[0] });
  // }, [items, inlineComplete]);

  return (
    <div className={styles.wrapper}>
      <div>Current value: {value}</div>
      <div>Focus item: {focusItem?.name}</div>
      <input className={styles.input} {...getInputProps()} />

      <button
        onClick={() => {
          setInputValue('');
          // setItems(US_STATES);
          setValue('');
        }}
      >
        Clear
      </button>
      <ul
        {...getListProps()}
        className={styles.list}
        style={{
          position: 'absolute',
          border: '1px solid',
          // display: open && items.length ? 'block' : 'none'
          display: open ? 'block' : 'none'
        }}
      >
        <h3>US STATES</h3>
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

        {Object.entries(groupedItems).map(([key, group]) => (
          <React.Fragment key={key}>
            <li>
              <h4 style={{ color: 'lightskyblue', margin: '10px 0' }}>{key}</h4>
            </li>
            {group.map((item) => (
              <li
                className={isItemDisabled(item) ? styles.disabled : styles.option}
                key={item.abbr}
                style={{ background: focusItem === item ? '#0a0' : 'none' }}
                {...getItemProps({ item })}
              >
                {item.name}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
