import React, { useState, useEffect, useRef } from 'react';
import {
  useMultiSelect,
  multiSelect,
  linearTraversal,
  groupedTraversal
} from '@szhsin/react-autocomplete';
import styles from '@/styles/Home.module.css';
import { LIST_GROUP_PLAIN, KEYED_GROUP_PLAIN, LIST_GROUP, KEYED_GROUP } from '../data';

type Item = { name: string; abbr: string };
const isEqual = (itemA?: Item, itemB?: Item) =>
  itemA === itemB || (itemA?.name === itemB?.name && itemA?.abbr === itemB?.abbr);
const getItemValue = (item: Item) => item.name;
const isItemDisabled = ({ abbr }: Item) => abbr.startsWith('CO');
let addItemCounter = 1;

const getGroupedItems = (value: string) =>
  LIST_GROUP.map((group) => ({
    ...group,
    states: group.states.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    )
  })).filter((group) => !!group.states.length);

export default function Home() {
  const [rovingText, setRovingText] = useState(true);
  const [closeOnSelect, setCloseOnSelect] = useState(false);

  const [value, setValue] = useState<string | undefined>();
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const [anotherValue, setAnotherValue] = useState('');
  const anotherRef = useRef(null);
  // const items = US_STATES.filter((item) => item.name.toLowerCase().startsWith(value.toLowerCase()));
  // const [myinput, setmyinput] = useState('');
  // const [items, setItems] = useState(US_STATES);
  // const feature = supercomplete<{ name: string; abbr: string }>();

  const groupedItems = getGroupedItems(value || '');
  if (value) {
    groupedItems.push({
      groupKey: 'Add',
      states: [{ name: value, abbr: 'Add' }]
    });
  }

  const {
    getInputProps,
    getListProps,
    getItemProps,
    getToggleProps,
    getClearProps,
    getInputWrapperProps,
    open,
    focusItem,
    clearable,
    removeSelect,
    focused
  } = useMultiSelect({
    // traversal: linearTraversal({
    //   items,
    //   traverseInput: true
    // }),
    getItemValue,
    isItemDisabled,
    flipOnSelect: true,
    value,
    onChange: (value) => {
      // console.log('onChange', value);
      setValue(value);
    },
    selected: selectedItems,
    onSelectChange: (items) => {
      console.log('onSelectChange', items.length);
      setSelectedItems(items);
    },
    isEqual,
    isItemAction: (item) => item.abbr === 'Add',
    onAction: (item) => {
      console.log('Creating', item.name);
      setSelectedItems([
        ...selectedItems,
        { name: item.name, abbr: (addItemCounter++).toString() }
      ]);
    },

    feature: multiSelect({ rovingText, closeOnSelect }),
    traversal: groupedTraversal({
      traverseInput: true,
      groupedItems,
      getItemsInGroup: (gp) => gp.states
    })
  });

  // getInputProps().ref.current

  return (
    <div className={styles.wrapper}>
      <div>value: {value}</div>
      <div>Focus item: {focusItem?.name}</div>

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
          closeOnSelect
          <input
            type="checkbox"
            checked={closeOnSelect}
            onChange={(e) => setCloseOnSelect(e.target.checked)}
          />
        </label>
      </div>

      <div>
        <input
          ref={anotherRef}
          value={anotherValue}
          onChange={(e) => {
            setAnotherValue(e.target.value);
          }}
        />
        <button
          onClick={() => {
            setValue(anotherValue);
          }}
        >
          Sync value
        </button>
      </div>

      <div
        className={styles.multiInputWrapper + (focused ? ` ${styles.focused}` : '')}
        {...getInputWrapperProps()}
      >
        {selectedItems.map((item) => (
          <div className={styles.selectedItem} key={item.abbr}>
            {item.name}
            <span onClick={() => removeSelect(item)}>❎</span>
          </div>
        ))}

        <div className={styles.multiInputContainer}>
          <input className={`${styles.input} ${styles.multiInput}`} {...getInputProps()} />
          {clearable && (
            <button className={styles.clearButton} {...getClearProps()}>
              ❎
            </button>
          )}
        </div>
      </div>

      <button {...getToggleProps()}>{open ? '⬆️' : '⬇️'}</button>
      <button>next</button>
      <input type="search" />
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

        {groupedItems.map(({ groupKey: key, states: group }) => (
          <React.Fragment key={key}>
            {key !== 'Add' ? (
              <li>
                <h4 style={{ color: 'lightskyblue', margin: '10px 0' }}>{key}</h4>
              </li>
            ) : (
              <hr />
            )}
            {group.map((item) => (
              <li
                className={isItemDisabled(item) ? styles.disabled : styles.option}
                key={item.abbr}
                style={{
                  background: isEqual(focusItem, item) ? '#0a0' : 'none',
                  textDecoration:
                    selectedItems.findIndex((s) => isEqual(item, s)) >= 0
                      ? 'underline'
                      : 'none'
                }}
                {...getItemProps({ item: { ...item } })}
              >
                {item.abbr === 'Add' ? `Create "${item.name}"` : item.name}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
