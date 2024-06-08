import React, { useState, useEffect, useRef } from 'react';
import {
  useAutocomplete,
  autocomplete,
  Feature,
  supercomplete,
  linearTraversal,
  groupedTraversal
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

export default function Home() {
  const [constricted, setConstricted] = useState(false);
  const [rovingText, setRovingText] = useState(true);
  const [selectOnBlur, setSelectOnBlur] = useState(true);
  const [deselectOnBlur, setDeselectOnBlur] = useState(false);
  const [value, setValue] = useState('');
  const [anotherValue, setAnotherValue] = useState('');
  const anotherRef = useRef(null);
  // const items = US_STATES.filter((item) => item.name.toLowerCase().startsWith(value.toLowerCase()));
  // const [myinput, setmyinput] = useState('');
  // const [items, setItems] = useState(US_STATES);
  // const feature = supercomplete<{ name: string; abbr: string }>();

  const groupedItems = getGroupedItems(value);

  const { getInputProps, getListProps, getItemProps, open, focusItem, selectedItem } =
    useAutocomplete({
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
      },
      // feature: autocomplete({ constricted, rovingText, selectOnBlur, deselectOnBlur }),
      feature: supercomplete({
        constricted,
        selectOnBlur,
        deselectOnBlur,
        getInlineItem: (newValue) =>
          getGroupedItems(newValue)[0]?.states.find((item) => !isItemDisabled(item))
        // getInlineItem: (newValue) =>
        //   new Promise((res) =>
        //     setTimeout(
        //       () => res(getGroupedItems(newValue)[0]?.states.find((item) => !isItemDisabled(item))),
        //       1000
        //     )
        //   )
      }),
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
      <div>Selected item: {selectedItem?.name}</div>
      <div>Focus item: {focusItem?.name}</div>
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
          deselectOnBlur
          <input
            type="checkbox"
            checked={deselectOnBlur}
            onChange={(e) => setDeselectOnBlur(e.target.checked)}
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
      <input className={styles.input} {...getInputProps()} />

      <button
        onClick={() => {
          // setInputValue('');
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
  );
}
