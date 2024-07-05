import React, { useState, useEffect, useRef } from 'react';
import {
  useCombobox,
  autocomplete,
  supercomplete,
  linearTraversal,
  groupedTraversal
} from '@szhsin/react-autocomplete';
import styles from '@/styles/Home.module.css';
import { LIST_GROUP_PLAIN, KEYED_GROUP_PLAIN, LIST_GROUP, KEYED_GROUP } from '../data';
import { autocompleteFocus } from '../features/autocompleteFocus';

type Item = { name: string; abbr: string };
const getItemValue = (item: Item) => item.name;
const isItemDisabled = ({ abbr }: Item) => abbr.startsWith('CO');

const getGroupedItems = (value: string) =>
  LIST_GROUP.map((group) => ({
    ...group,
    states: group.states.filter((item) =>
      item.name.toLowerCase().startsWith(value.toLowerCase())
    )
  })).filter((group) => !!group.states.length);

export default function Home() {
  const [selectedFeature, setSelectedFeature] = useState('supercomplete');
  const [select, setselect] = useState(false);
  const [rovingText, setRovingText] = useState(true);
  const [selectOnBlur, setSelectOnBlur] = useState(true);
  const [deselectOnClear, setDeselectOnClear] = useState(true);
  const [deselectOnChange, setDeselectOnChange] = useState(true);
  const [closeOnSelect, setCloseOnSelect] = useState(true);

  const [value, setValue] = useState<string | undefined>();
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();

  const [anotherValue, setAnotherValue] = useState('');
  const anotherRef = useRef(null);
  // const items = US_STATES.filter((item) => item.name.toLowerCase().startsWith(value.toLowerCase()));
  // const [myinput, setmyinput] = useState('');
  // const [items, setItems] = useState(US_STATES);
  // const feature = supercomplete<{ name: string; abbr: string }>();

  const featureProps = {
    select,
    selectOnBlur,
    deselectOnClear,
    deselectOnChange,
    closeOnSelect,
    rovingText
  };

  const groupedItems = getGroupedItems(value || '');

  const {
    getInputProps,
    getListProps,
    getItemProps,
    getToggleProps,
    getClearProps,
    open,
    focusItem,
    clearable
  } = useCombobox({
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
    selected: selectedItem,
    onSelectChange: (item) => {
      // console.log('onSelectedItemChange', item);
      setSelectedItem(item);
    },

    feature:
      selectedFeature === 'supercomplete'
        ? supercomplete({
            ...featureProps,
            getFocusItem: (newValue) =>
              getGroupedItems(newValue)[0]?.states.find((item) => !isItemDisabled(item))
            // getInlineItem: (newValue) =>
            //   new Promise((res) =>
            //     setTimeout(
            //       () => res(getGroupedItems(newValue)[0]?.states.find((item) => !isItemDisabled(item))),
            //       1000
            //     )
            //   )
          })
        : selectedFeature === 'autocompleteFocus'
        ? autocompleteFocus({
            ...featureProps,
            getFocusItem: (newValue) =>
              getGroupedItems(newValue)[0]?.states.find((item) => !isItemDisabled(item))
          })
        : autocomplete(featureProps),

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

      <select
        value={selectedFeature} // ...force the select's value to match the state variable...
        onChange={(e) => setSelectedFeature(e.target.value)} // ... and update the state variable on any change!
      >
        <option value="supercomplete">supercomplete</option>
        <option value="autocomplete">autocomplete</option>
        <option value="autocompleteFocus">autocompleteFocus</option>
      </select>

      <div>
        <label>
          select
          <input
            type="checkbox"
            checked={select}
            onChange={(e) => setselect(e.target.checked)}
          />
        </label>
      </div>
      {selectedFeature !== 'supercomplete' && (
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
      )}
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
          deselectOnClear
          <input
            type="checkbox"
            checked={deselectOnClear}
            onChange={(e) => setDeselectOnClear(e.target.checked)}
          />
        </label>
      </div>
      <div>
        <label>
          deselectOnChange
          <input
            type="checkbox"
            checked={deselectOnChange}
            onChange={(e) => setDeselectOnChange(e.target.checked)}
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
      <input className={styles.input} {...getInputProps()} />
      {clearable && (
        <button
          className={styles.clearButton}
          style={{ position: 'absolute', transform: 'translate(-120%, 10%)' }}
          {...getClearProps()}
        >
          ❎
        </button>
      )}
      <button {...getToggleProps()}>{open ? '⬆️' : '⬇️'}</button>
      <button>next</button>
      <input
        type="search"
        onKeyDown={(e) => console.log('keydown', e.key)}
        onChange={(e) => console.log('onChange', e.target.value)}
      />
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
